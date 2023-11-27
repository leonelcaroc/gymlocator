import { Box, HStack } from "@chakra-ui/react";

import NavButton from "../../components/NavButton/NavButton";
import NavMenuButton from "../../components/NavButton/NavMenuButton";

const Nav = ({ isScrolled }) => {
  return (
    <Box as="nav">
      <HStack spacing="">
        <NavButton isScrolled={isScrolled} buttonName="Home" route="/" />
        <NavButton isScrolled={isScrolled} buttonName="Find a Gym" route="/" />
        <NavButton isScrolled={isScrolled} buttonName="Own a Gym" route="/" />
        <NavMenuButton isScrolled={isScrolled} buttonName="Pages" route="/" />
        <NavButton isScrolled={isScrolled} buttonName="Login" route="/" />
      </HStack>
    </Box>
  );
};

export default Nav;
