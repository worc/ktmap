import React, { useContext } from 'react'
import { Popup } from 'react-map-gl'
import NextArrivals from '../context/NextArrivals'
import Arrivals from '../components/Arrivals'

// TODO anchor top-left for stops on the left side of the screen
// TODO anchor top-right for stops on the right side of the screen
// TODO workaround the double-on-close bug when closeOnClick is true
export default function NextArrivalsPopup () {
  const { stop, show, setShow } = useContext(NextArrivals)

  const latitude = stop?.lat
  const longitude = stop?.lng

  if (latitude && longitude && show) {
    return (
      <>
        {show && (
          <Popup anchor="top-right" className="custom-popup" focusAfterOpen={false} latitude={latitude} longitude={longitude} onClose={() => setShow(false)} closeOnClick={false}>
            <Arrivals/>
            <div ref={el => {
              // @ts-ignore
              console.log(el?.getBoundingClientRect().width)
            }}>

            </div>
          </Popup>
        )}
      </>
    )
  } else {
    return null
  }
}
