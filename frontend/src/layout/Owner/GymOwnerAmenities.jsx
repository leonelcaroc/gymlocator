import React from "react";
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Input,
  Stack,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Divider,
} from "@chakra-ui/react";

const GymOwnerAmenities = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      // Additional actions with the valid file
    } else {
      // Clear selected file if not valid
      setSelectedFile(null);
      alert("Please select a valid PNG or JPG file.");
    }
  };

  return (
    <Box padding="2rem">
      <Text color="brand.200" fontSize="2rem" marginBottom="2rem">
        Amenities
      </Text>
      <Stack spacing="2rem">
        <Flex flexDirection="column" gap="0.5rem">
          <Text fontWeight="bold">Amenity Name</Text>
          <Input type="text" placeholder="Amenity Name" />
        </Flex>
        <Flex flexDirection="column" gap="0.5rem">
          <Text fontWeight="bold">Description</Text>
          <Textarea placeholder="Type your amenity description here" />
        </Flex>
        <Flex flexDirection="column" gap="0.5rem">
          <Text fontWeight="bold">Upload Amenity Image:</Text>
          <Input
            id="upload-amenity"
            type="file"
            display="none"
            onChange={handleFileChange}
          />
          <Text
            id="upload-amenity-image"
            as="label"
            htmlFor="upload-amenityt"
            marginInline="0.8rem 1.2rem"
            width="fit-content"
          >
            Choose file
          </Text>
        </Flex>

        <Button bgColor="brand.100" color="neutral.100" width="fit-content">
          Add Amenity
        </Button>
      </Stack>
      <Divider marginBlock="2rem" borderWidth="1px" borderColor="gray.400" />
      <TableContainer marginTop="1.5rem">
        <Heading as="h3" size="lg" marginBottom="1rem">
          List of Amenities
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Amenity Name</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Shower</Td>
              <Td>This is for description for amenity</Td>
              <Td color="brand.100">
                <Text _hover={{ textDecoration: "underline" }} cursor="pointer">
                  amenity.jpg
                </Text>
              </Td>
              <Td display="flex" gap="0.5rem">
                <Button bgColor="blue" color="neutral.100" marginBottom="1rem">
                  Edit
                </Button>
                <Button bgColor="red" color="white">
                  Delete
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GymOwnerAmenities;
