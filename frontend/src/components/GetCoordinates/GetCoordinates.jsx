import { useEffect } from "react";
import { useMap } from "react-leaflet";

const GetCoordinates = ({ setPosition }) => {
  const map = useMap();

  // useEffect(() => {
  //   if (!map) return;

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat, lng);
    setPosition([lat, lng]);
  });
  // }, [map]);

  return null;
};

export default GetCoordinates;
