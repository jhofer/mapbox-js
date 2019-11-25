import React, { useState } from 'react';
import MapGL, {GeolocateControl}  from 'react-map-gl';
import useLocation from './hooks/useLocation';

const geolocateStyle = {
 
  top: 0,
  left: 0,
  margin: 10
};
const App: React.FC = () => {
 
  const position = useLocation()
  
  const pos = position ? {latitude:position.coords.latitude,longitude: position.coords.longitude}: { 
     latitude: 37.7577,
     longitude: -122.4376
  }

  const [viewport, setViewPort] = useState({
  
    ...pos,
    zoom: 8
  })
  return (
  
      <MapGL
       width="100%"
       height="100%"
        {...viewport}
        onViewportChange={setViewPort}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        </MapGL>
    
  );
}

export default App;
