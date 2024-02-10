import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Select,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Table,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const TrainerClasses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Classes
      </Text>
      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Class Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Slots</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Yoga</Td>
              <Td>March 1, 2023</Td>
              <Td>5:00 PM - 6:00 PM</Td>
              <Td>0/10</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainerClasses;
