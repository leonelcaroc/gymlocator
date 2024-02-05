import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getGymMembers } from "../../api/ownerApi/privateOwnerApi";
import { format } from "date-fns";

const GymOwnerMemberManagement = () => {
  const toast = useToast();

  const { data, isLoading, isError } = useQuery(
    "gymMembers",
    async () => {
      return getGymMembers();
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

  console.log(data);

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Member Management
      </Text>
      <Flex alignItems="center" marginBottom="2rem">
        <Text marginRight="5rem">Search Member:</Text>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="0"
          maxWidth="20rem"
        />
      </Flex>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th whiteSpace="normal">Member Name</Th>
              <Th>Address</Th>
              <Th whiteSpace="normal">Phone Number</Th>
              <Th whiteSpace="normal">Email</Th>
              <Th whiteSpace="normal">Membership Type</Th>
              <Th>Amount</Th>
              <Th whiteSpace="normal">Start Date</Th>
              <Th whiteSpace="normal">End Date</Th>
              <Th whiteSpace="normal">Payment Status</Th>
              {/* <Th>Action</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item.user._id}>
                <Td whiteSpace="normal">
                  {item.user.firstname} {item.user.lastname}
                </Td>
                <Td whiteSpace="normal">{item.user.address}</Td>
                <Td>{item.user.contact}</Td>
                <Td>{item.user.email}</Td>
                <Td>{item.plan.planName}</Td>
                <Td>{item.plan.amount}</Td>
                <Td whiteSpace="normal">
                  {format(item.plan.startTime, "MMMM d, yyyy")}
                </Td>
                <Td whiteSpace="normal">
                  {format(item.plan.endTime, "MMMM d, yyyy")}
                </Td>
                <Td>{item.plan.paymentStatus}</Td>
                {/* <Td display="flex" flexDirection="">
                  <Button
                    bgColor="blue"
                    color="neutral.100"
                    marginBottom="1rem"
                  >
                    Edit
                  </Button>
                  <Button bgColor="red" color="white">
                    Delete
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

export default GymOwnerMemberManagement;
