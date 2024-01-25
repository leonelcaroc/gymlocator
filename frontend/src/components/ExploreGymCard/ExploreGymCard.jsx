import { useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import gym from "../../assets/images/gym-sample.jpg";
import { FaStar } from "react-icons/fa";

import StarRating from "../StarRating/StarRating";

import { useNavigate } from "react-router-dom";
import getAbbreviatedDay from "../../utils/getAbbreviatedDay";
import { formattedTime } from "../../utils/convertToAmericanTime";

const ExploreGymCard = ({ owner, setExploreState, setSelectedGym }) => {
  const [review, setReview] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const firstDay = getAbbreviatedDay(owner.gym.schedule.startday);
  const endDay = getAbbreviatedDay(owner.gym.schedule.endday);
  const startTime = formattedTime(owner.gym.schedule.opentime);
  const endTime = formattedTime(owner.gym.schedule.closetime);

  return (
    <Card
      direction="column"
      overflow="hidden"
      variant="outline"
      marginBlock="0.8rem"
      borderWidth="2px"
    >
      {/* This is the Modal for User Sign Up - see ABOVE*/}
      <Flex>
        <Image src={gym} alt="" boxSize="150px" objectFit="cover" />

        <Stack>
          <CardBody>
            <Heading size="md" color="brand.200">
              {owner.gym.gymname}
            </Heading>
            <HStack
              direction="row"
              spacing="0.2rem"
              marginTop="0.3rem"
              marginBottom="0.5rem"
            >
              <Text>(1.7)</Text>

              <StarRating rating="1.7" />
            </HStack>

            <Text>
              Open {startTime}-{endTime}
            </Text>
            <Text>
              {firstDay}-{endDay}
            </Text>
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
          onClick={() => setExploreState("map")}
        >
          Direction
        </Button>
        <Button
          variant="solid"
          bgColor="brand.100"
          color="neutral.100"
          width="120px"
          _hover={{ color: "brand.100", bgColor: "gray.200" }}
          onClick={() => {
            setExploreState("explore");
            setSelectedGym(owner);
          }}
        >
          Explore
        </Button>
      </Flex>
    </Card>
  );
};

export default ExploreGymCard;
