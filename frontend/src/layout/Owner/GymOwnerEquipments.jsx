import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const GymOwnerEquipments = () => {
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
        Gym Equipments
      </Text>
      <Stack spacing="2rem">
        <Flex flexDirection="column" gap="0.5rem">
          <Text color="gray" fontSize="1.2rem">
            Equipment Name
          </Text>
          <Input type="text" placeholder="Equipment Name" />
        </Flex>
        <Flex flexDirection="column" gap="0.5rem">
          <Text color="gray" fontSize="1.2rem">
            Description
          </Text>
          <Textarea placeholder="Here is a sample placeholder" />
        </Flex>
        <Flex flexDirection="column" gap="0.5rem">
          <Text color="gray" fontSize="1.2rem">
            Upload Equipment Image:
          </Text>
          <Input
            id="upload-equipment"
            type="file"
            display="none"
            onChange={handleFileChange}
          />
          <Text
            id="upload-equipment-image"
            as="label"
            for="upload-equipment"
            marginInline="0.8rem 1.2rem"
            width="fit-content"
          >
            Choose file
          </Text>
        </Flex>

        <Button bgColor="brand.100" color="neutral.100" width="fit-content">
          Add Equipment
        </Button>
      </Stack>
    </Box>
  );
};

export default GymOwnerEquipments;
