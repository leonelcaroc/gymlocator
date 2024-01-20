import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Textarea,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
  Modal,
  Stack,
  Checkbox,
  CheckboxGroup,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const GymOwnerClasses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="2rem">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Class Name</Text>
                <Input type="text" placeholder="Class Name" />
              </Box>
              <CheckboxGroup colorScheme="green">
                <Text fontWeight="bold">Instructor</Text>
                <Stack spacing={[1, 5]} direction="row">
                  <Checkbox value="naruto">Chu Tristan</Checkbox>
                  <Checkbox value="kakashi">Alexandria Ramirez</Checkbox>
                </Stack>
              </CheckboxGroup>

              <Box>
                <Text fontWeight="bold">Date</Text>
                <Input type="date" />
              </Box>
              <Box>
                <Text fontWeight="bold">Start Time</Text>
                <Input type="time" />
              </Box>
              <Box>
                <Text fontWeight="bold">End Time</Text>
                <Input type="time" />
              </Box>

              <Box>
                <Text fontWeight="bold">Capacity</Text>
                <Input type="number" placeholder="Capacity" />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea placeholder="Type your description here..." />
              </Box>
              <Box>
                <Text fontWeight="bold">Equipment</Text>
                <Input required type="text" placeholder="Equipment" />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor="brand.100" color="neutral.100">
              Add Class
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Classes
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={onOpen}>
        Add Class
      </Button>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Class Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Instructor</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Yoga Class</Td>
              <Td whiteSpace="normal">2023/8/14</Td>
              <Td whiteSpace="normal">8:00AM - 10:00AM</Td>
              <Td whiteSpace="normal">Larry Wheels</Td>
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

export default GymOwnerClasses;
