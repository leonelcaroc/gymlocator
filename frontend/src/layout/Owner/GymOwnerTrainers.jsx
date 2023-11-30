import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const GymOwnerTrainers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="2rem">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Trainer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">First Name</Text>
                <Input type="text" placeholder="First Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Last Name</Text>
                <Input type="text" placeholder="Last Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <Input type="email" placeholder="Email" />
              </Box>
              <Box>
                <Text fontWeight="bold">Contact</Text>
                <Input type="text" placeholder="Contact" />
              </Box>
              <Box>
                <Text fontWeight="bold">Address</Text>
                <Input type="text" placeholder="Address" />
              </Box>
              <Box>
                <Text fontWeight="bold">BirthDate</Text>
                <Input type="date" />
              </Box>
              <Box>
                <Text fontWeight="bold">Gender</Text>
                <Select placeholder="Select Gender">
                  <option value="option1">Male</option>
                  <option value="option2">Female</option>
                </Select>
              </Box>
              <Stack spacing="0.8rem">
                <Text fontWeight="bold">Certifications</Text>
                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox value="naruto">Naruto</Checkbox>
                    <Checkbox value="sasuke">Sasuke</Checkbox>
                    <Checkbox value="kakashi">Kakashi</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Stack>
              <Stack spacing="0.8rem">
                <Text fontWeight="bold">Specialties</Text>
                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox value="naruto">Naruto</Checkbox>
                    <Checkbox value="sasuke">Sasuke</Checkbox>
                    <Checkbox value="kakashi">Kakashi</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Stack>
              <Box>
                <Text fontWeight="bold">Years of Experience</Text>
                <Input type="number" />
              </Box>
              <Box>
                <Text fontWeight="bold">Biography</Text>
                <Input type="text" />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Trainers
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={onOpen}>
        Add Trainer
      </Button>
      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Address</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Mae</Td>
              <Td whiteSpace="normal">Erasga</Td>
              <Td whiteSpace="normal">Dona Martina Drive Caragasan, Maasin</Td>

              <Td>
                <Flex gap="1rem">
                  <Button bgColor="blue" color="neutral.100">
                    Edit
                  </Button>
                  <Button bgColor="red" color="white">
                    Delete
                  </Button>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GymOwnerTrainers;
