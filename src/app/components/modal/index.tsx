import { useAppDispatch } from "@/lib/hooks";
import { addLocation } from "@/lib/slices/locationSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
} from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { Location } from "./../../lib/slices/locationSlice";
import { FormEvent } from "react";

type Props = {
  close: () => void;
  selected: LatLng | null;
};

const FormModal = ({ selected, close }: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target); // eslint-disable-line, check it again 
    const locData = Object.fromEntries(formData.entries());

    const updatedData = {
      ...locData,
      lat: selected?.lat,
      lng: selected?.lng,
    };

    dispatch(addLocation(updatedData as Location));

    close();
  };

  return (
    <Modal isOpen={!!selected} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Location</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Location Name</FormLabel>
              <Input name="title" placeholder="e.g., First Stop" />
            </FormControl>

            <FormControl isRequired my={5}>
              <FormLabel>Latitude / Longitude</FormLabel>
              <Flex gap={2}>
                <Input disabled value={selected?.lat} />
                <Input disabled value={selected?.lng} />
              </Flex>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Color</FormLabel>
              <Select name="color" placeholder="Select a color">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </Select>
            </FormControl>

            <ModalFooter my={3}>
              <Button variant="ghost" mr={3} onClick={close} type="button">
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
