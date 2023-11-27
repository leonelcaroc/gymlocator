import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "../layout/Header/Header";
import HomeSearch from "../layout/HomeSearch/HomeSearch";
import Feature from "../layout/Feature/Feature";

const Home = () => {
  return (
    <Flex flexDirection="column">
      <Header />
      <HomeSearch />
      <Feature />

      {/* <Flex
        as="main"
        flex="1"
        margin="auto"
        width="full"
        justifyContent="center"
      ></Flex> */}
      {/* <Footer /> */}
    </Flex>
  );
};

export default Home;
