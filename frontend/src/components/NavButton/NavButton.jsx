import { Center, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const NavButton = ({ buttonName, route }) => {
  return (
    <Link as={ReachLink} to={route}>
      <Center
        padding="0 1rem"
        marginBlock="1rem"
        cursor="pointer"
        color="neutral.100"
        textShadow="2px 3px 2px rgba(0,0,0,0.5)"
        fontSize="1.2rem"
        fontWeight="light"
        _hover={{ textShadow: "none" }}
        _active={{ color: "neutral.300" }}
      >
        {buttonName}
      </Center>
    </Link>
  );
};

export default NavButton;
