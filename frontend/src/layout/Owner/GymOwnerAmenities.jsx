import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Spinner,
  Textarea,
  TableContainer,
  Table,
  Text,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Modal,
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
  getGymAmenities,
  updateGymAmenities,
  deleteGymAmenity,
} from "../../api/ownerApi/privateOwnerApi";

const GymOwnerAmenities = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newAmenity, setNewAmenity] = useState({
    amenityName: "",
    description: "",
    amenityImage: null,
  });
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedDeleteAmenity, setSelectedDeleteAmenity] = useState(null);

  const {
    isOpen: isAddAmenityOpen,
    onOpen: openAddAmenity,
    onClose: closeAddAmenity,
  } = useDisclosure();
  const {
    isOpen: isEditAmenityOpen,
    onOpen: openEditAmenity,
    onClose: closeEditAmenity,
  } = useDisclosure();
  const {
    isOpen: isDeleteAmenityOpen,
    onOpen: openDeleteAmenity,
    onClose: closeDeleteAmenity,
  } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
    "amenityData",
    async () => {
      return getGymAmenities();
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

  const updateAmenityMutation = useMutation(
    async (formData) => {
      return updateGymAmenities(
        formData._id,
        formData.amenityName,
        formData.description,
        formData.amenityImage
      );
    },
    {
      onSuccess: (data) => {
        setSelectedAmenity(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("amenityData");
      },
      onError: (error) => {
        setSelectedAmenity(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const deleteAmenityMutation = useMutation(
    async (formData) => {
      return deleteGymAmenity(formData._id);
    },
    {
      onSuccess: (data) => {
        setSelectedDeleteAmenity(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("amenityData");
      },
      onError: (error) => {
        setSelectedDeleteAmenity(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const handleCloseNewAmenity = () => {
    setNewAmenity({
      amenityName: "",
      description: "",
      amenityImage: null,
    });

    closeAddAmenity();
  };

  const handleOpenEdit = (amenity) => {
    setSelectedAmenity(amenity);
    openEditAmenity();
  };

  const handleSaveEdit = () => {
    updateAmenityMutation.mutate(selectedAmenity);
    setSelectedAmenity(null);
    closeEditAmenity();
  };

  const handleCloseEdit = () => {
    setSelectedAmenity(null);
    closeEditAmenity();
    // Reset the edited data to the original data or fetch from your backend
  };

  const handleOpenDelete = (amenity) => {
    setSelectedDeleteAmenity(amenity);
    openDeleteAmenity();
  };

  const handleDeleteAmenity = () => {
    deleteAmenityMutation.mutate(selectedDeleteAmenity);
    setSelectedDeleteAmenity(null);
    closeDeleteAmenity();
  };

  const handleCloseDelete = () => {
    setSelectedDeleteAmenity(null);
    closeDeleteAmenity();
    // Reset the edited data to the original data or fetch from your backend
  };

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
      {/* Add Amenity */}

      <Modal isOpen={isAddAmenityOpen} onClose={handleCloseNewAmenity}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Amenity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Amenity Name</Text>
                <Input
                  onChange={(e) =>
                    setNewAmenity({
                      ...newAmenity,
                      amenityName: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Amenity Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea
                  onChange={(e) =>
                    setNewAmenity({
                      ...newAmenity,
                      description: e.target.value,
                    })
                  }
                  placeholder="Type your amenity description here..."
                />
              </Box>
              <Box>
                <Flex flexDirection="column" gap="0.5rem">
                  <Text fontWeight="bold">Upload Amenity Image:</Text>
                  <Input
                    id="upload-amenity"
                    type="file"
                    display="none"
                    // onChange={handleFileChange}
                  />
                  <Text
                    id="upload-amenity-image"
                    as="label"
                    htmlFor="upload-amenity"
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
            <Button
              colorScheme="blue"
              mr={3}
              // onClick={handleCloseNewService}
            >
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              // onClick={handleSubmitNewService}
            >
              Add Amenity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Amenity */}

      <Modal isOpen={isEditAmenityOpen} onClose={handleCloseEdit}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Edit Amenity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Amenity Name</Text>
                <Input
                  spellCheck={false}
                  value={selectedAmenity?.amenityName}
                  onChange={(e) =>
                    setSelectedAmenity({
                      ...selectedAmenity,
                      amenityName: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Amenity Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea
                  spellCheck={false}
                  value={selectedAmenity?.description}
                  onChange={(e) =>
                    setSelectedAmenity({
                      ...selectedAmenity,
                      description: e.target.value,
                    })
                  }
                  placeholder="Type your equipment description here..."
                />
              </Box>
              <Box>
                <Flex flexDirection="column" gap="0.5rem">
                  <Text fontWeight="bold">Upload Amenity Image:</Text>
                  <Input
                    id="upload-edit-amenity"
                    type="file"
                    display="none"
                    // onChange={handleFileChange}
                  />
                  <Text
                    id="upload-edit-amenity-image"
                    as="label"
                    htmlFor="upload-edit-amenity"
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

      {/* Delete Amenity*/}

      <Modal isOpen={isDeleteAmenityOpen} onClose={handleOpenDelete}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Delete Amenity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              {selectedDeleteAmenity?.amenityName}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseDelete}>
              No
            </Button>
            <Button
              bgColor="red"
              color="neutral.100"
              onClick={handleDeleteAmenity}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Amenities
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={openAddAmenity}>
        Add Amenity
      </Button>

      <Box>
        {isLoading ? (
          <Spinner size="lg" mt="4rem" />
        ) : (
          <TableContainer marginTop="1.5rem">
            <Heading as="h3" size="lg" marginBottom="1rem">
              List of Amenities
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Amenity Name</Th>
                  <Th>Description</Th>
                  <Th>Image</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.amenityName}</Td>
                    <Td>{item.description}</Td>
                    <Td color="brand.100">
                      <Text
                        _hover={{ textDecoration: "underline" }}
                        cursor="pointer"
                      >
                        {item.amenityImage}
                      </Text>
                    </Td>
                    <Td display="flex" gap="0.5rem">
                      <Button
                        bgColor="blue"
                        color="neutral.100"
                        marginBottom="1rem"
                        onClick={() => handleOpenEdit(item)}
                        isLoading={
                          updateAmenityMutation.isLoading &&
                          updateAmenityMutation.variables?._id === item._id
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default GymOwnerAmenities;
