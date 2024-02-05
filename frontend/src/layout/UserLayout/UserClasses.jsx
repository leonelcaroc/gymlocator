import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";

const UserClasses = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Classes
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>Class Name</Th>
              <Th>Trainer</Th>
              <Th>Schedule</Th>
              <Th>Status/Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Dolby Fitness</Td>
              <Td whiteSpace="normal">Yoga</Td>
              <Td whiteSpace="normal">Dan Cabalida</Td>
              <Td whiteSpace="normal">
                <Text>Feb. 2, 2024</Text>
                <Text>3:00 PM - 4:00 PM</Text>
              </Td>
              <Td display="flex">
                <Button
                  bgColor="brand.100"
                  color="neutral.100"
                  _hover={{ color: "brand.100", bgColor: "gray.200" }}
                >
                  Join Now
                </Button>
                {/* <Button
                  bgColor="red"
                  color="neutral.100"
                  _hover={{ color: "red", bgColor: "gray.200" }}
                >
                  Cancel
                </Button> */}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserClasses;