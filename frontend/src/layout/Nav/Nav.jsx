import { Box, HStack } from "@chakra-ui/react";

import NavButton from "../../components/NavButton/NavButton";

const Nav = () => {
  return (
    <Box as="nav">
      <HStack spacing="3rem">
        <NavButton buttonName="Home" route="/" />
        <NavButton buttonName="Ratings" route="/ratings" />
        {/* <NavButton buttonName="Contact us" route="/contactus" /> */}
      </HStack>
    </Box>
  );
};

export default Nav;
