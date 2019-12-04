import React from "react";
import { BaseControl } from "react-map-gl";
import { pixelValue } from "./utils";

const tank = require("./tank.jpg");

export default class ImageControl extends BaseControl<any, any> {
  _render() {
    const { longitude, latitude,onClick } = this.props;
    if (!this._context.viewport) return null;
    const zoom = this._context.viewport.zoom;
    const [x, y] = this._context.viewport.project([longitude, latitude]);

    this._context.eventManager.on({
      click: onClick,

    });
    const height = pixelValue(latitude, 6, zoom);
    const width = pixelValue(latitude, 3.5, zoom);

    const markerStyle = {
      left: x-(width/2),
      top: y-(height/2),
    };

    return (
   

      <div ref={this._containerRef} style={markerStyle}  >
        <img src={tank} style={{ height, width }}  />
      </div>
  
    );
  }
}
