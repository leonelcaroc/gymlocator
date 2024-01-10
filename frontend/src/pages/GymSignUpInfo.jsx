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
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import gym from "../assets/images/background.webp";
import { useNavigate } from "react-router-dom";

const GymSignUpInfo = ({ setState, signUpForm, setForm }) => {
  const [gymName, setGymName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gymDescription, setGymDescription] = useState("");
  const [daysOpen, setDaysOpen] = useState("");
  const [daysClose, setDaysClose] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const toast = useToast();

  return (
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
          placeholder="Gym Name"
          bgColor="neutral.100"
          height="45px"
          width="100%"
          onChange={(e) => setGymName(e.target.value)}
          value={gymName}
        />
        <Input
          type="text"
          placeholder="Contact Number"
          bgColor="neutral.100"
          height="45px"
          width="100%"
          onChange={(e) => setContactNumber(e.target.value)}
          value={contactNumber}
        />
        <Input
          type="text"
          placeholder="Address"
          bgColor="neutral.100"
          height="45px"
          width="100%"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <Input
          type="text"
          placeholder="Gym Description"
          bgColor="neutral.100"
          height="45px"
          width="100%"
          onChange={(e) => setGymDescription(e.target.value)}
          value={gymDescription}
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
                onChange={(e) => setDaysOpen(e.target.value)}
                value={daysOpen}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
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
                onChange={(e) => setDaysClose(e.target.value)}
                value={daysClose}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
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
                onChange={(e) => setOpeningTime(e.target.value)}
                value={openingTime}
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
                onChange={(e) => setClosingTime(e.target.value)}
                value={closingTime}
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
          onClick={() => setState("details")}
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
          onClick={() => {
            if (
              !gymName ||
              !contactNumber ||
              !address ||
              !gymDescription ||
              !daysOpen ||
              !daysClose ||
              !openingTime ||
              !closingTime
            ) {
              toast({
                title: "All fields are required",
                status: "error",
                duration: 2000,
                position: "bottom-right",
              });
              return;
            } else {
              setForm({
                ...signUpForm,
                gymname: gymName,
                contact: contactNumber,
                description: gymDescription,
                startday: daysOpen,
                endday: daysClose,
                opentime: openingTime,
                closetime: closingTime,
                address: address,
              });
              setState("permit");
            }
          }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default GymSignUpInfo;
