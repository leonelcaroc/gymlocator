import React from "react";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  ButtonGroup,
  CardFooter,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const FeatureGymCard = ({ name }) => {
  return (
    <Card maxW="sm" boxShadow="lg" marginInline="1rem">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading
            size="md"
            textAlign="center"
            fontWeight="800"
            fontSize="1.75rem"
          >
            {name}
          </Heading>
          <Stack direction="row" justifyContent="center">
            <Icon as={FaStar} color="brand.100" />
            <Icon as={FaStar} color="brand.100" />
            <Icon as={FaStar} color="brand.100" />
            <Icon as={FaStar} color="brand.100" />
            <Icon as={FaStar} color="brand.100" />
          </Stack>
          <Text textAlign="center">
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2" marginInline="auto">
          <Button bgColor="brand.100">Explore</Button>
          <Button bgColor="brand.100">Join now</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default FeatureGymCard;
