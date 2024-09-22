import { useAppDispatch } from "@/lib/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { FormEvent } from "react";
import Form from "../form";
import { addLocation, Location } from "@/lib/store/locationSlice";
import { toast } from "react-toastify";
type Props = {
  close: () => void;
  selected: LatLng | null;
};
const FormModal = ({ selected, close }: Props) => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const locData = Object.fromEntries(formData.entries());
    if (selected) {
      const updatedData: Location = {
        ...locData,
        lat: selected.lat,
        lng: selected.lng,
      } as Location;
      dispatch(addLocation(updatedData));
      toast.success("New Location added successfully");
    }
    close();
  };
  return (
    <Modal isOpen={!!selected} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Location</ModalHeader>
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
