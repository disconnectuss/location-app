"use client";
import { FormProps } from "@/utils/types/types";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const Form: React.FC<FormProps> = ({
  handleSubmit,
  editItem,
  latlng,
  onClose,
}) => {
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Location Name</FormLabel>
        <Input
          defaultValue={editItem?.title || ""}
          name="title"
          placeholder="e.g., First Stop"
          aria-label="Location Name"
        />
      </FormControl>
      <FormControl isRequired my={5}>
        <FormLabel>Latitude / Longitude</FormLabel>
        <Flex gap={2}>
          <Input
            disabled
            value={latlng ? latlng[0] : editItem?.lat || ""}
            aria-label="Latitude"
          />
          <Input
            disabled
            value={latlng ? latlng[1] : editItem?.lng || ""}
            aria-label="Longitude"
          />
        </Flex>
      </FormControl>
      <FormControl isRequired my={5}>
        <FormLabel>Color</FormLabel>
        <Select
          defaultValue={editItem?.color || ""}
          name="color"
          placeholder="Select a color"
          aria-label="Location Color"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </Select>
      </FormControl>
      <Flex justifyContent="end">
        <Button
          variant="ghost"
          mr={3}
          type="button"
          onClick={editItem ? () => router.push("/list") : onClose}
        >
          {editItem ? "Back" : "Close"}
        </Button>
        <Button colorScheme="blue" type="submit">
          {editItem ? "Save" : "Add"}
        </Button>
      </Flex>
    </form>
  );
};
export default Form;
