import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
} from "@chakra-ui/react";

const GymOwnerMemberManagement = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Member Management
      </Text>
      <Flex alignItems="center" marginBottom="2rem">
        <Text marginRight="5rem">Search Member:</Text>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="0"
          maxWidth="20rem"
        />
      </Flex>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Member Name</Th>
              <Th>Address</Th>
              <Th whiteSpace="normal">Phone Number</Th>
              <Th whiteSpace="normal">Membership Type</Th>
              <Th>Payment</Th>
              <Th>Balance</Th>
              <Th whiteSpace="normal">Start Date</Th>
              <Th whiteSpace="normal">End Date</Th>
              <Th whiteSpace="normal">Payment Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Mae Erasga</Td>
              <Td whiteSpace="normal">Dona Martina Drive Caragasan, Maasin</Td>
              <Td>09568745842</Td>
              <Td>Regular</Td>
              <Td>500</Td>
              <Td>0</Td>
              <Td whiteSpace="normal">2023-11-25</Td>
              <Td whiteSpace="normal">2024-12-25</Td>
              <Td>Paid</Td>
              <Td display="flex" flexDirection="column">
                <Button bgColor="blue" color="neutral.100" marginBottom="1rem">
                  Edit
                </Button>
                <Button bgColor="red" color="white">
                  Delete
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GymOwnerMemberManagement;
