"use client";
import { Location } from "@/lib/slices/locationSlice";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  editItem?: Location;
  onClose?: () => void;
  latlng?: [number, number];
};

const Form = ({ handleSubmit, editItem,latlng }: Props) => {
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Location Name</FormLabel>
        <Input
          defaultValue={editItem?.title}
          name="title"
          placeholder="e.g., First Stop"
        />
      </FormControl>

      <FormControl isRequired my={5}>
        <FormLabel>Latitude / Longitude</FormLabel>
        <Flex gap={2}>
          <Input disabled value={latlng ? latlng[0] : editItem?.lat} />
          <Input disabled value={latlng ? latlng[1] : editItem?.lat} />
        </Flex>
      </FormControl>

      <FormControl isRequired my={5}>
        <FormLabel>Color</FormLabel>
        <Select
          defaultValue={editItem?.color}
          name="color"
          placeholder="Select a color"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </Select>
      </FormControl>

      <Flex justifyContent="end">
        {editItem ? (
          <Button
            variant="ghost"
            mr={3}
            type="button"
            onClick={() => router.push("/list")}
          >
            Back
          </Button>
        ) : (
          <Button variant="ghost" mr={3} onClick={close} type="button">
            Close
          </Button>
        )}

        <Button colorScheme="blue" type="submit">
          {editItem ? "Save" : "Create"}
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
