import React, { useState } from "react";
// @ts-ignore
import MapGL, { GeolocateControl, Marker, Source, Layer } from "react-map-gl";
import useLocation from "./hooks/useLocation";
import ChoroplethOverlay from "./ChoroplethOverlay";
import ImageControl from "./ImageControl";
import { getRoute, DirectionType } from "./route";
import VehicleMarker from "./VehicleMarker";
import Vehicle from "./Vehicle";

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10,
};



const App: React.FC = () => {


  const [viewport, setViewPort] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13.4,
  });

  const [map, setMap] = useState();
  const [features, setFeatures] = useState([]);
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [waypoints, setWaypoints] = useState(null)

  return (
    <MapGL
 
 ref={ref => ref && setMap(ref.getMap())}
 width="100%"
 height="100%"
 {...viewport}
 onViewportChange={setViewPort}
 onMouseUp={async e => {
   if (!map) return;
   var features = map.queryRenderedFeatures(e.point);
   var buildings = features.filter(f => f.sourceLayer === "building");
   
   if (buildings.length > 0) {
     setFeatures(buildings);
    } else if(selectedVehicle) {
      const {longitude, latitude} = selectedVehicle
      const path = await getRoute(
        [longitude, latitude],
        e.lngLat,
        DirectionType.driving
        );
        
        
        const geometry = path.routes[0] ? path.routes[0].geometry : null
        
        setWaypoints(geometry)
        
        
      }else{
        setVehicles([...vehicles, new Vehicle(e.lngLat[0],e.lngLat[1])])
        
      }
      return false;
    }}
    >
      <Source type="geojson" data={waypoints}>
        <Layer id="route" type="line"
          source="route"
          layout={{
            "line-join": "round",
            "line-cap": "round"
          }}
          paint={{
            "line-color": "green",
            "line-width": 1
          }} />
      </Source>
      {vehicles.map((v,i)=>{
        return <VehicleMarker key={i} latitude={v.latitude} longitude={v.longitude} onClick={()=>{
       
          setSelectedVehicle(v)
        }}/>
      })}
    
      <ChoroplethOverlay
        features={features}
        colorDomain={[0, 20]}
        colorRange={["red", "green"]}
        valueAccessor={f => f.properties.value}
        globalOpacity={0.8}
        renderWhileDragging={true}
        />
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        />
    </MapGL>
       
  );
};

export default App;
