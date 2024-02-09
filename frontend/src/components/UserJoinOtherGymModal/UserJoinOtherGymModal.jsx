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

import { postUserJoinGym } from "../../api/userApi/privateUserApi";
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";

const UserJoinOtherGymModal = ({ isModalOpen, closeModal, selectedGym }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [signUpUser, setSignUpUser] = useState({
    gymId: null,
    plan: null,
  });

  useEffect(() => {
    setSignUpUser((prevUser) => ({
      ...prevUser,
      gymId: selectedGym?._id,
    }));

    return () => {
      setSignUpUser({
        gymId: null,
        plan: null,
      });
    };
  }, [selectedGym]);

  const userJoinGymMutation = useMutation(
    async (formData) => {
      return postUserJoinGym(formData.plan, formData.gymId);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("gymOwners");
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
      },
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

  const handleUserJoinGym = () => {
    userJoinGymMutation.mutate(signUpUser);
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent paddingInline="2rem" maxWidth="35rem">
        <ModalHeader>Join at {selectedGym?.gym.gymname}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="1rem">
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
              <Text fontWeight="bold">Duration</Text>
              <Input
                color="black"
                variant="filled"
                value={
                  signUpUser.plan ? `${signUpUser.plan?.duration} days` : "n/a"
                }
                type="text"
                disabled
              />
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
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Close
          </Button>
          <Button
            bgColor="brand.100"
            color="neutral.100"
            isLoading={userJoinGymMutation.isLoading}
            onClick={handleUserJoinGym}
          >
            Sign Up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserJoinOtherGymModal;
