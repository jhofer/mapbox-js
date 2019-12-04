import React, { useState } from "react";
// @ts-ignore
import { Marker } from "react-map-gl";
import ImageControl from "./ImageControl";

const tank = require("./tank.jpg");
type PropsType = {
    longitude: number
    latitude: number
    onClick: () => any
}

export default (props: PropsType) => {
    const { longitude, latitude,  ...rest } = props

return <>

        <Marker
           
            longitude={longitude}
            latitude={latitude}
        >
              
         <ImageControl
                longitude={longitude}
                latitude={latitude}
                {...rest}
            /> 
        </Marker>

    </>
}