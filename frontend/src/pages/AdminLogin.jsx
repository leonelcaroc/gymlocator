import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Input,
  Text,
  Center,
  Stack,
  HStack,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import gym from "../assets/images/background.webp";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useAdminLoginMutation } from "../store/adminApiSlice";
import { setAdminCredentials } from "../store/adminAuthSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  // const [login] = useAdminLoginMutation();
  // console.log(useAdminLoginMutation);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  // (async () => {
  //   const apiUrl = "http://localhost:3000/api/admin/auth/";

  //   try {
  //     const email = "zeemarq001@gmail.com";
  //     const password = "zee123";

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       // Handle error responses
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Login failed");
  //     }

  //     // If the response is successful, parse the JSON data
  //     const data = await response.json();
  //     console.log("Login successful:", data);

  //     // Access the decoded token from res.locals
  //     const decodedToken = response.locals.decodedToken;
  //     console.log("Decoded Token:", decodedToken);

  //     // Save user data in localStorage
  //     localStorage.setItem("adminInfo", JSON.stringify(data));
  //     console.log("User data saved in localStorage:", data);

  //     // Handle successful login data here
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //     // Handle login error here
  //   }
  // })();

  // --------------------------------

  // (async () => {
  //   const apiUrl = "http://localhost:3000/api/admin/auth/";

  //   try {
  //     const email = "zeemarq001@gmail.com";
  //     const password = "zee123";

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       // Handle error responses
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Login failed");
  //     }

  //     // If the response is successful, parse the JSON data
  //     const data = await response.json();
  //     console.log("Login successful:", data);

  //     // Access the user information from the response
  //     const user = data.user;
  //     console.log("User Information:", user);

  //     // Handle successful login data here
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //     // Handle login error here
  //   }
  // })();

  return (
    <Center
      minHeight="100vh"
      width="100%"
      backgroundImage={`url(${gym})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box width="22rem">
        <Stack spacing="0.5rem" marginBottom="1rem">
          <HStack spacing="0.5rem">
            <Box fontSize="2rem" color="neutral.100" fontWeight="800">
              Admin
            </Box>
            <Box fontSize="2rem" color="brand.100" fontWeight="800">
              Login
            </Box>
          </HStack>

          <Text color="gray.200">Please sign in to continue</Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing="0.5rem" marginBottom="1rem">
            <Input
              type="text"
              placeholder="Email Address"
              bgColor="neutral.100"
              height="50px"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                bgColor="neutral.100"
                height="50px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" bgColor="none" height="100%">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? (
                    <Icon as={IoEye} boxSize={6} bgColor="none" />
                  ) : (
                    <Icon as={IoEyeOff} boxSize={6} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button
            color="neutral.100"
            bgColor="brand.100"
            width="full"
            _hover={{ color: "brand.100", bgColor: "gray.200" }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default AdminLogin;
