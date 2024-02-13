import {
  Box,
  Button,
  Text,
  Input,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { postRegisterOwner } from "../api/ownerApi/ownerApi";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const center = { lat: 6.919008776885199, lng: 122.07734107888048 };

const GymSignUpPermit = ({ setState, signUpForm, setSignUpForm }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const queryClient = useQueryClient();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const allowedFileTypes = ["image/jpeg", "image/jpg"];

    if (!allowedFileTypes.includes(file?.type)) {
      return toast({
        title: "Please select a valid jpg, or jpeg file.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSignUpForm((form) => {
        return {
          ...form,
          permitImage: reader.result,
          imageName:
            file.name.length > 15
              ? file.name.split(".")[0]
              : file.name.split(".")[0],
          imageType: file.type.split("/")[1],
        };
      });
    };
  };

  const registerMutation = useMutation(
    async (formData) => {
      return postRegisterOwner(
        formData.firstname,
        formData.middlename,
        formData.lastname,
        formData.email,
        formData.password,
        formData.gymname,
        formData.contact,
        formData.address,
        formData.gymLocation,
        formData.description,
        formData.startday,
        formData.endday,
        formData.opentime,
        formData.closetime,
        formData.permitImage
      );
    },
    {
      onSuccess: (data) => {
        setSignUpForm({
          firstname: "",
          middlename: "",
          lastname: "",
          email: "",
          password: "",
          gymname: "",
          contact: "",
          address: "",
          gymLocation: [],
          description: "",
          startday: "",
          endday: "",
          opentime: "",
          closetime: "",
          permitImage: "",
        });

        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });

        navigate("/gym/login");
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

  const handleRegisterOwner = async () => {
    if (signUpForm.permitImage.length === 0) {
      return toast({
        title: "Please upload your business permit.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    }

    if (signUpForm.gymLocation?.length === 0) {
      return toast({
        title: "Please pin your gym location.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    }

    registerMutation.mutate(signUpForm);
  };

  const onMapClick = (e) => {
    setSignUpForm((prev) => ({
      ...prev,
      gymLocation: [e.latLng.lat(), e.latLng.lng()],
    }));
  };

  if (!isLoaded) {
    return;
  }

  return (
    <Flex alignItems="center" gap={8}>
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
            Select a JPEG or JPG file:
          </Text>
          <Input
            id="upload-permit"
            type="file"
            display="none"
            onChange={handleFileChange}
          />
          <Button
            as="label"
            htmlFor="upload-permit"
            marginInline="0.8rem 1.2rem"
            cursor="pointer"
            disabled={registerMutation.isLoading}
          >
            Choose file
          </Button>

          {signUpForm?.imageName?.length > 0 ? (
            <Text color="neutral.100">
              {signUpForm?.imageName?.length > 10
                ? signUpForm?.imageName
                    .slice(0, 10)
                    .concat(`...${signUpForm?.imageType}`)
                : signUpForm?.imageName?.concat(`.${signUpForm?.imageType}`)}
            </Text>
          ) : (
            <Text color="neutral.100">No file uploaded</Text>
          )}
        </Flex>
        <Flex gap="1rem" alignItems="center">
          <Text fontSize="1.1rem" color="gray.300">
            *Please pin Your Location*
          </Text>
        </Flex>

        <Flex justifyContent="space-between" mt="3rem">
          <Button
            width="48%"
            bgColor="brand.100"
            color="neutral.100"
            marginTop="1rem"
            height="45px"
            _hover={{ bgColor: "gray.400", color: "brand.200" }}
            fontSize="1.1rem"
            onClick={() => setState("info")}
            disabled={registerMutation.isLoading}
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
      <Box
        position="relative"
        height="30rem"
        width="30rem"
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
            {signUpForm.gymLocation.length !== 0 && (
              <Marker
                position={{
                  lat: signUpForm.gymLocation[0],
                  lng: signUpForm.gymLocation[1],
                }}
              />
            )}
          </GoogleMap>
        </Box>
      </Box>
    </Flex>
  );
};

export default GymSignUpPermit;
