import React from "react";
import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import FeatureGymCard from "../../components/FeaturedGymCard/FeatureGymCard";
import { FaStar } from "react-icons/fa";

const Feature = () => {
  return (
    <Flex bgColor="neutral.100" flexDirection="column" paddingTop="5rem">
      <Flex flexDirection="column" marginInline="auto">
        <Box>
          <Text
            color="brand.100"
            fontWeight="bold"
            fontSize="1.5rem"
            textAlign="center"
          >
            FEATURED GYMS
          </Text>
        </Box>

        <Text
          color="brand.200"
          fontSize="3rem"
          fontWeight="extrabold"
          marginBottom="1rem"
        >
          Find Your Ideal Fitness Center
        </Text>
      </Flex>
      <Flex marginInline="auto">
        <FeatureGymCard name="Gym 1" />
        <FeatureGymCard name="Gym 2" />
        <FeatureGymCard name="Gym 3" />
      </Flex>
    </Flex>
  );
};

export default Feature;
