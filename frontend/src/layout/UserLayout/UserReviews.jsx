import React, { useState, useEffect } from "react";
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
import StarRating from "../../components/StarRating/StarRating";

const UserReviews = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const [selectedSub, setSelectedSub] = useState(null);

  const {
    isOpen: isGymReviewOpen,
    onOpen: openGymReview,
    onClose: closeGymReview,
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

  useEffect(() => {
    setPosts(data);
  }, [data]);

  return (
    <Box padding="2rem">
      {/* Review Modal*/}

      <Modal isOpen={isGymReviewOpen} onClose={closeGymReview}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>Review Ben's Gym</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Give Ben's Gym a review <Text as="span" fontWeight="bold"></Text>
              <StarRating />
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              // onClick={handleCloseSub}
            >
              No
            </Button>
            <Button
              bgColor="red"
              color="neutral.100"
              // onClick={handleCancelSub}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Reviews
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>Star</Th>
              <Th>Review</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Ben's Gym</Td>
              <Td>
                <Box display="inline-block">
                  <StarRating />
                </Box>
              </Td>
              <Td>
                <Button onClick={openGymReview}>Review</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {data?.length !== 0 && !isLoading ? (
        <Flex
          alignItems="center"
          gap={5}
          mt={5}
          justifyContent="center"
          mr={10}
        >
          <Button
            isDisabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </Button>
          {currentPage} of {Math.ceil(data?.length / itemsPerPage)}
          <Button
            isDisabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
            onClick={() => {
              if (currentPage !== posts.length) setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default UserReviews;
