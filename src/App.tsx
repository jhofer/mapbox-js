import React, { useState } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import useLocation from "./hooks/useLocation";
import ChoroplethOverlay from "./ChoroplethOverlay";
import Immutable from "immutable";
import PlayerMarker from "./PlayerMarker";
import { getRoute, DirectionType } from "./route";

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10,
};
const App: React.FC = () => {
  const position = useLocation({
    latitude: 37.7577,
    longitude: -122.4376,
  });

  const [viewport, setViewPort] = useState({
    ...position,
    zoom: 13.4,
  });

  const [map, setMap] = useState();
  const [features, setFeatures] = useState([]);

  return (
    <MapGL
      //  mapStyle="mapbox://styles/mapbox/satellite-v9"
      ref={ref => ref && setMap(ref.getMap())}
      width="100%"
      height="100%"
      {...viewport}
      onViewportChange={setViewPort}
      onMouseDown={async e => {
        if (!map) return;
        var features = map.queryRenderedFeatures(e.point);
        var buildings = features.filter(f => f.sourceLayer === "building");

        if (buildings.length > 0) {
          setFeatures(buildings);
        } else {
          const path = await getRoute(
            [position.latitude, position.longitude],
            e.lngLat,
            DirectionType.driving
          );
          console.log(path);
        }
      }}
    >
      <Marker
        key={`marker-`}
        longitude={position.longitude}
        latitude={position.latitude}
      >
        <PlayerMarker
          longitude={position.longitude}
          latitude={position.latitude}
          size={20}
          onClick={() => {}}
        />
      </Marker>
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
