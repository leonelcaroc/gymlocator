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
import useUser from "../store/user";
import useAdmin from "../store/admin";
import { postLoginAdmin } from "../api/adminApi";
import { useQuery, useMutation } from "react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { useAdminLoginMutation } from "../store/adminApiSlice";
// import { setAdminCredentials } from "../store/adminAuthSlice";

const AdminLogin = () => {
  // const { user, addUser, updateUser, removeUser } = useUser();
  const { admin, loginAdmin, addAdmin, updateAdmin, removeAdmin } = useAdmin();
  // const { owner, addOwner, updateOwner, removeOwner } = useOwner();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleShowPassword = () => setShow(!show);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (admin) {
  //     navigate("/admin");
  //   }
  // }, [navigate, admin]);

  const loginAdminMutation = useMutation(postLoginAdmin, {
    onSuccess: (data) => {
      console.log("data", data);
      navigate("/admin");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginAdminMutation.mutateAsync({ email, password });
      // Optionally, redirect or perform other actions upon successful login
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // -------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/admin/auth";
      const data = {
        email: "zeemarq001@gmail.com",
        password: "zee123",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const payload = await response.json();
        console.log("Payload:", payload);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    // Call the fetchData function within useEffect
    fetchData();
  }, []);
  // -------------------------------------------------------

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
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
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
