import { Box, HStack } from "@chakra-ui/react";

import NavButton from "../../components/NavButton/NavButton";
import NavMenuButton from "../../components/NavButton/NavMenuButton";

const Nav = () => {
  return (
    <Box as="nav">
      <HStack spacing="">
        <NavButton buttonName="Home" route="/" />
        <NavButton buttonName="Find a Gym" route="/" />
        <NavButton buttonName="Own a Gym" route="/" />
        <NavMenuButton buttonName="Pages" route="/" />
        <NavButton buttonName="Login" route="/" />
      </HStack>
    </Box>
  );
};

export default Nav;
