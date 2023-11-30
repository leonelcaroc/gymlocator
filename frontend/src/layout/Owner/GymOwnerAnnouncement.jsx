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
  Textarea,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const GymOwnerAnnouncement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="2rem">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Type your announcement here..." />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor="brand.100" color="neutral.100">
              Add announcement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Announcements
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={onOpen}>
        Add Announcement
      </Button>

      <TableContainer marginTop="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Announcement</Th>
              <Th>Date and Time Created</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">
                "We hope this message finds you in great health and high
                spirits! We have some thrilling updates to share with you as we
                continue to strive for excellence in providing you with the best
                fitness experience."
              </Td>
              <Td whiteSpace="normal">2023/5/26 - 8:00AM</Td>
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

export default GymOwnerAnnouncement;
