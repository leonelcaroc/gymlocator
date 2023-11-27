import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../layout/Header/Header";
import ExploreBox from "../components/ExploreBox/ExploreBox";
import backgroundImage from "../assets/images/gym-sample.jpg";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
import ReactMapGl from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1IjoidGVhbXNlY3JldDI1IiwiYSI6ImNscGgybG5vNDA1N3kycXAwemdnN3ViZHgifQ.-_tUlVTRPjswzrl2b6nuag";

const Explore = () => {
  // const Map = ReactMapboxGl({
  //   accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  // });

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

  // const customIcon = new Icon({
  //   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  //   iconSize: [38, 38],
  // });

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
          {/* <MapContainer
            center={[51.13305, -0.085]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MapContainer> */}
          <ReactMapGl
            latitude="51.13305"
            longitude="-0.085"
            zoom="6"
            mapboxAccessToken={TOKEN}
            width="100%"
            height="100%"
            transitionDuration="200"
          ></ReactMapGl>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Explore;
