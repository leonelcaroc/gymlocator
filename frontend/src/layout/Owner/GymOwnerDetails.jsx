import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Grid,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getGymDetails } from "../../api/ownerApi/privateOwnerApi";

const GymOwnerDetails = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [gymData, setGymData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const { data, isLoading, isError } = useQuery(
    "gymDetails",
    async () => getGymDetails(),
    {
      refetchOnWindowFocus: false,
      onSuccess: (item) => {
        // setOriginalData(item);
        // setProfileData(item);
        console.log(item);
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
    // if (data) {
    //   setProfileData(data);
    // }
    console.log(data);
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    // console.log("Edited Data:", profileData);
    // updateOwnerMutation.mutate(profileData);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
    // Reset the edited data to the original data or fetch from your backend
    // setProfileData(originalData);
  };

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="0.5rem">
        Gym Details
      </Text>

      <Box maxWidth="800px">
        <Grid templateColumns="repeat(2, 1fr)" columnGap="1rem" margin="auto">
          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Gym Name
            </Text>
            <Text color="brand.200" fontSize="1rem">
              Dolby Fitness
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Address
            </Text>
            <Text color="brand.200" fontSize="1rem">
              Caragasan Beach, Zamboanga West Coastal Road, Zamboanga, Zamboanga
              del Sur, Philippines
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Contact
            </Text>
            <Text color="brand.200" fontSize="1rem">
              09458963214
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Description
            </Text>
            <Text color="brand.200" fontSize="1rem">
              Sample description
            </Text>
          </Box>
          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Days Open
            </Text>
            <Text color="brand.200" fontSize="1rem">
              Monday
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              To
            </Text>
            <Text color="brand.200" fontSize="1rem">
              Friday
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Time Open
            </Text>
            <Text color="brand.200" fontSize="1rem">
              8:00AM
            </Text>
          </Box>

          <Box p="10px 0">
            <Text color="gray" fontSize="1rem">
              Time Close
            </Text>
            <Text color="brand.200" fontSize="1rem">
              7:00PM
            </Text>
          </Box>
        </Grid>

        <Flex p="10px 0">
          {isEditing ? (
            <>
              <Button
                onClick={handleSaveClick}
                // isLoading={updateOwnerMutation.isLoading}
                colorScheme="green"
                size="md"
                ml={2}
              >
                Save
              </Button>
              <Button
                onClick={handleCloseClick}
                colorScheme="red"
                size="md"
                ml={2}
              >
                Close
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEditClick}
              colorScheme="blue"
              size="md"
              ml={2}
            >
              Edit
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default GymOwnerDetails;
