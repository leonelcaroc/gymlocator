import { useState } from "react";
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
  Spinner,
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
  getGymServices,
  addGymServices,
  updateGymServices,
  deleteGymService,
} from "../../api/ownerApi/privateOwnerApi";

const GymOwnerServices = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    isOpen: isAddServiceOpen,
    onOpen: openAddService,
    onClose: closeAddservice,
  } = useDisclosure();
  const {
    isOpen: isEditServiceOpen,
    onOpen: openEditService,
    onClose: closeEditService,
  } = useDisclosure();
  const {
    isOpen: isDeleteServiceOpen,
    onOpen: openDeleteService,
    onClose: closeDeleteService,
  } = useDisclosure();

  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    serviceImage: null,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDeleteService, setSelectedDeleteService] = useState(null);

  const { data, isLoading, isError } = useQuery(
    "serviceData",
    async () => {
      return getGymServices();
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

  const addServiceMutation = useMutation(
    async (formData) => {
      return await addGymServices(formData);
    },
    {
      onSuccess: (data) => {
        setNewService({
          serviceName: "",
          description: "",
          serviceImage: null,
        });
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("serviceData");
      },
      onError: (error) => {
        setNewService({
          serviceName: "",
          description: "",
          serviceImage: null,
        });
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const updateServiceMutation = useMutation(
    async (formData) => {
      return updateGymServices(
        formData._id,
        formData.serviceName,
        formData.description,
        formData.serviceImage
      );
    },
    {
      onSuccess: (data) => {
        setSelectedService(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("serviceData");
      },
      onError: (error) => {
        setSelectedService(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const deleteServiceMutation = useMutation(
    async (formData) => {
      return deleteGymService(formData._id);
    },
    {
      onSuccess: (data) => {
        setSelectedDeleteService(null);
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("serviceData");
      },
      onError: (error) => {
        setSelectedDeleteService(null);
        toast({
          title: error.response.data.error || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  const handleSubmitNewService = async (e) => {
    e.preventDefault();

    const newServiceFormData = new FormData();
    newServiceFormData.append("serviceName", newService.serviceName);
    newServiceFormData.append("description", newService.description);
    newServiceFormData.append("serviceImage", newService.serviceImage);

    // console.log(newServiceFormData.serviceName);
    // console.log(newServiceFormData.description);
    // console.log(newServiceFormData.serviceImage);
    addServiceMutation.mutate(newServiceFormData);
    // console.log(newService.serviceName);
    // console.log(newService.description);
    // console.log(newService.serviceImage);
  };

  const handleCloseNewService = () => {
    setNewService({
      serviceName: "",
      description: "",
      serviceImage: null,
    });

    closeAddservice();
  };

  const handleOpenEdit = (service) => {
    setSelectedService(service);
    openEditService();
  };

  const handleSaveEdit = () => {
    updateServiceMutation.mutate(selectedService);
    setSelectedService(null);
    closeEditService();
  };

  const handleCloseEdit = () => {
    setSelectedService(null);
    closeEditService();
    // Reset the edited data to the original data or fetch from your backend
  };

  const handleOpenDelete = (service) => {
    setSelectedDeleteService(service);
    openDeleteService();
  };

  const handleDeleteService = () => {
    deleteServiceMutation.mutate(selectedDeleteService);
    setSelectedDeleteService(null);
    closeDeleteService();
  };

  const handleCloseDelete = () => {
    setSelectedDeleteService(null);
    closeDeleteService();
    // Reset the edited data to the original data or fetch from your backend
  };

  const handleFileChange = (e) => {
    setNewService((prevService) => ({
      ...prevService,
      serviceImage: e.target.files[0],
    }));

    // if (file) {
    //   const { name, size, type } = file;

    //   setNewService((prevService) => ({
    //     ...prevService,
    //     serviceImage: { name: name, size: size, type: type },
    //   }));
    // }

    // if (file && isValidFileType(file)) {
    //   setSelectedFile(file);
    //   // Additional actions with the valid file
    // } else {
    //   // Clear selected file if not valid
    //   setSelectedFile(null);
    //   alert("Please select a valid PNG or JPG file.");
    // }
  };

  return (
    <Box padding="2rem">
      {/* Add Service */}

      <Modal isOpen={isAddServiceOpen} onClose={handleCloseNewService}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Services</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Service Name</Text>
                <Input
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      serviceName: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Service Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Type your service description here..."
                />
              </Box>
              <Box>
                <Flex flexDirection="column" gap="0.5rem">
                  <Text fontWeight="bold">Upload Service Image:</Text>
                  <Input
                    id="upload-service"
                    type="file"
                    display="none"
                    onChange={handleFileChange}
                  />
                  <Text
                    id="upload-service-image"
                    as="label"
                    htmlFor="upload-service"
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
            <Button colorScheme="blue" mr={3} onClick={handleCloseNewService}>
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              onClick={handleSubmitNewService}
            >
              Add Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Service */}

      <Modal isOpen={isEditServiceOpen} onClose={handleCloseEdit}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Edit Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">Service Name</Text>
                <Input
                  spellCheck={false}
                  value={selectedService?.serviceName}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      serviceName: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Service Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Textarea
                  spellCheck={false}
                  value={selectedService?.description}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Type your service description here..."
                />
              </Box>
              <Box>
                <Flex flexDirection="column" gap="0.5rem">
                  <Text fontWeight="bold">Upload Service Image:</Text>
                  <Input
                    id="upload-edit-service"
                    type="file"
                    display="none"
                    // onChange={handleFileChange}
                  />
                  <Text
                    id="upload-edit-service-image"
                    as="label"
                    htmlFor="upload-edit-service"
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

      {/* Delete Service */}

      <Modal isOpen={isDeleteServiceOpen} onClose={handleCloseDelete}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Delete Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              {selectedDeleteService?.serviceName}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseDelete}>
              No
            </Button>
            <Button
              bgColor="red"
              color="neutral.100"
              onClick={handleDeleteService}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="1rem">
        Services
      </Text>
      <Button bgColor="brand.100" color="neutral.100" onClick={openAddService}>
        Add Service
      </Button>

      <Box>
        {isLoading ? (
          <Spinner size="lg" mt="4rem" />
        ) : (
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
                {data?.map((item) => (
                  <Tr key={item._id}>
                    <Td whiteSpace="normal">{item.serviceName}</Td>
                    <Td whiteSpace="normal">{item.description}</Td>
                    <Td color="brand.100">
                      <Text
                        _hover={{ textDecoration: "underline" }}
                        cursor="pointer"
                      >
                        {item.serviceImage}
                      </Text>
                    </Td>
                    <Td display="flex" gap="0.5rem">
                      <Button
                        bgColor="blue"
                        color="neutral.100"
                        marginBottom="1rem"
                        onClick={() => handleOpenEdit(item)}
                        isLoading={
                          updateServiceMutation.isLoading &&
                          updateServiceMutation.variables?._id === item._id
                        }
                        width="5rem"
                      >
                        Edit
                      </Button>
                      <Button
                        bgColor="red"
                        color="white"
                        width="5rem"
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

export default GymOwnerServices;
