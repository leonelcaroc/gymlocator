import React from "react";
import {
  Flex,
  Icon,
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import gym from "../../assets/images/gym-sample.jpg";
import { FaStar } from "react-icons/fa";

const ExploreGymCard = () => {
  return (
    <Card
      direction="column"
      overflow="hidden"
      variant="outline"
      marginBlock="0.8rem"
      borderWidth="2px"
    >
      <Flex>
        <Image src={gym} alt="" boxSize="150px" objectFit="cover" />

        <Stack>
          <CardBody>
            <Heading size="md" color="brand.200">
              Daddee
            </Heading>
            <HStack direction="row" spacing="0.2rem" marginTop="0.3rem">
              <Text>(5.0)</Text>
              <Icon as={FaStar} color="brand.100" />
              <Icon as={FaStar} color="brand.100" />
              <Icon as={FaStar} color="brand.100" />
              <Icon as={FaStar} color="brand.100" />
              <Icon as={FaStar} color="brand.100" />
            </HStack>

            <Text py="2">Open 8:00 AM, Mon-Sat</Text>
          </CardBody>
        </Stack>
      </Flex>
      <Flex justifyContent="space-evenly" marginBlock="1rem">
        <Button
          variant="solid"
          bgColor="brand.100"
          color="neutral.100"
          width="120px"
          _hover={{ color: "brand.100", bgColor: "gray.200" }}
        >
          Direction
        </Button>
        <Button
          variant="solid"
          bgColor="brand.100"
          color="neutral.100"
          width="120px"
          _hover={{ color: "brand.100", bgColor: "gray.200" }}
        >
          Explore
        </Button>
      </Flex>
    </Card>
  );
};

export default ExploreGymCard;
