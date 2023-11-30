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
import { useNavigate } from "react-router-dom";

const ExploreGymCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  return (
    <Card
      direction="column"
      overflow="hidden"
      variant="outline"
      marginBlock="0.8rem"
      borderWidth="2px"
    >
      {/* This is the Modal for User Sign Up - see BELOW*/}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingInline="2rem" maxWidth="35rem">
          <ModalHeader>User Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="1rem">
              <Box>
                <Text fontWeight="bold">First Name</Text>
                <Input type="text" placeholder="First Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Middle Name</Text>
                <Input type="text" placeholder="Middle Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Last Name</Text>
                <Input type="text" placeholder="Last Name" />
              </Box>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <Input type="email" placeholder="Email" />
              </Box>
              <Box>
                <Text fontWeight="bold">Phone Number</Text>
                <Input type="text" placeholder="Phone Number" />
              </Box>
              <Box>
                <Text fontWeight="bold">Address</Text>
                <Textarea placeholder="Type your address here..." />
              </Box>
              <Box>
                <Text fontWeight="bold">Birthdate</Text>
                <Input type="date" />
              </Box>
              <Box>
                <Text fontWeight="bold">Membership Type</Text>
                <Select placeholder="Select Membership Type">
                  <option value="option1">Basic</option>
                  <option value="option1">Standard</option>
                  <option value="option1">Premium</option>
                </Select>
              </Box>
              <Box>
                <Text fontWeight="bold">Membership Fee</Text>
                <Input
                  color="black"
                  variant="filled"
                  value="PHP 5000"
                  type="text"
                  disabled
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Gender</Text>
                <Select placeholder="Select Gender">
                  <option value="option1">Male</option>
                  <option value="option2">Female</option>
                </Select>
              </Box>
              <Box>
                <Text fontWeight="bold">Username</Text>
                <Input type="text" placeholder="Username" />
              </Box>
              <Box>
                <Text fontWeight="bold">Password</Text>
                <Input type="password" placeholder="Password" />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              bgColor="brand.100"
              color="neutral.100"
              onClick={() => navigate("/userlogin")}
            >
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* This is the Modal for User Sign Up - see ABOVE*/}
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
          onClick={onOpen}
        >
          Explore
        </Button>
      </Flex>
    </Card>
  );
};

export default ExploreGymCard;
