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

const AdminGymManage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Tr>
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
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminGymManage;
