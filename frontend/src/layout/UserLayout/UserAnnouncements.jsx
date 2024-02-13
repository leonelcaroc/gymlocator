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
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserAnnouncements } from "../../api/userApi/privateUserApi";
import formatDateToCustomFormat from "../../utils/formatDateToCustomFormat";
import convertTo12HourFormat from "../../utils/convertTo12HourFormat";
import { formattedTime } from "../../utils/convertToAmericanTime";
import { format, parseISO } from "date-fns";

const UserAnnouncements = () => {
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    isOpen: isSelectedItemOpen,
    onOpen: openSelectedItem,
    onClose: closeSelectedItem,
  } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
    "userAnnouncements",
    async () => {
      return getUserAnnouncements();
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const handleOpenItem = (item) => {
    setSelectedItem(item);
    openSelectedItem();
  };

  const handleCloseItem = () => {
    setSelectedItem(null);
    closeSelectedItem();
  };

  // console.log(data);

  return (
    <Box padding="2rem">
      {/* Show Gym Announcement Modal */}

      <Modal isOpen={isSelectedItemOpen} onClose={handleCloseItem}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>{selectedItem?.gymname}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedItem?.announcement}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseItem}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Announcements
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
            {data?.map((item) => (
              <Tr
                key={item._id}
                _hover={{ bgColor: "gray.300" }}
                cursor="pointer"
                onClick={() => handleOpenItem(item)}
              >
                <Td whiteSpace="normal">{item.gymname}</Td>
                <Td whiteSpace="normal">
                  {item.announcement.length > 20
                    ? item.announcement.slice(0, 20).concat("...")
                    : item.announcement}
                </Td>
                <Td>{`${formatDateToCustomFormat(item.createdAt)} - ${format(
                  parseISO(item.createdAt),
                  "h:mm a"
                )}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserAnnouncements;
