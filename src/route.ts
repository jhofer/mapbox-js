import { PointLike } from "mapbox-gl";
import axios from "axios";

export enum DirectionType {
  driving = "driving",
  walking = "walking",
  cycling = "cycling",
}

export async function getRoute(
  start: PointLike,
  end: PointLike,
  directionType: DirectionType
) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change

  var url =
    "https://api.mapbox.com/directions/v5/mapbox/" +
    directionType +
    "/" +
    start[0] +
    "," +
    start[1] +
    ";" +
    end[0] +
    "," +
    end[1] +
    "?steps=true&geometries=geojson&access_token=" +
    process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const result = await axios.get(url);

  return result.data;
}
