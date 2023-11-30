import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  Flex,
  VStack,
  Divider,
} from "@chakra-ui/react";
import gym from "../assets/images/background.webp";
import { useNavigate } from "react-router-dom";

const GymSignUpPermit = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const isValidFileType = (file) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    return allowedFileTypes.includes(file.type);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      // Additional actions with the valid file
    } else {
      // Clear selected file if not valid
      setSelectedFile(null);
      alert("Please select a valid PNG or JPG file.");
    }
  };

  return (
    <Center
      minHeight="100vh"
      width="100%"
      backgroundImage={`url(${gym})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box>
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
            for="upload-permit"
            marginInline="0.8rem 1.2rem"
          >
            Choose file
          </Text>
          <Text color="neutral.100" fontSize="1.1rem">
            {selectedFile ? selectedFile.name : "None"}
          </Text>
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
            onClick={() => navigate(-1)}
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
            onClick={() => navigate("/gym/login")}
          >
            Signup
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default GymSignUpPermit;
