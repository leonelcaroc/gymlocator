import React from "react";
import { Text, Box, Flex, Button, Input } from "@chakra-ui/react";

const UserReminders = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        User Reminders
      </Text>
      <Box borderRadius="20px">
        <Text color="brand.200">
          Membership is up to date, expiration will be on 12/20/2023
        </Text>
      </Box>
    </Box>
  );
};

export default UserReminders;
