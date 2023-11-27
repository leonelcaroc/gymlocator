import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "../layout/Header/Header";
import HomeSearch from "../layout/HomeSearch/HomeSearch";

const Home = () => {
  return (
    <Flex flexDirection="column">
      <Header />
      <HomeSearch />
      <Flex height="100rem"></Flex>

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
