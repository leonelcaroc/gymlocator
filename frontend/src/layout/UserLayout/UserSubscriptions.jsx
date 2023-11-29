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

const UserSubscriptions = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Subscriptions
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>End Date</Th>
              <Th>Plan</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Dolby Fitness</Td>
              <Td>2023/10/19</Td>
              <Td>Monthly</Td>
              <Td>
                <Button
                  bgColor="red"
                  color="neutral.100"
                  _hover={{ color: "red", bgColor: "gray.200" }}
                >
                  Cancel
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserSubscriptions;
