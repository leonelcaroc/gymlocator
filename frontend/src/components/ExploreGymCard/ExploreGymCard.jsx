import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import gym from "../../assets/images/gym-sample.jpg";

const ExploreGymCard = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={gym} />

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ExploreGymCard;
