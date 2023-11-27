import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex flexDirection="column" height="100vh">
      Hello World
      {/* <Header /> */}
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

export default App;
