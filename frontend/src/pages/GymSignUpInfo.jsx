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
  HStack,
  Select,
} from "@chakra-ui/react";
import gym from "../assets/images/background.webp";
import { useNavigate } from "react-router-dom";

const GymSignUpInfo = () => {
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
          Gym Information
        </Text>

        <VStack spacing="0.8rem" width="full">
          <Input
            type="text"
            placeholder="Name"
            bgColor="neutral.100"
            height="45px"
            width="100%"
          />
          <Input
            type="text"
            placeholder="Contact Number"
            bgColor="neutral.100"
            height="45px"
            width="100%"
          />
          <Input
            type="text"
            placeholder="Address"
            bgColor="neutral.100"
            height="45px"
            width="100%"
          />
          <Input
            type="text"
            placeholder="Gym Description"
            bgColor="neutral.100"
            height="45px"
            width="100%"
          />
          <HStack>
            <HStack width="50%">
              <Box>
                <Text mb="8px" color="gray.300">
                  Days Open
                </Text>
                <Select
                  placeholder="Select option"
                  bgColor="neutral.100"
                  height="45px"
                >
                  <option value="option1">Monday</option>
                  <option value="option1">Tuesday</option>
                  <option value="option1">Wednesday</option>
                  <option value="option1">Thursday</option>
                  <option value="option1">Friday</option>
                  <option value="option1">Saturday</option>
                  <option value="option1">Sunday</option>
                </Select>
              </Box>

              <Box>
                <Text mb="8px" color="gray.300">
                  To
                </Text>
                <Select
                  placeholder="Select option"
                  bgColor="neutral.100"
                  height="45px"
                >
                  <option value="option1">Monday</option>
                  <option value="option1">Tuesday</option>
                  <option value="option1">Wednesday</option>
                  <option value="option1">Thursday</option>
                  <option value="option1">Friday</option>
                  <option value="option1">Saturday</option>
                  <option value="option1">Sunday</option>
                </Select>
              </Box>
            </HStack>
            <HStack width="50%">
              <Box>
                <Text mb="8px" color="gray.300">
                  Opening Time
                </Text>

                <Input
                  placeholder="Select Time"
                  type="time"
                  bgColor="neutral.100"
                  height="45px"
                />
              </Box>
              <Box>
                <Text mb="8px" color="gray.300">
                  Closing Time
                </Text>

                <Input
                  placeholder="Select Time"
                  type="time"
                  bgColor="neutral.100"
                  height="45px"
                />
              </Box>
            </HStack>
          </HStack>
        </VStack>
        <HStack>
          <Button
            width="100%"
            bgColor="brand.100"
            color="neutral.100"
            marginTop="1rem"
            height="45px"
            _hover={{ bgColor: "gray.400", color: "brand.200" }}
            fontSize="1.1rem"
            onClick={() => navigate("/gym/details")}
          >
            Previous
          </Button>
          <Button
            width="100%"
            bgColor="brand.100"
            color="neutral.100"
            marginTop="1rem"
            height="45px"
            _hover={{ bgColor: "gray.400", color: "brand.200" }}
            fontSize="1.1rem"
            onClick={() => navigate("/gym/signup")}
          >
            Next
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};

export default GymSignUpInfo;
