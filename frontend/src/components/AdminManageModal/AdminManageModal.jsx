import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Button,
  Flex,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import gym from "../../assets/images/gym-sample.jpg";

const AdminManageModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box width="full" marginBottom="1rem">
            <Image
              src={gym}
              alt="This is a gym"
              borderRadius="lg"
              width="100%"
              height="200px"
              objectFit="cover"
            />
          </Box>

          <Text>Gym Name: Gold's Gym</Text>
          <Text>Owner: Mae Erasga</Text>
          <Text>Address: Zamboanga City</Text>
          <Text>Contact: 09458965872</Text>
          <Flex>
            <Text>Business Permit: </Text>
            <Text
              color="brand.100"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              View Attachment
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Approve
          </Button>
          <Button colorScheme="red" mr={3}>
            Reject
          </Button>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdminManageModal;
