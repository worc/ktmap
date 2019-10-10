const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY) {
  const credentials = new AWS.SharedIniFileCredentials({ profile: 'ktmap' })
  AWS.config.credentials = credentials
}

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

function withTryCatch (awsOp) {
  try {
    return awsOp.promise()
  } catch (e) {
    console.error(`${awsOp.name} encountered an error:\n`)
    console.error(e)
    process.exit(1)
  }
}

function getFiles ({ directory, relativePath, rootDirectory = directory }) {
  const files = fs.readdirSync(directory)
  const allFiles = files.reduce((filesArray, file) => {
    const filePath = path.join(directory, file)
    if (fs.statSync(filePath).isDirectory()) {
      return filesArray.concat(getFiles({ directory: filePath, relativePath, rootDirectory }))
    } else {
      return relativePath
        ? filesArray.concat([path.relative(rootDirectory, filePath)])
        : filesArray.concat([filePath])
    }
  }, [])

  // also filters out mac madness here
  return allFiles.filter(file => !file.includes('DS_Store'))
}

async function getBucketLocation ({ Bucket }) {
  console.log(`Checking if bucket ${Bucket} exists...`)
  return withTryCatch(s3.getBucketLocation({ Bucket }))
}

async function createBucket ({ Bucket, locationConstraint = 'us-west-2' }) {
  console.log(`Creating bucket: ${Bucket}`)
  return withTryCatch(s3.createBucket({ ACL: 'public-read', CreateBucketConfiguration: { LocationConstraint: locationConstraint }, Bucket }))
}

async function uploadPublicFile ({ Bucket, bucketSubdirectory, mimeType, fileName, body }) {
  return s3.upload({
    ACL: 'public-read',
    Bucket,
    ContentType: mimeType,
    Key: bucketSubdirectory ? `${bucketSubdirectory}/${fileName}` : `${fileName}`,
    Body: body,
  }).promise().then(() => {
    console.log(`${fileName} uploaded as ${mimeType}`)
  }).catch(error => {
    console.error(`${fileName} upload failed`, error)
  })
}

async function configureBucketAsWebsite ({ Bucket }) {
  console.log(`Configuring ${Bucket} as a static website`)
  return withTryCatch(s3.putBucketWebsite({
    Bucket,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: 'index.html',
      },
      IndexDocument: {
        Suffix: 'index.html',
      },
    },
  }))
}

async function addDefaultCorsToBucket ({ Bucket }) {
  console.log(`Adding default CORS settings to: ${Bucket}`)
  return withTryCatch(s3.putBucketCors({
    Bucket,
    CORSConfiguration: {
      CORSRules: [{
        AllowedHeaders: ['Authorization', 'Content-Length'],
        AllowedMethods: ['GET'],
        AllowedOrigins: ['*'],
        ExposeHeaders: [],
        MaxAgeSeconds: 60 * 50, // seems like an odd value... is fifty minutes a req somewhere?
      }],
    },
  }))
}

async function listBucketObjectKeys ({ Bucket }) {
  const response = await withTryCatch(s3.listObjectsV2({ Bucket }))
  return response.Contents === undefined
    ? []
    : response.Contents.map(bucketObject => bucketObject.Key)
}

async function deleteAllObjectsInBucket ({ Bucket }) {
  const keys = await listBucketObjectKeys({ Bucket })
  console.log(`Deleting ${keys} from ${Bucket}`)
  return withTryCatch(s3.deleteObjects({
    Bucket,
    Delete: {
      Objects: keys.map(key => ({ Key: key })),
      Quiet: false,
    },
  }))
}

async function uploadDirectory ({ directory, Bucket, bucketSubdirectory }) {
  const relativePathFiles = getFiles({ directory, relativePath: true, rootDirectory: directory })
  console.log('Files to be uploaded:', relativePathFiles)

  const suffixToMimeType = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'font/eot',
    '.xml': 'text/xml',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.html': 'text/html',
    '.gz': 'application/gzip',
    '.ico': 'image/x-icon',
    '.map': 'application/octet-stream',
    '.md': 'text/markdown',
  }
  const uploads = relativePathFiles.map(file => {
    const fileExtension = file.slice(file.lastIndexOf('.'))
    const mimeType = suffixToMimeType[fileExtension]

    return uploadPublicFile({
      Bucket,
      bucketSubdirectory,
      mimeType,
      fileName: file,
      body: fs.readFileSync(path.join(directory, file)),
    })
  })

  return Promise.all(uploads)
}

/**
 * user beware, DELETES ALL OBJECTS IN BUCKET before uploading!
 *
 * @param directory
 * @param Bucket
 * @param bucketSubdirectory
 * @returns {Promise<void>}
 */
async function uploadDirectoryToBucket ({ directory, Bucket, bucketSubdirectory = '' }) {
  const alreadyExists = await getBucketLocation({ Bucket })

  if (alreadyExists) {
    console.log('Bucket already exists, continuing')
  } else {
    console.log('Bucket does not exist')
    const creation = await createBucket({Bucket})
    console.log('Bucket created:', creation)
  }

  const configuration = await configureBucketAsWebsite({ Bucket })
  console.log('Bucket configured:', configuration)

  const corsConfiguration = await addDefaultCorsToBucket({ Bucket })
  console.log('CORS configured:', corsConfiguration)

  const bucketObjectKeys = await listBucketObjectKeys({ Bucket })
  const emptyBucket = bucketObjectKeys.length === 0
  console.log(`Objects already in ${Bucket}:`, bucketObjectKeys)

  if (!emptyBucket) {
    console.log(`Deleting all objects in ${Bucket}`)
    await deleteAllObjectsInBucket({ Bucket })
  }

  console.log(`Uploading ${directory} to ${Bucket}`)
  await uploadDirectory({ directory, Bucket, bucketSubdirectory })
}

uploadDirectoryToBucket({ directory: path.join(__dirname, '../dist'), Bucket: 'ktmap' }).then(() => {
  console.log('dist uploaded successfully')
}).catch(error => {
  console.error('dist deployment encountered an error:\n')
  console.error(error)
  process.exit(1)
})
