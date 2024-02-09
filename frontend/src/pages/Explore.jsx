import { Outlet, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Stack,
  Input,
  Select,
  Divider,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getGymOwners } from "../api/publicApi/publicApi";
import { getUserGyms } from "../api/userApi/privateUserApi";
import { formattedTime } from "../utils/convertToAmericanTime";
import getAbbreviatedDay from "../utils/getAbbreviatedDay";
import Header from "../layout/Header/Header";
import ExploreBox from "../components/ExploreBox/ExploreBox";
import UserSignUpModal from "../components/UserSignUpModal/UserSignUpModal";
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
// import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import GetCoordinates from "../components/GetCoordinates/GetCoordinates";
import StarRating from "../components/StarRating/StarRating";
import TokenService from "../services/token";
import UserJoinOtherGymModal from "../components/UserJoinOtherGymModal/UserJoinOtherGymModal";

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
  const navigate = useNavigate();
  const toast = useToast();
  const [exploreState, setExploreState] = useState("explore");
  const [selectedGym, setSelectedGym] = useState(null);

  const queryClient = useQueryClient();

  const startDay = getAbbreviatedDay(selectedGym?.gym.schedule.startday);
  const endDay = getAbbreviatedDay(selectedGym?.gym.schedule.endday);
  const startTime = formattedTime(selectedGym?.gym.schedule.opentime);
  const endTime = formattedTime(selectedGym?.gym.schedule.closetime);

  const sum = selectedGym?.gym.reviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // ----------------------------------------

  const {
    isOpen: isUserSignUpOpen,
    onOpen: openUserSignUp,
    onClose: closeUserSignUp,
  } = useDisclosure();
  const {
    isOpen: isUserJoinGymOpen,
    onOpen: openUserJoinGym,
    onClose: closeUserJoinGym,
  } = useDisclosure();

  // const [location, setLocation] = useState([]);
  const [position, setPosition] = useState([
    6.90572175274272, 122.07578659057619,
  ]);
  const [location, setLocation] = useState(null);

  // ----------------------------------------

  // useQuery for getting all gyms that the user did not subscribed and isApproved by admin

  // const { data: userGyms, isLoading: isUserGymsLoading } = useQuery(
  //   "gymOwners",
  //   async () => {
  //     return getUserGyms();
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     onError: (error) => {
  //       toast({
  //         title: error.response.data.error || "Something went wrong",
  //         status: "error",
  //         duration: 2000,
  //         position: "bottom-right",
  //       });
  //     },
  //     onSuccess: (result) => {
  //       let approvedGym = result?.filter((item) => {
  //         return item.gym.isApproved === "approved";
  //       });

  //       if (approvedGym.length !== 0) {
  //         setSelectedGym(result[0]);
  //       }
  //     },
  //   }
  // );

  // useQuery for getting all gyms that isApproved

  const { data, isLoading } = useQuery(
    "gymOwners",
    async () => {
      return TokenService.getUserLocal() ? getUserGyms() : getGymOwners();
      // return getGymOwners();
      // return getUserGyms();
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
      onSuccess: (result) => {
        let approvedGym = result?.filter((item) => {
          return item.gym.isApproved === "approved";
        });

        if (approvedGym.length !== 0) {
          setSelectedGym(result[0]);
        }
      },
    }
  );

  // const dataToFilter = TokenService.getUserLocal() ? userGyms : allGyms;

  const approvedGyms = data?.filter((item) => {
    return item.gym.isApproved === "approved";
  });

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
      queryClient.cancelQueries("gymOwners");
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

  // console.log(selectedGym);

  // console.log(data);
  // console.log(TokenService.getUserLocal()?.token);
  // console.log(allGyms);

  return (
    <>
      <UserSignUpModal
        isModalOpen={isUserSignUpOpen}
        closeModal={closeUserSignUp}
        selectedGym={selectedGym}
      />

      <UserJoinOtherGymModal
        isModalOpen={isUserJoinGymOpen}
        closeModal={closeUserJoinGym}
        selectedGym={selectedGym}
      />

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
          <ExploreBox
            setSelectedGym={setSelectedGym}
            selectedGym={selectedGym}
            setExploreState={setExploreState}
            owners={approvedGyms}
          />

          {exploreState === "explore" ? (
            <Box
              height="500px"
              width="35rem"
              borderRadius="10px"
              bgColor="gray.100"
              padding="2rem"
            >
              {selectedGym !== null || approvedGyms?.length !== 0 ? (
                <>
                  <Box>
                    <Text fontWeight="900" fontSize="1.3rem">
                      {selectedGym?.gym.gymname}
                    </Text>
                    <Flex alignItems="center" gap="0.5rem">
                      ({sum}) <StarRating rating={sum} />
                    </Flex>
                    <Text>
                      Open {startTime} {startDay}-{endDay}
                    </Text>
                    <Flex gap="1rem" marginBlock="0.5rem">
                      {!TokenService.getUserLocal() ? (
                        <Button
                          color="neutral.100"
                          bgColor="brand.100"
                          maxHeight="2rem"
                          onClick={() => navigate("/userlogin")}
                        >
                          Login
                        </Button>
                      ) : null}

                      <Button
                        color="neutral.100"
                        bgColor="brand.100"
                        maxHeight="2rem"
                        onClick={
                          TokenService.getUserLocal()
                            ? () => openUserJoinGym()
                            : () => openUserSignUp()
                        }
                      >
                        Join Now
                      </Button>
                    </Flex>
                  </Box>
                  <Divider marginBlock="1rem" borderColor="gray.500" />
                  <Box>
                    <Text fontWeight="800">Gym Details</Text>
                    <Text>- {selectedGym?.gym.description}</Text>
                    <Box marginBlock="1.5rem">
                      <Text fontWeight="700">Contact</Text>
                      <Box paddingLeft="1.2rem">
                        <Flex gap="0.3rem">
                          <Text>Phone:</Text>
                          <Text>{selectedGym?.gym.contact}</Text>
                        </Flex>
                        <Flex gap="0.3rem">
                          <Text>Email:</Text>
                          <Text>{selectedGym?.email}</Text>
                        </Flex>
                        <Flex gap="0.3rem">
                          <Text>Address:</Text>
                          <Text>{selectedGym?.gym.address}</Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  display="flex"
                  height="100%"
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="1.5rem"
                  fontWeight="500"
                >
                  "No Gym Results"
                </Box>
              )}
            </Box>
          ) : exploreState === "map" ? (
            <Box
              height="30rem"
              width="35rem"
              borderRadius="10px"
              padding="10px"
              bgColor="gray.100"
            >
              <MapContainer
                center={location ? location : position}
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
                {/* {location && <Marker position={location} />} */}
                {location && <Marker position={location} />}
                {/* {location && <MapLocate location={location} />} */}

                <GetCoordinates setPosition={setPosition} />
                {/* <LocationMarker /> */}
              </MapContainer>
            </Box>
          ) : null}

          {/* ------ */}
        </Flex>
      </Flex>
    </>
  );
};

export default Explore;
