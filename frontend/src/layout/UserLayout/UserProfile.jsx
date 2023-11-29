import React from "react";
import { Text, Box, Flex, Button } from "@chakra-ui/react";

const UserProfile = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Profile
      </Text>
      <Flex marginBottom="1rem" gap="8rem">
        <Box>
          <Text color="gray" fontSize="1.3rem">
            Firstname
          </Text>
          <Text color="brand.200" fontSize="1.3rem">
            Mary
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Button bgColor="brand.100">Edit Profile</Button>
      </Flex>
    </Box>
  );
};

export default UserProfile;
