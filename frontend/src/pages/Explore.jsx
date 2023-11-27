import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../layout/Header/Header";
import ExploreBox from "../components/ExploreBox/ExploreBox";
import backgroundImage from "../assets/images/gym-sample.jpg";

const Explore = () => {
  return (
    <Flex
      flexDirection="column"
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      minHeight="100vh"
    >
      <Header />
      <Flex
        paddingTop="8rem"
        paddingBottom="8rem"
        marginInline="auto"
        width="full"
        justifyContent="space-between"
        paddingInline="5rem"
      >
        <ExploreBox />
        <Box color="neutral.100">Google Maps</Box>
      </Flex>
    </Flex>
  );
};

export default Explore;
