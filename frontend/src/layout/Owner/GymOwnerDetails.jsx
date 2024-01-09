import React from "react";
import { Text, Box, Flex, Button, Grid } from "@chakra-ui/react";

const GymOwnerDetails = () => {
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
          <Button bgColor="brand.100">Edit Profile</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default GymOwnerDetails;
