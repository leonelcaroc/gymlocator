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
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import AdminDashboard from "../layout/AdminDashboard/AdminDashboard";
import AdminGymManage from "../layout/AdminGymManage/AdminGymManage";
import GymOwnerNav from "../components/GymOwnerNav.jsx/GymOwnerNav";
import GymInformationNav from "../components/GymInformationNav/GymInformationNav";
import { Outlet } from "react-router-dom";
import { MdOutlineArrowDropUp } from "react-icons/md";

const GymOwner = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

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
          <GymOwnerNav
            route="/gymowner"
            name="Dashboard"
            onClick={() => onClose()}
          />
          <GymOwnerNav
            route="/gymowner/profile"
            name="Profile"
            onClick={() => onClose()}
          />
          <Flex
            alignItems="center"
            height="4rem"
            width="full"
            paddingLeft="3rem"
            cursor="pointer"
            color="neutral.100"
            fontSize="19px"
            fontWeight="600"
            transition="color 0.2s"
            onClick={onToggle}
            _hover={{
              bgColor: "neutral.100",
              color: "brand.100",
              borderRight: "1px solid #86B817",
            }}
          >
            <Text>Gym Information</Text>
            {/* <Icon
              as={MdOutlineArrowDropUp}
              color="neutral.100"
              fontSize="2.5rem"
              marginInline="1rem"
          
            /> */}
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Box>
              <GymInformationNav name="Gym Details" route="/gymowner/details" />
              <GymInformationNav name="Services" route="/gymowner/services" />
              <GymInformationNav name="Amenities" route="/gymowner/amenities" />
              <GymInformationNav
                name="Equipments"
                route="/gymowner/equipments"
              />
            </Box>
          </Collapse>
          <GymOwnerNav
            route="/gymowner/trainers"
            name="Trainers"
            onClick={() => onClose()}
          />
          <GymOwnerNav
            route="/gymowner/classes"
            name="Classes"
            onClick={() => onClose()}
          />
          <GymOwnerNav
            route="/gymowner/member"
            name="Member Management"
            onClick={() => onClose()}
          />
          <GymOwnerNav
            route="/gymowner/announcement"
            name="Announcements"
            onClick={() => onClose()}
          />
          <GymOwnerNav
            route="/gymowner/plans"
            name="Plans"
            onClick={() => onClose()}
          />
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

export default GymOwner;
