import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { Link, Center, Flex, Icon, Image } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem">
        Good day, Admin
      </Text>
      <Text
        color="gray"
        marginTop="0.5rem"
        fontSize="1.1rem"
        marginBottom="2rem"
      >
        Welcome to your personal Dashboard
      </Text>
      <Flex>
        <Flex boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" padding="1rem">
          <Box>
            <Text marginBottom="0.5rem">GYM REGISTERED</Text>
            <Text fontSize="1.5rem">3</Text>
          </Box>

          <Icon
            as={MdPeopleAlt}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>
        <Flex
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          padding="1rem"
          marginInline="1rem"
        >
          <Box>
            <Text marginBottom="0.5rem">PENDING REQUESTS</Text>
            <Text fontSize="1.5rem">18</Text>
          </Box>

          <Icon
            as={FaHourglassHalf}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>
        <Flex boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" padding="1rem">
          <Box>
            <Text marginBottom="0.5rem">PROFIT</Text>
            <Text fontSize="1.5rem">PHP 1000</Text>
          </Box>

          <Icon
            as={FaDollarSign}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
