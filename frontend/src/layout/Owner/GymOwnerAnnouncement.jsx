import { useState } from "react";
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
  Spinner,
  Textarea,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getGymAnnouncements,
  addGymAnnouncements,
  updateGymAnnouncements,
  deleteGymAnnouncement,
} from "../../api/ownerApi/privateOwnerApi";
import { format } from "date-fns";

const GymOwnerAnnouncement = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedDeleteAnnouncement, setSelectedDeleteAnnouncement] =
    useState(null);

  const { data, isLoading, isError } = useQuery(
    "announcementData",
    async () => {
      return getGymAnnouncements();
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

  const addAnnouncementMutation = useMutation(
    async (announcement) => {
      return addGymAnnouncements(announcement);
    },
    {
      onSuccess: (data) => {
        setNewAnnouncement("");
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("announcementData");
      },
      onError: (error) => {
        setNewAnnouncement("");
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const updateAnnouncementMutation = useMutation(
    async (formData) => {
      return updateGymAnnouncements(formData.announcement, formData.id);
    },
    {
      onSuccess: (data) => {
        setSelectedAnnouncement(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("announcementData");
      },
      onError: (error) => {
        setSelectedAnnouncement(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const deleteAnnouncementMutation = useMutation(
    async (id) => {
      return deleteGymAnnouncement(id);
    },
    {
      onSuccess: (data) => {
        setSelectedAnnouncement(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("announcementData");
      },
      onError: (error) => {
        setSelectedAnnouncement(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const {
    isOpen: isAddAnnouncementOpen,
    onOpen: openAddAnnouncement,
    onClose: closeAddAnnouncement,
  } = useDisclosure();

  const {
    isOpen: isEditAnnouncementOpen,
    onOpen: openEditAnnouncement,
    onClose: closeEditAnnouncement,
  } = useDisclosure();

  const {
    isOpen: isDeleteAnnouncementOpen,
    onOpen: openDeleteAnnouncement,
    onClose: closeDeleteAnnouncement,
  } = useDisclosure();

  const handleSubmitNewAnnouncement = () => {
    addAnnouncementMutation.mutate(newAnnouncement);
    setNewAnnouncement("");
    closeAddAnnouncement();
  };

  const handleCloseNewAnnouncement = () => {
    setNewAnnouncement("");
    closeAddAnnouncement();
  };

  const handleOpenEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    openEditAnnouncement();
  };

  const handleSaveEdit = () => {
    updateAnnouncementMutation.mutate({
      announcement: selectedAnnouncement?.announcement,
      id: selectedAnnouncement?._id,
    });
    setSelectedAnnouncement(null);
    closeEditAnnouncement();
  };

  const handleCloseEdit = () => {
    setSelectedAnnouncement(null);
    closeEditAnnouncement();
  };

  const handleOpenDelete = (announcement) => {
    setSelectedDeleteAnnouncement(announcement);
    openDeleteAnnouncement();
  };

  const handleDeleteAnnouncement = () => {
    deleteAnnouncementMutation.mutate(selectedDeleteAnnouncement?._id);
    // console.log(selectedDeleteAnnouncement);
    setSelectedDeleteAnnouncement(null);
    closeDeleteAnnouncement();
  };

  const handleCloseDelete = () => {
    setSelectedDeleteAnnouncement(null);
    closeDeleteAnnouncement();
    // Reset the edited data to the original data or fetch from your backend
  };

  return (
    <Box padding="2rem">
      {/* Add Announcement */}

      <Modal
        isOpen={isAddAnnouncementOpen}
        onClose={handleCloseNewAnnouncement}
      >
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={newAnnouncement}
              onChange={(e) => {
                setNewAnnouncement(e.target.value);
              }}
              placeholder="Type your announcement here..."
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCloseNewAnnouncement}
            >
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              onClick={handleSubmitNewAnnouncement}
            >
              Add announcement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Announcement */}
      <Modal isOpen={isEditAnnouncementOpen} onClose={handleCloseEdit}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={selectedAnnouncement?.announcement}
              onChange={(e) => {
                setSelectedAnnouncement({
                  ...selectedAnnouncement,
                  announcement: e.target.value,
                });
              }}
              placeholder="Type your announcement here..."
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseEdit}>
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              onClick={handleSaveEdit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Announcement*/}

      <Modal isOpen={isDeleteAnnouncementOpen} onClose={handleCloseDelete}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Delete Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              {selectedDeleteAnnouncement?.announcement}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseDelete}>
              No
            </Button>
            <Button
              bgColor="red"
              color="neutral.100"
              onClick={handleDeleteAnnouncement}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Announcements
      </Text>
      <Button
        bgColor="brand.100"
        color="neutral.100"
        onClick={openAddAnnouncement}
      >
        Add Announcement
      </Button>

      <Box>
        {isLoading ? (
          <Spinner size="lg" mt="4rem" />
        ) : (
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
                {data?.length === 0 ? (
                  <Tr>
                    <Td textAlign="center" colSpan="4">
                      n/a
                    </Td>
                  </Tr>
                ) : (
                  data?.map((item) => (
                    <Tr key={item._id}>
                      <Td whiteSpace="normal">{item.announcement}</Td>
                      <Td whiteSpace="normal">
                        {format(item.createdAt, "MMMM d, yyyy - h:mma")}
                      </Td>
                      <Td display="flex" gap="0.5rem">
                        <Button
                          bgColor="blue"
                          color="neutral.100"
                          marginBottom="1rem"
                          onClick={() => handleOpenEdit(item)}
                          isLoading={
                            updateAnnouncementMutation.isLoading &&
                            updateAnnouncementMutation.variables?.id ===
                              item._id
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          bgColor="red"
                          color="white"
                          onClick={() => handleOpenDelete(item)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default GymOwnerAnnouncement;
