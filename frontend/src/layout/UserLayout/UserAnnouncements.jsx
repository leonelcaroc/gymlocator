import React from "react";
import { Text, Box, Flex, Button, Input } from "@chakra-ui/react";

const UserAnnouncements = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Gym Announcements
      </Text>

      <Box
        marginBottom="1rem"
        padding="1rem"
        border="1px solid"
        borderColor="gray.500"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.200" }}
      >
        <Text fontSize="1.2rem" fontWeight="bold" marginBottom="1rem">
          Mae's Gym{" "}
          <Text as="span" fontWeight="normal" fontSize="1rem">
            - 02/01/2024 12:05pm
          </Text>
        </Text>

        <Text>
          This is to inform you that all Members in our Gym have free access to
          our Group Classes.
        </Text>
      </Box>
      <Box
        marginBottom="1rem"
        padding="1rem"
        border="1px solid"
        borderColor="gray.500"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.200" }}
      >
        <Text fontSize="1.2rem" fontWeight="bold" marginBottom="1rem">
          Mae's Gym{" "}
          <Text as="span" fontWeight="normal" fontSize="1rem">
            - 02/01/2024 12:05pm
          </Text>
        </Text>

        <Text>
          This is to inform you that all Members in our Gym have free access to
          our Group Classes.
        </Text>
      </Box>
      <Box
        marginBottom="1rem"
        padding="1rem"
        border="1px solid"
        borderColor="gray.500"
        cursor="pointer"
        _hover={{ backgroundColor: "gray.200" }}
      >
        <Text fontSize="1.2rem" fontWeight="bold" marginBottom="1rem">
          Mae's Gym{" "}
          <Text as="span" fontWeight="normal" fontSize="1rem">
            - 02/01/2024 12:05pm
          </Text>
        </Text>

        <Text>
          This is to inform you that all Members in our Gym have free access to
          our Group Classes.
        </Text>
      </Box>
    </Box>
  );
};

export default UserAnnouncements;
