import React from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Table,
  Td,
  Th,
  Tbody,
  Thead,
  Tr,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import AdminManageModal from "../../components/AdminManageModal/AdminManageModal";

import axios from "axios";
import { useQuery } from "react-query";

const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://gymlocator.co/api"
    : "http://localhost:5000/api";

const AdminGymManage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
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
    // {
    //   onSuccess: (data) => {
    //     console.log("Query successful:", data);
    //     // Your logic for successful response
    //   },
    //   onError: (error) => {
    //     console.error("Query error:", error);
    //     // Your logic for handling errors
    //   },
    // }
  );

  console.log(data);

  return (
    <Box padding="3rem">
      <AdminManageModal isOpen={isOpen} onClose={onClose} />
      <Text fontSize="2rem" fontWeight="600" marginBottom="1rem">
        Gym Manage
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gym Name</Th>
              <Th>Owner Name</Th>
              <Th>Address</Th>
              <Th>Contact</Th>
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
                  <Td whiteSpace="normal">{owner.gym.address}</Td>
                  <Td>{owner.gym.contact}</Td>
                  <Td>{owner.gym.isApproved}</Td>
                  <Td>
                    <Button
                      bgColor="brand.100"
                      color="neutral.100"
                      _hover={{ color: "brand.200", bgColor: "gray.300" }}
                      onClick={onOpen}
                    >
                      Manage
                    </Button>
                  </Td>
                </Tr>
              );
            })}

            {/* <Tr>
              <Td whiteSpace="normal">Gold's Gym</Td>
              <Td whiteSpace="normal">Mae Erasga</Td>
              <Td whiteSpace="normal">Zamboanga City</Td>
              <Td>09589654715</Td>
              <Td>Pending</Td>
              <Td>
                <Button
                  bgColor="brand.100"
                  color="neutral.100"
                  _hover={{ color: "brand.200", bgColor: "gray.300" }}
                  onClick={onOpen}
                >
                  Manage
                </Button>
              </Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminGymManage;
