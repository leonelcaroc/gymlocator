import React from "react";
import { Text, Box, Flex, Button, Spinner, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserProfile } from "../../api/userApi/privateUserApi";
import { format } from "date-fns";

const UserProfile = () => {
  const toast = useToast();

  const { data, isLoading, isError } = useQuery(
    "userProfile",
    async () => {
      return getUserProfile();
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  // console.log(data);

  const dateToFormat = new Date(data?.dateOfBirth ?? new Date());
  const formattedDate = format(dateToFormat, "MMMM d, yyyy");

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Profile
      </Text>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <Flex marginBottom="1rem" gap="8rem">
            <Box width="10rem">
              <Text color="gray" fontSize="1.3rem">
                Firstname
              </Text>
              <Text color="brand.200" fontSize="1.3rem">
                {data?.firstname}
              </Text>
            </Box>

            <Box>
              <Text color="gray" fontSize="1.3rem">
                Lastname
              </Text>
              <Text color="brand.200" fontSize="1.3rem">
                {data?.lastname}
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="1.3rem">
                Birth Date
              </Text>
              <Text color="brand.200" fontSize="1.3rem">
                {formattedDate}
              </Text>
            </Box>
          </Flex>
          <Flex gap="8rem">
            <Box>
              <Text color="gray" fontSize="1.3rem" width="10rem">
                Phone Number
              </Text>
              <Text color="brand.200" fontSize="1.3rem">
                {data?.contact}
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="1.3rem">
                Address
              </Text>
              <Text whiteSpace="normal" color="brand.200" fontSize="1.3rem">
                {data?.address}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <Button color="neutral.100" bgColor="brand.100" marginTop="5rem">
              Edit Profile
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
