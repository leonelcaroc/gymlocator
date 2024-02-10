import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Box,
  Text,
  Input,
  Textarea,
  Select,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { postRegisterUser } from "../../api/userApi/userApi";
import { useMutation } from "react-query";
import { useEffect } from "react";

const UserSignUpModal = ({
  isModalOpen,
  closeModal,
  selectedGym,
  modalName,
  mutationFunc,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [signUpUser, setSignUpUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    dateOfBirth: "",
    gymId: null,
    plan: null,
    gender: "",
    password: "",
  });

  useEffect(() => {
    setSignUpUser((prevUser) => ({
      ...prevUser,
      gymId: selectedGym?._id,
    }));

    return () => {
      setSignUpUser({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        contact: "",
        address: "",
        dateOfBirth: "",
        gymId: null,
        plan: null,
        gender: "",
        password: "",
      });
    };
  }, [selectedGym]);

  const handlePlanChange = (event) => {
    const selectedPlanId = event.target.value;

    const selectedPlanObject = selectedGym?.gym?.plans.find(
      (plan) => plan._id === selectedPlanId
    );

    setSignUpUser({
      ...signUpUser,
      plan: selectedPlanObject,
    });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent paddingInline="2rem" maxWidth="35rem">
        <ModalHeader>{modalName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="1rem">
            <Box>
              <Text fontWeight="bold">First Name</Text>
              <Input
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
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
                  setSignUpUser({
                    ...signUpUser,
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
                  setSignUpUser({
                    ...signUpUser,
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
                  setSignUpUser({
                    ...signUpUser,
                    email: e.target.value,
                  })
                }
                type="email"
                placeholder="Email"
              />
            </Box>
            <Box>
              <Text fontWeight="bold">Phone Number</Text>
              <Input
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
                    contact: e.target.value,
                  })
                }
                type="text"
                placeholder="Phone Number"
              />
            </Box>
            <Box>
              <Text fontWeight="bold">Address</Text>
              <Textarea
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
                    address: e.target.value,
                  })
                }
                placeholder="Type your address here..."
              />
            </Box>
            <Box>
              <Text fontWeight="bold">Birthdate</Text>
              <Input
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
                    dateOfBirth: e.target.value,
                  })
                }
                type="date"
              />
            </Box>
            <Box>
              <Text fontWeight="bold">Membership Type</Text>
              <Select
                onChange={handlePlanChange}
                placeholder="Select Membership Type"
              >
                {selectedGym?.gym?.plans.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.planName}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <Text fontWeight="bold">Membership Fee</Text>
              <Input
                color="black"
                variant="filled"
                value={
                  signUpUser.plan ? `PHP ${signUpUser.plan?.amount}` : "n/a"
                }
                type="text"
                disabled
              />
            </Box>
            <Box>
              <Text fontWeight="bold">Gender</Text>
              <Select
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
                    gender: e.target.value,
                  })
                }
                placeholder="Select Gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </Box>
            <Box>
              <Text fontWeight="bold">Password</Text>
              <Input
                onChange={(e) =>
                  setSignUpUser({
                    ...signUpUser,
                    password: e.target.value,
                  })
                }
                type="password"
                placeholder="Password"
              />
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Close
          </Button>
          <Button
            bgColor="brand.100"
            color="neutral.100"
            isLoading={mutationFunc.isLoading}
            onClick={() => mutationFunc.mutate(signUpUser)}
          >
            Sign Up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserSignUpModal;
