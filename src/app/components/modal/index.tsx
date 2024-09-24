"use client";
import { useAppDispatch } from "@/lib/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import Form from "../form";
import { addLocation } from "@/lib/store/locationSlice";
import { toast } from "react-toastify";
import { Location, FormModalProps } from "@/utils/types";
const FormModal: React.FC<FormModalProps> = ({ selected, close }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const locData = Object.fromEntries(formData.entries()) as Omit<
      Location,
      "lat" | "lng"
    >;
    if (selected) {
      const updatedData: Location = {
        ...locData,
        lat: selected.lat,
        lng: selected.lng,
      };
      dispatch(addLocation(updatedData));
      toast.success("New Location added successfully");
    }
    close();
  };
  return (
    <Modal isOpen={!!selected} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Do you want to add to your location list?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selected && (
            <Form
              handleSubmit={handleSubmit}
              latlng={[selected.lat, selected.lng]}
              onClose={close}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default FormModal;
