import React from "react";
import { Text, Box, Flex, Button, Input } from "@chakra-ui/react";

const UserAnnouncements = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Announcements
      </Text>

      <Text
        padding="2rem"
        border="1px solid"
        borderColor="gray.500"
        color="gray.500"
      >
        Gym Annnoucements
      </Text>
    </Box>
  );
};

export default UserAnnouncements;
