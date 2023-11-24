import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "./layout/Header/Header.jsx";
import Footer from "./layout/Footer/Footer";

const App = () => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />

      <Flex
        as="main"
        flex="1"
        margin="auto"
        width="full"
        justifyContent="center"
      >
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default App;
