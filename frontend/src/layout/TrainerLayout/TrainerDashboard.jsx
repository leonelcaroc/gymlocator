import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Tr,
  Td,
  Table,
  TableContainer,
  Thead,
  Th,
  Tbody,
} from "@chakra-ui/react";

const TrainerDashboard = () => {
  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Good day,{" "}
        <Text as="span" color="brand.100">
          Erasga Mae
        </Text>
      </Text>
      <Text fontSize="1.5rem" marginBottom="0.5rem">
        Welcome to Personal Trainer Dashboard
      </Text>

      <Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="60px"
          width="270px"
        >
          UPCOMING APPOINTMENTS
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="60px"
          width="270px"
        >
          CLIENT
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="60px"
          width="270px"
        >
          PENDING REQUESTS
        </Flex>
      </Flex>

      <Flex justifyContent="end">
        <Button bgColor="brand.100" color="neutral.100">
          Generate Report
        </Button>
      </Flex>

      <Box
        marginBlock="2rem"
        padding="0.8rem"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="1.2rem">Upcoming Appointments</Text>
        <Flex marginBlock="1rem" gap="1.5rem">
          <TableContainer width="full">
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Client</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>2023-11-25</Td>
                  <Td>Tristan Chiu</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>

      <Box
        marginBlock="2rem"
        padding="1rem"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="1.2rem">Client Lists</Text>
        <Flex marginBlock="1rem" gap="1.5rem">
          <TableContainer width="full">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Contact Number</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Enzo Garcia</Td>
                  <Td>09915684267</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </Box>
  );
};

export default TrainerDashboard;
