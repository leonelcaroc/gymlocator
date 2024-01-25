import React from "react";
import ExploreGymCard from "../ExploreGymCard/ExploreGymCard";
import { IoSearch } from "react-icons/io5";
import {
  Box,
  Button,
  Icon,
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  Select,
  Divider,
} from "@chakra-ui/react";

const ExploreBox = ({ owners, setExploreState, setSelectedGym }) => {
  return (
    <Flex
      flexDirection="column"
      width="30rem"
      bgColor="neutral.100"
      padding="2rem"
      borderRadius="10px"
    >
      <InputGroup
        bgColor="neutral.100"
        borderRadius="30px"
        alignItems="center"
        marginBottom="2rem"
      >
        <Input
          pr="4.5rem"
          type="search"
          placeholder="Search for..."
          borderRadius="30px"
          height="56px"
          color="accent.500"
        />
        <InputRightElement
          width="7rem"
          bgColor="none"
          height="full"
          borderRadius="20px"
          marginRight="0.8rem"
        >
          <Button
            color="neutral.100"
            bgColor="brand.100"
            type="submit"
            borderRadius="20px"
            width="50%"
            _hover={{ bgColor: "gray" }}
          >
            <Icon as={IoSearch} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex marginBottom="1rem">
        <Select
          placeholder="Ratings"
          marginRight="0.5rem"
          borderRadius="20px"
          cursor="pointer"
        >
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 stars</option>
        </Select>
        <Select
          placeholder="Classes"
          marginRight="0.5rem"
          borderRadius="20px"
          cursor="pointer"
        >
          <option value="Yoga">Yoga</option>
          <option value="Pilates">Pilates</option>
          <option value="Zumba">Zumba</option>
          <option value="Spinning">Spinning</option>
          <option value="Aerobics">Aerobics</option>
        </Select>
        <Select placeholder="Amenities" borderRadius="20px" cursor="pointer">
          <option value="Pool">Pool</option>
          <option value="Sauna">Sauna</option>
          <option value="Steam Room">Steam Room</option>
          <option value="Group Classes">Group Classes</option>
          <option value="Personal Training">Personal Training</option>
        </Select>
      </Flex>
      <Divider />
      <Box maxHeight="300px" overflow="auto">
        {owners?.length === 0 ? (
          <Box
            textAlign="center"
            marginBlock="2rem"
            fontWeight="600"
            fontSize="1.3rem"
          >
            "No Results Found"
          </Box>
        ) : (
          owners?.map((item) => (
            <ExploreGymCard
              key={item._id}
              owner={item}
              setExploreState={setExploreState}
              setSelectedGym={setSelectedGym}
            />
          ))
        )}
      </Box>
    </Flex>
  );
};

export default ExploreBox;
