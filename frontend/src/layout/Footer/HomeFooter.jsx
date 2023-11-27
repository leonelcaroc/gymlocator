import React from "react";
import { Flex, Box, Text, ListItem, ListIcon, List } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// FaAngleRight

const HomeFooter = () => {
  return (
    <Flex bgColor="brand.200" color="neutral.100" padding="2rem 8rem">
      <Flex flexDirection="column" marginRight="25rem">
        <Text fontSize="1.5rem" fontWeight="800" marginBottom="1rem">
          Company
        </Text>
        <List spacing={3}>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            About Us
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Contact Us
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Privacy Policy
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Terms & Condition
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            FAQs & Help
          </ListItem>
        </List>
      </Flex>
      <Flex flexDirection="column">
        <Text fontSize="1.5rem" fontWeight="800" marginBottom="1rem">
          Company
        </Text>
        <List spacing={3}>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            About Us
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Contact Us
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Privacy Policy
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            Terms & Condition
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "brand.100" }}>
            <ListIcon as={FaAngleRight} />
            FAQs & Help
          </ListItem>
        </List>
      </Flex>
    </Flex>
  );
};

export default HomeFooter;
