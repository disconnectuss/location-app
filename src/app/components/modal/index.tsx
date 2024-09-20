import { useAppDispatch } from "@/lib/hooks";
import { addLocation } from "@/lib/slices/locationSlice";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { Location } from "./../../lib/slices/locationSlice";
import { FormEvent } from "react";
import Form from "../form";

type Props = {
  close: () => void;
  selected: LatLng | null;
};

const FormModal = ({ selected, close }: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Instead of @ts-expect-error, explicitly cast the target as HTMLFormElement
    const formData = new FormData(e.target as HTMLFormElement);
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
          <Form
            handleSubmit={handleSubmit}
            latlng={[selected?.lat, selected?.lng] as [number, number]}
            onClose={close}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;

