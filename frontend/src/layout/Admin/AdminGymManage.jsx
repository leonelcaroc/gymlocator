import { useState } from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Table,
  Td,
  Th,
  Tbody,
  Thead,
  Tr,
  TableContainer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AdminManageModal from "../../components/AdminManageModal/AdminManageModal";

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateGymStatus } from "../../api/adminApi/privateAdminApi";

const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://gymlocator.co/api"
    : "http://localhost:5000/api";

const AdminGymManage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    isOpen: isImageOpen,
    onOpen: openImage,
    onClose: closeImage,
  } = useDisclosure();

  const updateGymStatusMutation = useMutation(
    async (data) => updateGymStatus(data.action, data.id),
    {
      onSuccess: (data) => {
        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });

        onClose();
        refetch();

        // Invalidate and refetch any queries that depend on the user data
        queryClient.invalidateQueries("ownersList");
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

  const { data, isLoading, isError, refetch } = useQuery(
    "ownersList",
    async () => {
      return axios
        .get(`${apiUrl}/admin/owners`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("adminInfo")).token
            }`,
          },
        })
        .then((res) => res.data);
    }
  );

  const handleManageClick = (owner) => {
    setSelectedOwner(owner);
    onOpen();
  };

  const handleOpenImage = (url) => {
    setSelectedImageUrl(url);
    openImage();
  };

  const handleCloseImage = () => {
    setSelectedImageUrl(null);
    closeImage();
  };

  return (
    <Box padding="3rem">
      {/* Open Image Modal */}

      <Modal isOpen={isImageOpen} onClose={handleCloseImage}>
        <ModalOverlay />
        <ModalContent>
          <Image
            src={selectedImageUrl}
            alt=""
            boxSize="100%"
            position="absolute"
            width="600px"
            height="400px"
            top="0"
            left="0"
          />
        </ModalContent>
      </Modal>
      <AdminManageModal
        isOpen={isOpen}
        onClose={onClose}
        owner={selectedOwner}
        updateGymStatusMutation={updateGymStatusMutation}
      />
      <Text fontSize="2rem" fontWeight="600" marginBottom="1rem">
        Gym Manage
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>Owner Name</Th>
              {/* <Th>Address</Th> */}
              {/* <Th>Contact</Th> */}
              <Th>Permit</Th>
              {/* <Th>Gym Image</Th> */}
              <Th>Status</Th>
              <Th>Manage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((owner) => {
              return (
                <Tr key={owner._id}>
                  <Td whiteSpace="normal">{owner.gym.gymname}</Td>
                  <Td whiteSpace="normal">
                    {owner.firstname} {owner.lastname}
                  </Td>
                  {/* <Td whiteSpace="normal">{owner.gym.address}</Td> */}
                  {/* <Td>{owner.gym.contact}</Td> */}
                  <Td
                    color="brand.100"
                    cursor="pointer"
                    onClick={() => handleOpenImage(owner.gym.permitImage?.url)}
                    _hover={{ textDecoration: "underline" }}
                  >
                    View Permit
                  </Td>
                  {/* <Td
                    color="brand.100"
                    cursor="pointer"
                    onClick={() => handleOpenImage(owner.gym.gymImage?.url)}
                    _hover={{ textDecoration: "underline" }}
                  >
                    View Gym Image
                  </Td> */}
                  <Td>{owner.gym.isApproved}</Td>
                  <Td>
                    <Button
                      bgColor="brand.100"
                      color="neutral.100"
                      _hover={{ color: "brand.200", bgColor: "gray.300" }}
                      onClick={() => handleManageClick(owner)}
                    >
                      Manage
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminGymManage;
