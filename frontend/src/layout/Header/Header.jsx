import React from "react";
import { Flex, Text, Box, Link, Icon } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <Flex
      bgColor="black"
      justifyContent="space-between"
      paddingInline="2rem"
      height="97px"
      position="fixed"
      width="full"
      zIndex="1000"

      // top="0"
    >
      <Flex justifyContent="center" alignItems="center">
        <Icon
          as={IoLocationSharp}
          color="brand.100"
          fontSize="3rem"
          marginInline="1rem"
        />
        <Text
          color="brand.100"
          marginInline="auto"
          cursor="pointer"
          fontSize="2.5rem"
          fontWeight="800"
        >
          Gym Locator
        </Text>
      </Flex>
      <Box marginBlock="auto">
        <Nav />
      </Box>
    </Flex>
  );
};

export default Header;
