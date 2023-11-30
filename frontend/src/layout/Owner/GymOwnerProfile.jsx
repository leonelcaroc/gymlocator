import React from "react";
import { Text, Box, Flex, Button } from "@chakra-ui/react";

const GymOwnerProfile = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Gym Owner Profile
      </Text>
      <Flex marginBottom="1rem">
        <Box marginRight="10rem">
          <Text color="gray" fontSize="1.3rem">
            Firstname
          </Text>
          <Text color="brand.200" fontSize="1.3rem">
            Mary
          </Text>
        </Box>
        <Box>
          <Text color="gray" fontSize="1.3rem">
            Lastname
          </Text>
          <Text color="brand.200" fontSize="1.3rem">
            Erasga
          </Text>
        </Box>
      </Flex>
      <Box marginBottom="2rem">
        <Text color="gray" fontSize="1.3rem">
          Email Address
        </Text>
        <Text color="brand.200" fontSize="1.3rem">
          dolby@gmail.com
        </Text>
      </Box>
      <Flex>
        <Button bgColor="brand.100">Edit Profile</Button>
      </Flex>
    </Box>
  );
};

export default GymOwnerProfile;
