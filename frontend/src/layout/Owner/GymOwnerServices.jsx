import React from "react";
import {
  Text,
  Textarea,
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

const GymOwnerServices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      // Additional actions with the valid file
    } else {
      // Clear selected file if not valid
      setSelectedFile(null);
      alert("Please select a valid PNG or JPG file.");
    }
  };

  return (
    <Box padding="2rem">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Services</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Service Name</Text>
                <Input type="text" placeholder="Service Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea placeholder="Type your service description here..." />
              </Box>
              <Box>
                {/* <Text fontWeight="bold">Image</Text> */}
                <Flex flexDirection="column" gap="0.5rem">
                  <Text fontWeight="bold">Upload Service Image:</Text>
                  <Input
                    id="upload-equipment"
                    type="file"
                    display="none"
                    onChange={handleFileChange}
                  />
                  <Text
                    id="upload-equipment-image"
                    as="label"
                    htmlFor="upload-equipment"
                    marginInline="0.8rem 1.2rem"
                    width="fit-content"
                  >
                    Choose file
                  </Text>
                </Flex>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor="brand.100" color="neutral.100">
              Add Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Services
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={onOpen}>
        Add Service
      </Button>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Service Name</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">Pilates</Td>
              <Td whiteSpace="normal">This is sample description</Td>
              <Td color="brand.100">
                <Text _hover={{ textDecoration: "underline" }} cursor="pointer">
                  pilates.jpg
                </Text>
              </Td>
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

export default GymOwnerServices;
