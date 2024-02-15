import { useQuery, useMutation, useQueryClient } from "react-query";
import { postRegisterUser } from "../api/userApi/userApi";
import { getGymOwners } from "../api/publicApi/publicApi";
import { getUserGyms } from "../api/userApi/privateUserApi";
import { formattedTime } from "../utils/convertToAmericanTime";
import getAbbreviatedDay from "../utils/getAbbreviatedDay";
import Header from "../layout/Header/Header";
import ExploreBox from "../components/ExploreBox/ExploreBox";
import UserSignUpModal from "../components/UserSignUpModal/UserSignUpModal";
import backgroundImage from "../assets/images/gym-sample.jpg";
import { useState, useEffect } from "react";
import TokenService from "../services/token";
import UserJoinOtherGymModal from "../components/UserJoinOtherGymModal/UserJoinOtherGymModal";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
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

const center = { lat: 6.919008776885199, lng: 122.07734107888048 };

const Explore = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [exploreState, setExploreState] = useState("explore");
  const [selectedGym, setSelectedGym] = useState(null);
  const [location, setLocation] = useState([]);
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    googleMapsApiKey: "AIzaSyDrEoMAjf6lO-05iin-Gat1FlMqVHQJ2LU",
  });

  const queryClient = useQueryClient();

  const startDay = getAbbreviatedDay(selectedGym?.gym.schedule.startday);
  const endDay = getAbbreviatedDay(selectedGym?.gym.schedule.endday);
  const startTime = formattedTime(selectedGym?.gym.schedule.opentime);
  const endTime = formattedTime(selectedGym?.gym.schedule.closetime);

  const totalReviews = selectedGym?.gym.reviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

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

  const { data, isLoading } = useQuery(
    "gymOwners",
    async () => {
      return TokenService.getUserLocal() ? getUserGyms() : getGymOwners();
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

  const approvedGyms = data?.filter((item) => {
    return item.gym.isApproved === "approved" && item.gym.plans.length > 0;
  });

  const registerUserMutation = useMutation(
    async (formData) => {
      return postRegisterUser(
        formData.firstname,
        formData.middlename,
        formData.lastname,
        formData.email,
        formData.contact,
        formData.address,
        formData.dateOfBirth,
        formData.plan,
        formData.gender,
        formData.password,
        formData.gymId
      );
    },
    {
      onSuccess: (data) => {
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
        navigate("/userlogin");
      },
      onError: (error) => {
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  // useEffect(() => {
  //   let isMounted = true;

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         if (isMounted) {
  //           const latitude = position.coords.latitude;
  //           const longitude = position.coords.longitude;
  //           setLocation([latitude, longitude]);
  //           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //         }
  //       },
  //       () => {
  //         console.log("Unable to retrieve your location");
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation not supported");
  //   }

  //   return () => {
  //     isMounted = false;
  //     queryClient.cancelQueries("gymOwners");
  //   };
  // }, []);

  // console.log(selectedGym);
  // console.log(approvedGyms);
  // console.log(TokenService.getUserLocal()?.token);
  // console.log(allGyms);

  const onMapClick = (e) => {
    setLocation([e.latLng.lat(), e.latLng.lng()]);
  };

  if (!isLoaded) {
    return;
  }

  return (
    <>
      <UserSignUpModal
        modalName="User Sign Up"
        isModalOpen={isUserSignUpOpen}
        closeModal={closeUserSignUp}
        selectedGym={selectedGym}
        mutationFunc={registerUserMutation}
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
            openUserSignUp={openUserSignUp}
          />

          {/* <Box
            height="30rem"
            width="38rem"
            borderRadius="10px"
            padding="10px"
            bgColor="gray.100"
            position="relative"
          >
            <Box></Box>
          </Box> */}
          <Box
            position="relative"
            height="30rem"
            width="38rem"
            borderRadius="10px"
            padding="1rem"
            bgColor="neutral.100"
          >
            <Box position="absolute" left="0" top="0" h="100%" w="100%">
              <GoogleMap
                center={center}
                zoom={14}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onClick={onMapClick}
              >
                {location.length !== 0 && (
                  <Marker
                    position={{
                      lat: location[0],
                      lng: location[1],
                    }}
                  />
                )}
              </GoogleMap>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Explore;
