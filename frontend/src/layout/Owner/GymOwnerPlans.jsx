import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
  Modal,
  Select,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const GymOwnerPlans = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="2rem">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Plan Name</Text>
                <Input type="text" placeholder="Plan Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Duration (in days)</Text>
                <Input type="text" placeholder="Duration" />
              </Box>
              <Box>
                <Text fontWeight="bold">Amount</Text>
                <Input type="text" placeholder="Amount" />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor="brand.100" color="neutral.100">
              Add Plan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Plans
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={onOpen}>
        Add Plan
      </Button>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Plan Name</Th>
              <Th>Duration (in days)</Th>
              <Th>Amount</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Regular</Td>
              <Td whiteSpace="normal">30</Td>
              <Td whiteSpace="normal">Php 5,000.00</Td>

              <Td display="flex" gap="0.5rem">
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

export default GymOwnerPlans;
