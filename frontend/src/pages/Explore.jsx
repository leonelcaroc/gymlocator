import { Outlet } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  Stack,
  Input,
  Select,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../layout/Header/Header";
import ExploreBox from "../components/ExploreBox/ExploreBox";
import backgroundImage from "../assets/images/gym-sample.jpg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import ReactMapGl from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import GetCoordinates from "../components/GetCoordinates/GetCoordinates";

const TOKEN =
  "pk.eyJ1IjoidGVhbXNlY3JldDI1IiwiYSI6ImNscGgybG5vNDA1N3kycXAwemdnN3ViZHgifQ.-_tUlVTRPjswzrl2b6nuag";

function MapLocate({ location }) {
  const map = useMap();

  map.locate();
  // setPosition(location);
  map.flyTo(location, map.getZoom());

  return location === null ? null : (
    <Marker position={location}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// const Centerer = ({ center }) => {
//   const map = useMap();

//   // useEffect(() => {
//   //   // Set the map view only when the component mounts
//   //   map.setView(center);
//   // }, [center, map]); // Dependency array includes 'center' and 'map'
//   map.getCenter(center);

//   return null;
// };

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

const Explore = () => {
  // ----------------------------------------

  // const [location, setLocation] = useState([]);
  const [position, setPosition] = useState([
    6.90572175274272, 122.07578659057619,
  ]);
  const [location, setLocation] = useState(null);

  // ----------------------------------------

  useEffect(() => {
    let isMounted = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation([latitude, longitude]);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          }
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("Geolocation not supported");
    }

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const markers = [
    {
      geocode: [51.1305, -0.075],
      popUp: "Daddee's Gym",
    },
    {
      geocode: [51.1205, -0.09],
      popUp: "Gold's Gym",
    },
    {
      geocode: [51.1405, -0.094],
      popUp: "Anytime Fitness",
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  });

  return (
    <Flex
      flexDirection="column"
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      minHeight="100vh"
    >
      <Header />
      {/* <Text bgColor="yellow" fontSize="5rem" color="black" marginTop="10rem">
        Location: {position[0]}, {position[1]}
      </Text> */}
      <Flex
        paddingTop="8rem"
        paddingBottom="8rem"
        marginInline="auto"
        width="full"
        justifyContent="space-between"
        paddingInline="5rem"
      >
        <ExploreBox />
        <Box
          height="30rem"
          width="35rem"
          borderRadius="10px"
          padding="10px"
          bgColor="gray.100"
        >
          <MapContainer
            center={
              location ? location : [6.90572175274272, 122.07578659057619]
            }
            // center={[51.1305, -0.075]}
            zoom={13}
            scrollWheelZoom={true}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))} */}
            {location && <Marker position={location} />}
            {/* {location && <MapLocate location={location} />} */}

            {/* <GetCoordinates setPosition={setPosition} /> */}
            {/* <LocationMarker /> */}
          </MapContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Explore;
