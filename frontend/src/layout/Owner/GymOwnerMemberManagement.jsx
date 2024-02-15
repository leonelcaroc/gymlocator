import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getGymMembers, getMyGym } from "../../api/ownerApi/privateOwnerApi";
import { format } from "date-fns";
import UserSignUpModal from "../../components/UserSignUpModal/UserSignUpModal";
import { postAddNewMember } from "../../api/ownerApi/privateOwnerApi";

const GymOwnerMemberManagement = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const {
    isOpen: isAddMemberOpen,
    onOpen: openAddMember,
    onClose: closeAddMember,
  } = useDisclosure();

  const { data: gymMembers, isLoading: gymMemberLoading } = useQuery(
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

  const { data: ownerGym, isLoading: ownerGymLoading } = useQuery(
    "getMyGym",
    async () => {
      return getMyGym();
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

  const addMemberMutation = useMutation(
    async (formData) => {
      return postAddNewMember(
        formData.firstname,
        formData.middlename,
        formData.lastname,
        formData.email,
        formData.contact,
        formData.address,
        formData.dateOfBirth,
        formData.plan,
        formData.gender,
        formData.password,
        formData.gymId
      );
    },
    {
      onSuccess: (data) => {
        closeAddMember();
        queryClient.invalidateQueries("gymMembers");
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

  useEffect(() => {
    setPosts(gymMembers);
  }, [gymMembers]);

  const returnMembers = (status) => {
    const members = gymMembers?.filter(
      (item) => item.plan.planStatus === status
    );
    return members;
  };

  console.log(returnMembers("active"));

  return (
    <Box padding="2rem">
      {/* Add Member */}

      <UserSignUpModal
        modalName="Add New Member"
        isModalOpen={isAddMemberOpen}
        closeModal={closeAddMember}
        selectedGym={ownerGym}
        mutationFunc={addMemberMutation}
      />

      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Member Management
      </Text>
      <Button
        marginBottom="2rem"
        color="neutral.100"
        bgColor="brand.100"
        _hover={{ bgColor: "gray.200", color: "brand.100" }}
        onClick={openAddMember}
        isLoading={ownerGymLoading}
      >
        Add Walk-In Member
      </Button>
      <Flex alignItems="center" marginBottom="2rem">
        <Text marginRight="5rem">Search Member:</Text>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="0"
          maxWidth="20rem"
        />
      </Flex>

      <Tabs position="relative" variant="enclosed">
        <TabList>
          <Tab>Active</Tab>
          <Tab>Pending</Tab>
          <Tab>Expired</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th whiteSpace="normal">Member Name</Th>
                    <Th>Address</Th>
                    <Th whiteSpace="normal">Phone Number</Th>
                    <Th whiteSpace="normal">Email</Th>
                    <Th whiteSpace="normal">Start</Th>
                    <Th whiteSpace="normal">End</Th>
                    <Th whiteSpace="normal">Membership Type</Th>
                    <Th whiteSpace="normal">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gymMembers?.length > 0 ? (
                    currentPosts?.map((item) => (
                      <Tr key={item.user._id}>
                        <Td whiteSpace="normal">
                          {item.user.firstname} {item.user.lastname}
                        </Td>
                        <Td whiteSpace="normal">{item.user.address}</Td>
                        <Td>{item.user.contact}</Td>
                        <Td>{item.user.email}</Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.startTime, "MMMM d, yyyy")}
                        </Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.endTime, "MMMM d, yyyy")}
                        </Td>
                        <Td>{item.plan.planName}</Td>
                        <Td>{item.plan.planStatus}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="9" textAlign="center">
                        n/a
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            {gymMembers?.length !== 0 && !gymMemberLoading ? (
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
                {currentPage} of {Math.ceil(gymMembers?.length / itemsPerPage)}
                <Button
                  isDisabled={
                    currentPage === Math.ceil(gymMembers?.length / itemsPerPage)
                  }
                  onClick={() => {
                    if (currentPage !== posts.length)
                      setCurrentPage(currentPage + 1);
                  }}
                >
                  Next
                </Button>
              </Flex>
            ) : null}
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th whiteSpace="normal">Member Name</Th>
                    <Th>Address</Th>
                    <Th whiteSpace="normal">Phone Number</Th>
                    <Th whiteSpace="normal">Email</Th>
                    <Th whiteSpace="normal">Membership Type</Th>
                    <Th whiteSpace="normal">Amount</Th>
                    <Th whiteSpace="normal">Proof of Payment</Th>
                    <Th whiteSpace="normal">Status</Th>

                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gymMembers?.length > 0 ? (
                    currentPosts?.map((item) => (
                      <Tr key={item.user._id}>
                        <Td whiteSpace="normal">
                          {item.user.firstname} {item.user.lastname}
                        </Td>
                        <Td whiteSpace="normal">{item.user.address}</Td>
                        <Td>{item.user.contact}</Td>
                        <Td>{item.user.email}</Td>

                        <Td>{item.plan.planName}</Td>
                        <Td>10,000</Td>
                        <Td>
                          <Text
                            color="brand.100"
                            cursor="pointer"
                            _hover={{ textDecoration: "underline" }}
                          >
                            View
                          </Text>
                        </Td>
                        <Td>pending</Td>
                        <Td>
                          <Button>Manage</Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="9" textAlign="center">
                        n/a
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th whiteSpace="normal">Member Name</Th>
                    <Th>Address</Th>
                    <Th whiteSpace="normal">Phone Number</Th>
                    <Th whiteSpace="normal">Email</Th>
                    <Th whiteSpace="normal">Start</Th>
                    <Th whiteSpace="normal">End</Th>
                    <Th whiteSpace="normal">Membership Type</Th>
                    <Th whiteSpace="normal">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gymMembers?.length > 0 ? (
                    currentPosts?.map((item) => (
                      <Tr key={item.user._id}>
                        <Td whiteSpace="normal">
                          {item.user.firstname} {item.user.lastname}
                        </Td>
                        <Td whiteSpace="normal">{item.user.address}</Td>
                        <Td>{item.user.contact}</Td>
                        <Td>{item.user.email}</Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.startTime, "MMMM d, yyyy")}
                        </Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.endTime, "MMMM d, yyyy")}
                        </Td>
                        <Td>{item.plan.planName}</Td>
                        <Td>expired</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="9" textAlign="center">
                        n/a
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th whiteSpace="normal">Member Name</Th>
                    <Th>Address</Th>
                    <Th whiteSpace="normal">Phone Number</Th>
                    <Th whiteSpace="normal">Email</Th>
                    <Th whiteSpace="normal">Start</Th>
                    <Th whiteSpace="normal">End</Th>
                    <Th whiteSpace="normal">Membership Type</Th>
                    <Th whiteSpace="normal">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gymMembers?.length > 0 ? (
                    currentPosts?.map((item) => (
                      <Tr key={item.user._id}>
                        <Td whiteSpace="normal">
                          {item.user.firstname} {item.user.lastname}
                        </Td>
                        <Td whiteSpace="normal">{item.user.address}</Td>
                        <Td>{item.user.contact}</Td>
                        <Td>{item.user.email}</Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.startTime, "MMMM d, yyyy")}
                        </Td>
                        <Td whiteSpace="normal">
                          {format(item.plan.endTime, "MMMM d, yyyy")}
                        </Td>
                        <Td>{item.plan.planName}</Td>
                        <Td>rejected</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="9" textAlign="center">
                        n/a
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default GymOwnerMemberManagement;
