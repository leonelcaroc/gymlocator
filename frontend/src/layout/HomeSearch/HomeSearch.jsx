import React from "react";
import backgroundImage from "../../assets/images/background.webp";
import {
  Box,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
} from "@chakra-ui/react";

const HomeSearch = () => {
  return (
    <Flex
      backgroundImage={`url(${backgroundImage})`}
      // bgColor="#86B817 !important"
      // background="linear-gradient(rgba(20,20,31,0.7), rgba(20,20,31,0.7)), url(${backgroundImage})"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      justifyContent="center"
      alignItems="center"
      height="600px"
    >
      <Flex flexDirection="column" color="neutral.100">
        <Text fontSize="4rem" fontWeight="800" marginInline="auto">
          Find Your Perfect Gym
        </Text>
        <Text fontSize="1.5rem" marginInline="auto" marginBlock="1rem">
          Explore, Book, and Experience the Best Fitness Centers Near You.
        </Text>
        <InputGroup
          bgColor="neutral.100"
          borderRadius="30px"
          alignItems="center"
        >
          <Input
            pr="4.5rem"
            type="search"
            placeholder="Search for..."
            borderRadius="30px"
            height="56px"
          />
          <InputRightElement
            width="7rem"
            bgColor="none"
            height="full"
            borderRadius="20px"
            marginRight="0.8rem"
          >
            <Button
              color="neutral.100"
              bgColor="brand.100"
              type="submit"
              borderRadius="20px"
              width="full"
              _hover={{ bgColor: "gray" }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default HomeSearch;
