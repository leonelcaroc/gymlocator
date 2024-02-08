import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getUserSubscription,
  // updateUserSub,
} from "../../api/userApi/privateUserApi";
import formatDateToCustomFormat from "../../utils/formatDateToCustomFormat";
import TokenService from "../../services/token";

const UserSubscriptions = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [selectedSub, setSelectedSub] = useState(null);

  const {
    isOpen: isCancelSubOpen,
    onOpen: openCancelSub,
    onClose: closeCancelSub,
  } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
    "userSubscription",
    async () => {
      return getUserSubscription();
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

  // const updateUserSubMutation = useMutation(
  //   async (formData) => {
  //     return updateUserSub(formData.gymId, formData.userId);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       toast({
  //         title: data.message,
  //         status: "success",
  //         duration: 2000,
  //         position: "bottom-right",
  //       });

  //       // Invalidate and refetch any queries that depend on the user data
  //       queryClient.invalidateQueries("userSubscription");
  //     },
  //     onError: (error) => {
  //       toast({
  //         title: error.response.data.error || "Something went wrong",
  //         status: "error",
  //         duration: 2000,
  //         position: "bottom-right",
  //       });
  //     },
  //   }
  // );

  // const handleOpenSub = (subscription) => {
  //   setSelectedSub(subscription);
  //   openCancelSub();
  // };

  // const handleCancelSub = () => {
  //   updateUserSubMutation.mutate({
  //     gymId: selectedSub?.gym.ownerId,
  //     userId: JSON.parse(TokenService.getUserLocal())._id,
  //   });

  //   // setSelectedSub(null);
  //   // closeCancelSub();
  // };

  // const handleCloseSub = () => {
  //   setSelectedSub(null);
  //   closeCancelSub();
  //   // Reset the edited data to the original data or fetch from your backend
  // };

  return (
    <Box padding="2rem">
      {/* Cancel Sub Modal*/}

      {/* <Modal isOpen={isCancelSubOpen} onClose={handleCloseSub}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Cancel Subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to cancel subscription in{" "}
              <Text as="span" fontWeight="bold">
                {selectedSub?.gym.gymname}
              </Text>
              ?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCloseSub}>
              No
            </Button>
            <Button bgColor="red" color="neutral.100" onClick={handleCancelSub}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Subscriptions
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>End Date</Th>
              <Th>Plan</Th>
              <Th>Status</Th>
              {/* <Th>Action</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item._id}>
                <Td whiteSpace="normal">{item.gym.gymname}</Td>
                <Td>{formatDateToCustomFormat(item.myPlan.endTime)}</Td>
                <Td>{item.myPlan.planName}</Td>
                <Td>{item.myPlan.planStatus}</Td>
                {/* <Td>
                  <Button
                    bgColor="red"
                    color="neutral.100"
                    _hover={{ color: "red", bgColor: "gray.200" }}
                    onClick={() => handleOpenSub(item)}
                    // onClick={() =>
                    //   handleCancelSub(
                    //     item.gym._id,
                    //     JSON.parse(TokenService.getUserLocal())._id
                    //   )
                    // }
                  >
                    Cancel
                  </Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserSubscriptions;
