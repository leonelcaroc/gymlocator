import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  TableContainer,
  Table,
  Text,
  Textarea,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack,
  OrderedList,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const GymOwnerTrainers = () => {
  const newUniqueId = uuidv4();
  const {
    isOpen: isAddNewTrainerOpen,
    onOpen: openAddNewTrainer,
    onClose: closeAddNewTrainer,
  } = useDisclosure();
  const [newCertificate, setNewCertificate] = useState({
    certificateName: "",
    key: "",
  });
  const [newSpecialty, setNewSpecialty] = useState({
    specialtyName: "",
    key: "",
  });
  const [newTrainer, setNewTrainer] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    dateOfBirth: null,
    gender: "",
    certifications: [],
    specialties: [],
    yearsOfExperience: 0,
    biography: "",
  });

  const handleDeleteCertification = (index) => {
    setNewTrainer((prevTrainer) => {
      const updatedCertifications = [...prevTrainer.certifications];
      updatedCertifications.splice(index, 1);

      return {
        ...prevTrainer,
        certifications: updatedCertifications,
      };
    });
  };

  const handleSubmitNewTrainer = () => {
    console.log(newTrainer);
    setNewTrainer({
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      contact: "",
      address: "",
      dateOfBirth: null,
      gender: "",
      certifications: [],
      specialties: [],
      yearsOfExperience: 0,
      biography: "",
    });
    closeAddNewTrainer();
  };

  const handleCloseNewTrainer = () => {
    setNewTrainer({
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      contact: "",
      address: "",
      dateOfBirth: null,
      gender: "",
      certifications: [],
      specialties: [],
      yearsOfExperience: 0,
      biography: "",
    });
    closeAddNewTrainer();
  };

  return (
    <Box padding="2rem">
      <Modal isOpen={isAddNewTrainerOpen} onClose={handleCloseNewTrainer}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Add Trainer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">First Name</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      firstname: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="First Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Middle Name</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      middlename: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Middle Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Last Name</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      lastname: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Last Name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  placeholder="Email"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Contact</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      contact: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Contact"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Address</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      address: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Address"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">BirthDate</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      dateOfBirth: e.target.value,
                    })
                  }
                  type="date"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Gender</Text>
                <Select
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      gender: e.target.value,
                    })
                  }
                  placeholder="Select Gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Box>
              <Stack spacing="0.8rem">
                <Text fontWeight="bold">Certifications</Text>
                <InputGroup>
                  <Input
                    value={newCertificate.certificateName}
                    onChange={(e) =>
                      setNewCertificate({
                        certificateName: e.target.value,
                        key: newUniqueId,
                      })
                    }
                    type="text"
                  />
                  <InputRightElement>
                    <Button
                      height="70%"
                      bgColor="brand.100"
                      marginRight="1rem"
                      onClick={() => {
                        if (newCertificate.certificateName !== "") {
                          setNewTrainer((prevTrainer) => ({
                            ...prevTrainer,
                            certifications: [
                              ...prevTrainer.certifications,
                              newCertificate,
                            ],
                          }));
                          setNewCertificate({
                            certificateName: "",
                            key: "",
                          });
                        }
                      }}
                    >
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <UnorderedList>
                  {newTrainer.certifications?.map((item, index) => (
                    <Flex key={item.key} justify="space-between" align="center">
                      <ListItem>{item.certificateName}</ListItem>
                      <CloseButton
                        onClick={() => handleDeleteCertification(index)}
                      />
                    </Flex>
                  ))}
                </UnorderedList>
              </Stack>
              <Stack spacing="0.8rem">
                <Text fontWeight="bold">Specialties</Text>
                <InputGroup>
                  <Input
                    value={newSpecialty.specialtyName}
                    onChange={(e) =>
                      setNewSpecialty({
                        specialtyName: e.target.value,
                        key: newUniqueId,
                      })
                    }
                    type="text"
                  />
                  <InputRightElement>
                    <Button
                      height="70%"
                      bgColor="brand.100"
                      marginRight="1rem"
                      onClick={() => {
                        if (newSpecialty.specialtyName !== "") {
                          setNewTrainer((prevTrainer) => ({
                            ...prevTrainer,
                            specialties: [
                              ...prevTrainer.specialties,
                              newSpecialty,
                            ],
                          }));
                          setNewSpecialty({
                            specialtyName: "",
                            key: "",
                          });
                        }
                      }}
                    >
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <UnorderedList>
                  {newTrainer.specialties?.map((item) => {
                    return (
                      <ListItem key={item.key}>{item.specialtyName}</ListItem>
                    );
                  })}
                </UnorderedList>
              </Stack>
              <Box>
                <Text fontWeight="bold">Years of Experience</Text>
                <Input
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      yearsOfExperience: parseInt(e.target.value, 10),
                    })
                  }
                  onKeyDown={(e) => {
                    const isNumeric = /^[0-9\b]+$/.test(e.key);
                    if (!isNumeric) {
                      e.preventDefault();
                    }
                  }}
                  type="number"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Biography</Text>
                <Textarea
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      biography: e.target.value,
                    })
                  }
                  type="text"
                />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseNewTrainer}>
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              onClick={handleSubmitNewTrainer}
            >
              Add Trainer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Trainers
      </Text>
      <Button
        bgColor="brand.100"
        color="neutral.100"
        onClick={openAddNewTrainer}
      >
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
