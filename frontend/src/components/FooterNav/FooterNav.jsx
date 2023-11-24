/* eslint-disable arrow-body-style */
import { Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FooterNav = ({ buttonName, route }) => {
  const navigate = useNavigate();

  return (
    <Center
      padding="0 1rem"
      marginBlock="1rem"
      cursor="pointer"
      color="brand.200"
      fontFamily="inter.300"
      fontSize="1rem"
      _hover={{ textShadow: "none" }}
      _active={{ color: "neutral.100" }}
      onClick={() => navigate(route)}
    >
      {buttonName}
    </Center>
  );
};

export default FooterNav;
