import React from "react";
import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import FeatureGymCard from "../../components/FeaturedGymCard/FeatureGymCard";
import gym from "../../assets/images/gym-sample.jpg";

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
      <Flex marginBlock="5rem" paddingInline="5rem">
        <Box width="80rem">
          <Image src={gym} alt="This is a gym" borderRadius="lg" width="full" />
        </Box>

        <Flex flexDirection="column" paddingInline="3rem">
          <Text color="brand.100" fontSize="1.5rem" fontWeight="800">
            ABOUT US
          </Text>
          <Text color="brand.200" fontSize="2.5rem" fontWeight="900">
            Welcome to Gym Locator
          </Text>
          <Text marginBlock="1rem">
            At Gym Locator, we are dedicated to simplifying gym management and
            enhancing the fitness experience. Our mission is to provide you with
            the tools you need to succeed in the fitness industry.
          </Text>
          <Text marginBlock="1rem">
            Our system is designed to streamline your gym's operations, from
            membership management to class scheduling, allowing you to focus on
            what you do best - helping people achieve their fitness goals.
          </Text>
          <Button bgColor="brand.100" maxWidth="10rem">
            Read More
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Feature;
