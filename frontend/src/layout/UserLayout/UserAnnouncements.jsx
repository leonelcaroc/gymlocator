import { useState } from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";

const UserAnnouncements = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    isOpen: isSelectedItemOpen,
    onOpen: openSelectedItem,
    onClose: closeSelectedItem,
  } = useDisclosure();

  const handleOpenItem = (item) => {
    // setSelectedSub(item);
    openSelectedItem();
  };

  const handleCloseItem = () => {
    setSelectedItem(null);
    closeSelectedItem();
  };

  return (
    <Box padding="2rem">
      {/* Show Gym Announcement Modal */}

      <Modal isOpen={isSelectedItemOpen} onClose={handleCloseItem}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Ben's Gym</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseItem}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Gym Announcements
      </Text>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>Announcement</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              _hover={{ bgColor: "gray.300" }}
              cursor="pointer"
              onClick={handleOpenItem}
            >
              <Td whiteSpace="normal">Mary's Gym</Td>
              <Td whiteSpace="normal">
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.`.slice(
                  0,
                  80
                ) + `.....`}
              </Td>
              <Td>February 6, 2024</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserAnnouncements;
