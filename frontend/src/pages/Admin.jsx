import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { Link, Center, Flex, Icon, Stack, Divider } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import TokenService from "../services/token";

const Admin = () => {
  const navigate = useNavigate();

  const adminInfo = JSON.parse(TokenService.getAdminLocal());

  return (
    <Flex minHeight="100vh">
      <Box bgColor="brand.100" minW="20rem">
        <Flex alignItems="center" width="full" borderBottom="1px solid white">
          <Icon
            as={IoLocationSharp}
            color="neutral.100"
            fontSize="2.5rem"
            marginInline="1rem"
          />
          <Text
            color="neutral.100"
            fontSize="2rem"
            fontWeight="800"
            paddingBlock="25px"
          >
            Gym Locator
          </Text>
        </Flex>
        <Box>
          <Link as={ReachLink} to="/admin">
            <Center
              padding="0 1rem"
              marginBlock="1.5rem"
              cursor="pointer"
              color="neutral.100"
              fontSize="18px"
              fontWeight="600"
              transition="color 0.2s"
            >
              Dashboard
            </Center>
          </Link>
          <Link as={ReachLink} to="/admin/manage">
            <Center
              padding="0 1rem"
              marginBlock="1.5rem"
              cursor="pointer"
              color="neutral.100"
              fontSize="18px"
              fontWeight="600"
              transition="color 0.2s"
            >
              Gym Manage
            </Center>
          </Link>
        </Box>
      </Box>
      <Box height="100px" width="full" bgColor="neutral.100">
        <Flex
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          height="100px"
          width="100%"
          justifyContent="end"
          alignItems="center"
          paddingRight="3rem"
        >
          <Stack direction="row" h="80px" p={4}>
            <Flex alignItems="center" fontSize="1.2rem" cursor="pointer">
              {adminInfo?.firstname}
            </Flex>
            <Divider orientation="vertical" />

            <Flex
              alignItems="center"
              fontSize="1.2rem"
              cursor="pointer"
              _hover={{ color: "gray" }}
              onClick={() => {
                TokenService.removeAdminLocal();
                navigate("/adminlogin");
              }}
            >
              Logout
            </Flex>
          </Stack>
        </Flex>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default Admin;
