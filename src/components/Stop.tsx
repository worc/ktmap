import React from 'react'
import styled from 'styled-components'
import { Stop } from '../types/TrimetApi'

export default function Stop (props: Stop) {
  const { route: routes = [] } = props
  const frequent = routes.some(route => route.routeSubType === 'BRT')


  return (
    <Container>
      <ServiceType></ServiceType>
      <Routes>
        <div className="inner">
          { routes.map(route => (
            <div>
              <div>{ route.route }</div>
              {/*<div>{ route.desc }</div>*/}
            </div>
          ))}
        </div>
      </Routes>
      { frequent ? <FrequentServiceFlag></FrequentServiceFlag> : null }
      <Pole/>
    </Container>
  )
}

const Container = styled.div`
  transform: scale(0.15);
  height: 1px;
  width: 1px;
  
  position: relative;
  bottom: 115px;
  left: -17px;
`

const ServiceType = styled.div`
  background: #084c8d;
  height: 200px;
  width: 100px;

  outline: 1px solid gray;
  border: 4px solid white;

  border-top-left-radius: 300px;
  border-bottom-left-radius: 300px;
`

const Routes = styled.div`
  color: black;
  background-color: gray;
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: 800;
  font-size: 60px;
  height: 400px;
  width: 200px;

  border-left: 4px solid gray;
  clip-path: circle(150px at 25% center);
  
  position: relative;
  bottom: 180px;
  left: 110px;
  
  & .inner {
    background-color: white;
    clip-path: circle(145px at 21% center);
    height: 100%;
    width: 100%;

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-evenly;

    > div {
      position: relative;
      right: 20px;
    }
  }
`

const FrequentServiceFlag = styled.div`
  color: white;
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  /* letter-spacing: 0.1em; */
  height: 200px;
  width: 100px;
  background-color: #6cb33e;
  text-transform: uppercase;
  text-align:center;

  border: 4px solid white;
  border-radius: 200px 0 0 200px;

  outline: 1px solid gray;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  bottom: 400px;
`

const Pole = styled.div`
  background: #084c8d;
  height: 800px;
  width: 20px;
  
  position: absolute;
  top: -20px;
  left: 100px;
`