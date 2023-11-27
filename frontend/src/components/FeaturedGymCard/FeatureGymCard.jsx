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
    <Card
      maxW="sm"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
      marginInline="1rem"
    >
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
