// http://wiki.openstreetmap.org/wiki/Zoom_levels.
const metersPerPixel = function(latitude, zoomLevel) {
  const earthCircumference = 40075017;
  var latitudeRadians = latitude * (Math.PI / 180);
  return (
    (earthCircumference * Math.cos(latitudeRadians)) /
    Math.pow(2, zoomLevel + 8)
  );
};

export const pixelValue = function(latitude, meters, zoomLevel) {
  return (meters / metersPerPixel(latitude, zoomLevel)) * 2;
};
