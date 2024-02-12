import React from "react";

import AdminHeader from "../layout/Header/AdminHeader";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Text,
  Collapse,
  Link,
  Center,
  Flex,
  Icon,
  Image,
  useDisclosure,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

import UserNav from "../components/UserNav/UserNav";

import { Outlet, useNavigate } from "react-router-dom";
import { MdOutlineArrowDropUp } from "react-icons/md";

import TokenService from "../services/token";

const User = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const userInfo = JSON.parse(TokenService.getUserLocal());

  return (
    <Flex minHeight="100vh">
      <Box bgColor="brand.100" minW="20rem">
        <Flex alignItems="center" width="full" borderBottom="1px solid white">
          <Icon
            as={IoLocationSharp}
            color="neutral.100"
            fontSize="2.5rem"
            marginInline="1rem"
          />
          <Text
            color="neutral.100"
            fontSize="2rem"
            fontWeight="800"
            paddingBlock="25px"
          >
            Gym Locator
          </Text>
        </Flex>
        <Box>
          {/* <UserNav route="/user" name="Dashboard" /> */}
          <UserNav route="/user" name="Profile" />
          {/* <UserNav route="/user/profile" name="Profile" /> */}
          {/* <UserNav route="/user/bookings" name="Bookings" /> */}
          <UserNav route="/user/classes" name="Classes" />
          <UserNav route="/user/subscriptions" name="Subscriptions" />
          <UserNav route="/user/announcements" name="Announcements" />
        </Box>
      </Box>
      <Box height="100px" width="full" bgColor="neutral.100">
        <Flex
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          height="100px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          paddingInline="3rem"
        >
          <Box
            fontSize="1.2rem"
            cursor="pointer"
            _hover={{ color: "gray" }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Box>
          <Stack direction="row" h="80px" p={4}>
            <Flex alignItems="center" fontSize="1.2rem" cursor="pointer">
              {userInfo?.firstname}
            </Flex>
            <Divider orientation="vertical" />

            <Flex
              alignItems="center"
              fontSize="1.2rem"
              cursor="pointer"
              _hover={{ color: "gray" }}
              onClick={() => {
                TokenService.removeUserLocal();
                navigate("/");
              }}
            >
              Logout
            </Flex>
          </Stack>
        </Flex>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default User;
