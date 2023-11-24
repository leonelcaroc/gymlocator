/* eslint-disable arrow-body-style */
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import "./header.module.css";
import Nav from "../Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLargerThan60Rem] = useMediaQuery("(min-width: 60rem)");
  const navigate = useNavigate();

  return (
    <Flex
      as="header"
      w="full"
      h="5rem"
      bgColor="brand.100"
      justifyContent="space-between"
      alignItems="center"
      paddingInline="2rem"
    >
      <Box onClick={() => navigate("/")}>
        <Text
          as="h2"
          fontSize="clamp(1.2rem, -1.12rem + 12.8vw, 2rem)"
          fontFamily="inter.700"
          color="neutral.100"
          textShadow="2px 3px 2px rgba(0,0,0,0.5)"
          cursor="pointer"
          _active={{ bgColor: "accent.400" }}
        >
          Chess Portal PH
        </Text>
      </Box>
      {isLargerThan60Rem ? <Nav /> : <SideNav />}
    </Flex>
  );
};

export default Header;
