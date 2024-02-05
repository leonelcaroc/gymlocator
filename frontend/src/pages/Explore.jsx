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
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getGymOwners } from "../api/publicApi/publicApi";
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
  const [exploreState, setExploreState] = useState("explore");
  const [selectedGym, setSelectedGym] = useState(null);

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

  // const [location, setLocation] = useState([]);
  const [position, setPosition] = useState([
    6.90572175274272, 122.07578659057619,
  ]);
  const [location, setLocation] = useState(null);

  // ----------------------------------------

  const { data, isLoading, isError } = useQuery(
    "gymOwners",
    async () => {
      return getGymOwners();
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
        setSelectedGym(result[0]);
        // console.log(selectedGym);
      },
    }
  );

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

  // console.log(selectedGym);

  return (
    <>
      <UserSignUpModal
        isModalOpen={isUserSignUpOpen}
        closeModal={closeUserSignUp}
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
            owners={data}
          />

          {exploreState === "explore" ? (
            <Box
              height="500px"
              width="35rem"
              borderRadius="10px"
              bgColor="gray.100"
              padding="2rem"
            >
              {selectedGym !== (null || undefined) ? (
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
                      <Button
                        color="neutral.100"
                        bgColor="brand.100"
                        maxHeight="2rem"
                        onClick={() => navigate("/userlogin")}
                      >
                        Login
                      </Button>
                      <Button
                        color="neutral.100"
                        bgColor="brand.100"
                        maxHeight="2rem"
                        onClick={() => openUserSignUp()}
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

const i = {
  _id: "659e466635ad21cca5bb238d",
  firstname: "Billy",
  middlename: "Mac",
  lastname: "Awad",
  email: "ben@gmail.com",
  password: "$2a$10$i.VS/T9rZ/aa8qv2PPNl6OUnsPyXEnTRvV.kvVqPwC5t2F9SnEhgK",
  gym: {
    gymname: "Ben's Gym",
    contact: "09456268535",
    description: "This is description for Ben's Gym",
    address: "My address",
    gymLocation: [7.12542165579628, 122.04025268554689],
    schedule: {
      startday: "Tuesday",
      endday: "Saturday",
      opentime: "02:00",
      closetime: "22:00",
      _id: "659e466635ad21cca5bb238f",
    },
    permitBase64: "permit101.jpg",
    isApproved: "approved",
    _id: "659e466635ad21cca5bb238e",
    equipments: [
      {
        equipmentName: "Dumbbell",
        description: "For biceps",
        equipmentImage: "dumbbell.png",
        _id: "65a3800abe26aff88e108a31",
      },
    ],
    plans: [
      {
        planName: "Premium",
        duration: 30,
        amount: 10000,
        _id: "65a4ceb308427d0ccb1b4adb",
      },
      {
        planName: "Standard",
        duration: 30,
        amount: 5000,
        _id: "65a748411725d21a52bbe93e",
      },
    ],
    services: [
      {
        serviceName: "Cardio",
        description: "This is a cardio service",
        serviceImage: "cardio.jpg",
        _id: "65a747bd1725d21a52bbe914",
      },
    ],
    trainers: [
      {
        firstname: "Maria",
        middlename: "Reyes",
        lastname: "Clara",
        email: "maria@gmail.com",
        contact: "09562457863",
        address: "This is address",
        dateOfBirth: "2024-01-10T00:00:00.000Z",
        gender: "female",
        certifications: [],
        specialties: [
          {
            specialtyName: "Cardio",
            _id: "65a641ad4d7c3db662aa5021",
          },
        ],
        yearsOfExperience: "10",
        biography: "This is biography",
        _id: "65a641ad4d7c3db662aa5020",
      },
      {
        firstname: "Sheldon",
        middlename: "James",
        lastname: "Faraway",
        email: "sheldon@gmail.com",
        contact: "094564845",
        address: "This is my address",
        dateOfBirth: "2023-11-06T00:00:00.000Z",
        gender: "male",
        certifications: [
          {
            certificateName: "Biking",
            _id: "65a8b6d52d96957a0f224418",
          },
          {
            certificateName: "Conditioning",
            _id: "65a8b6d52d96957a0f224419",
          },
          {
            certificateName: "Massage",
            _id: "65a8b6d52d96957a0f22441a",
          },
        ],
        specialties: [
          {
            specialtyName: "Nutrition",
            _id: "65a8b6d52d96957a0f22441b",
          },
          {
            specialtyName: "Cardio",
            _id: "65a8b6d52d96957a0f22441c",
          },
          {
            specialtyName: "Strength",
            _id: "65a8b6d52d96957a0f22441d",
          },
        ],
        yearsOfExperience: "15",
        biography: "This is my biography",
        _id: "65a8b6d52d96957a0f224417",
      },
    ],
    amenities: [
      {
        amenityName: "Swimming",
        description: "This is a swimming",
        amenityImage: "swimming.jpg",
        _id: "65a356a4ab09d4f6f3352607",
      },
    ],
    announcements: [
      {
        announcement: "Magkakaron ako new work next month.",
        createdAt: "2024-01-18T04:48:29.848Z",
        _id: "65a393bfe8d31c8e675f492b",
      },
      {
        announcement: "This is my announcement",
        createdAt: "2024-01-20T12:43:57.899Z",
        _id: "65abdab485049913f437922a",
      },
    ],
    classes: [],
    members: [],
  },
  createdAt: "2024-01-10T07:25:26.315Z",
  updatedAt: "2024-01-20T14:41:25.506Z",
  __v: 58,
};
