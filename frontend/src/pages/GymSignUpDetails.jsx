import React, { useEffect } from "react";
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

const GymSignUpDetails = () => {
  const navigate = useNavigate();

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
          Owner Personal Details
        </Text>

        <VStack spacing="1rem">
          <Flex width="100%" justifyContent="space-between">
            <Input
              type="text"
              placeholder="First name"
              width="48%"
              bgColor="neutral.100"
              height="45px"
            />
            <Input
              type="text"
              placeholder="Last name"
              width="48%"
              bgColor="neutral.100"
              height="45px"
            />
          </Flex>
          <Input
            type="text"
            placeholder="Email Address"
            bgColor="neutral.100"
            height="45px"
          />
          <Input
            type="text"
            placeholder="Password"
            bgColor="neutral.100"
            height="45px"
          />
        </VStack>
        <Button
          width="100%"
          bgColor="brand.100"
          color="neutral.100"
          marginTop="1rem"
          height="45px"
          _hover={{ bgColor: "gray.400", color: "brand.200" }}
          fontSize="1.1rem"
          onClick={() => navigate("/gym/info")}
        >
          Next
        </Button>
      </Box>
    </Center>
  );
};

export default GymSignUpDetails;
