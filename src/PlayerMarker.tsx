import React from "react";
import { BaseControl } from "react-map-gl";
import { pixelValue } from "./utils";

const tank = require("./tank.jpg");

export default class PlayerMarker extends BaseControl<any, any> {
  _render() {
    const { longitude, latitude } = this.props;
    if (!this._context.viewport) return null;
    const zoom = this._context.viewport.zoom;
    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      left: x,
      top: y,
    };

    const height = pixelValue(latitude, 6, zoom);
    const width = pixelValue(latitude, 3.5, zoom);
    return (
      <div ref={this._containerRef} style={markerStyle}>
        <img src={tank} style={{ height, width }} />
      </div>
    );
  }
}
