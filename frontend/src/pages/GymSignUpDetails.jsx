import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  Flex,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";

const GymSignUpDetails = ({ setState, setForm, signUpForm }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  return (
    <Box maxWidth="40rem">
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
        <Flex width="100%" gap="1rem">
          <Input
            type="text"
            placeholder="First name"
            bgColor="neutral.100"
            height="45px"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            type="text"
            placeholder="Middle name"
            bgColor="neutral.100"
            height="45px"
            onChange={(e) => setMiddleName(e.target.value)}
            value={middleName}
          />
          <Input
            type="text"
            placeholder="Last name"
            bgColor="neutral.100"
            height="45px"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Flex>
        <Input
          type="email"
          placeholder="Email Address"
          bgColor="neutral.100"
          height="45px"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="Password"
          bgColor="neutral.100"
          height="45px"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
        onClick={() => {
          if (!firstName || !middleName || !lastName || !email || !password) {
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
              firstname: firstName,
              middlename: middleName,
              lastname: lastName,
              email,
              password,
            });
            setState("info");
          }
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default GymSignUpDetails;
