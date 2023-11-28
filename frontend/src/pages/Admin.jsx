import React from "react";
import { Box, Text } from "@chakra-ui/react";
import AdminHeader from "../layout/Header/AdminHeader";
import { Link as ReachLink } from "react-router-dom";
import {
  Link,
  Center,
  Flex,
  Icon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import AdminDashboard from "../layout/AdminDashboard/AdminDashboard";
import AdminGymManage from "../layout/AdminGymManage/AdminGymManage";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Link as={ReachLink} to="/admin">
            <Center
              padding="0 1rem"
              marginBlock="1.5rem"
              cursor="pointer"
              color="neutral.100"
              fontSize="18px"
              fontWeight="600"
              transition="color 0.2s"
            >
              Dashboard
            </Center>
          </Link>
          <Link as={ReachLink} to="/admin/manage">
            <Center
              padding="0 1rem"
              marginBlock="1.5rem"
              cursor="pointer"
              color="neutral.100"
              fontSize="18px"
              fontWeight="600"
              transition="color 0.2s"
            >
              Gym Manage
            </Center>
          </Link>
        </Box>
      </Box>
      <Box height="100px" width="full" bgColor="neutral.100">
        <Flex
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          height="100px"
          width="100%"
          justifyContent="end"
          alignItems="center"
          paddingRight="3rem"
        >
          <Text fontSize="1.2rem" cursor="pointer" _hover={{ color: "gray" }}>
            Mary
          </Text>
        </Flex>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default Admin;
