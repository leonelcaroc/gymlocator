import { Box, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { Link, Center, Flex, Icon, Image, useToast } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { getMembers } from "../../api/ownerApi/privateOwnerApi";
import { useQuery, useQueryClient } from "react-query";

const GymOwnerDashboard = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, isLoading, isError } = useQuery(
    "members",
    async () => {
      return getMembers();
    },
    {
      onError: (error) => {
        toast({
          title: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 2000,
          position: "bottom-right",
        });
      },
    }
  );

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem">
        Good day,{" "}
        <Text color="brand.100" as="span">
          Dolby Fitness!
        </Text>
      </Text>
      <Text
        color="gray"
        marginTop="0.5rem"
        fontSize="1.1rem"
        marginBottom="2rem"
      >
        Welcome to your personal Dashboard
      </Text>
      <Flex>
        <Flex boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" padding="1rem">
          <Box>
            <Text marginBottom="0.5rem">JOINED MEMBER</Text>
            <Text fontSize="1.5rem">
              {data?.length > 0
                ? data?.filter((item) => item.plan.planstatus === "active")
                    .length
                : 0}
            </Text>
          </Box>

          <Icon
            as={MdPeopleAlt}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>

        <Flex boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" padding="1rem">
          <Box>
            <Text marginBottom="0.5rem">PENDING REQUESTS</Text>
            <Text fontSize="1.5rem">
              {data?.length > 0
                ? data?.filter((item) => item.plan.planstatus === "pending")
                    .length
                : 0}
            </Text>
          </Box>

          <Icon
            as={FaHourglassHalf}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>
        <Flex
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          padding="1rem"
          marginInline="1rem"
        >
          <Box>
            <Text marginBottom="0.5rem">EARNINGS</Text>
            <Text fontSize="1.5rem">PHP 1000</Text>
          </Box>
          <Icon
            as={FaDollarSign}
            color="gray"
            fontSize="2.5rem"
            marginInline="2rem"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default GymOwnerDashboard;
