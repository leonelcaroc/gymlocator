import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  Flex,
  VStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import GetCoordinates from "../components/GetCoordinates/GetCoordinates";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://gymlocator.co/api"
    : "http://localhost:5000/api";

const GymSignUpPermit = ({ setState, signUpForm, setForm }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [gymLocation, setGymLocation] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isValidFileType = (file) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    return allowedFileTypes.includes(file.type);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      setForm({ ...signUpForm, base64Data: file.name });
      // Additional actions with the valid file
    } else {
      // Clear selected file if not valid
      setSelectedFile(null);
      toast({
        title: "Please select a valid PNG or JPG file.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  });

  const registerMutation = useMutation(
    async (formData) => {
      const response = await axios.post(
        // "http://localhost:5000/api/gymowner/register",
        `${apiUrl}/gymowner/register`,

        formData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Save the data to localStorage or perform other actions
        toast({
          title: data.message,
          // description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        setGymLocation(null);
        setSelectedFile(null);
        setForm(() => {
          return {};
        });

        navigate("/gym/login");

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("gymOwnerData");
      },
      onError: (error) => {
        toast({
          title:
            error.response.data.message ||
            error.response.data.error ||
            "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const handleRegisterOwner = async () => {
    if (!selectedFile) {
      toast({
        title: "Please upload a business permit.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    } else if (!gymLocation) {
      toast({
        title: "Please pin your gym location.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    } else {
      registerMutation.mutate(signUpForm);

      // console.log(signUpForm);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="35rem" minHeight="1rem">
          <ModalHeader>Pin Your Gym Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              height="30rem"
              width="100%"
              borderRadius="10px"
              padding="10px"
              bgColor="gray.100"
            >
              <MapContainer
                center={[6.90572175274272, 122.07578659057619]}
                zoom={13}
                scrollWheelZoom={true}
                animate={true}
                easeLinearity={0.35}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {gymLocation ? (
                  <Marker icon={customIcon} position={gymLocation} />
                ) : null}
                <GetCoordinates setPosition={setGymLocation} />
              </MapContainer>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              color="neutral.100"
              bgColor="brand.100"
              onClick={() => {
                setForm((prev) => {
                  return { ...prev, gymLocation: gymLocation };
                });
                onClose();
              }}
            >
              Pin Location
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box marginBottom="3rem">
        <Text color="gray.100" fontSize="3rem" fontWeight="800">
          Welcome to{" "}
          <Text as="span" color="brand.100">
            GYM Locator
          </Text>
        </Text>
        <Text fontSize="1.1rem" color="gray.300" marginBlock="0.8rem">
          Please sign up to continue
        </Text>
        <Divider />
        <Text fontSize="1.1rem" color="gray.300" marginBlock="0.8rem">
          Upload Business Permit
        </Text>

        <Flex alignItems="center" marginBottom="1.5rem">
          <Text fontSize="1.1rem" color="gray.300">
            Select a PDF, JPG, or PNG file:
          </Text>
          <Input
            id="upload-permit"
            type="file"
            display="none"
            onChange={handleFileChange}
          />
          <Text
            id="upload-permit-id"
            as="label"
            htmlFor="upload-permit"
            marginInline="0.8rem 1.2rem"
          >
            Choose file
          </Text>
          <Text color="neutral.100" fontSize="1.1rem">
            {selectedFile
              ? `${selectedFile.name.slice(0, 5)}...${selectedFile.name
                  .split(".")[0]
                  .slice(-5)}.${selectedFile.name.split(".")[1]}`
              : "None"}
          </Text>
        </Flex>
        <Flex gap="1rem" alignItems="center">
          <Text fontSize="1.1rem" color="gray.300">
            Pin Your Location
          </Text>
          <Button onClick={onOpen} fontSize="1.1rem" color="black">
            {gymLocation ? "Location Pinned" : "Pin Location"}
          </Button>
        </Flex>

        <Flex justifyContent="space-between">
          <Button
            width="48%"
            bgColor="brand.100"
            color="neutral.100"
            marginTop="1rem"
            height="45px"
            _hover={{ bgColor: "gray.400", color: "brand.200" }}
            fontSize="1.1rem"
            onClick={() => setState("info")}
          >
            Previous
          </Button>
          <Button
            width="48%"
            bgColor="brand.100"
            color="neutral.100"
            marginTop="1rem"
            height="45px"
            _hover={{ bgColor: "gray.400", color: "brand.200" }}
            fontSize="1.1rem"
            onClick={handleRegisterOwner}
            isLoading={registerMutation.isLoading}
          >
            Signup
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default GymSignUpPermit;
