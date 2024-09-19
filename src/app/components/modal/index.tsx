import { useAppDispatch } from '@/lib/hooks';
import { addLocation } from '@/lib/slices/locationSlice';
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
} from '@chakra-ui/react';
import { LatLng } from 'leaflet';
import { Location } from './../../lib/slices/locationSlice';
import { SubmitEvent } from 'react';

type Props = {
  close: () => void;
  selected: LatLng | null;
};

const FormModal = ({ selected, close }: Props) => {
  const dispatch = useAppDispatch();

  // create a loc on submit
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formdan verileri al
    const formData = new FormData(e.target);
    const locData = Object.fromEntries(formData.entries());

    // prop olarak gelen enlem boylamı form veirlerine ekl
    const updatedData = {
      ...locData,
      lat: selected?.lat,
      lng: selected?.lng,
    };

    // redux'a yeni lokasyon ekleneceiğini bildir
    dispatch(addLocation(updatedData as Location));

    // modalı kapat
    close()
  };

  return (
    <Modal isOpen={!!selected} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Konum Oluştur</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Lokasyon İsmi</FormLabel>
              <Input name="title" placeholder="örn: İlk Durak" />
            </FormControl>

            <FormControl isRequired my={5}>
              <FormLabel>Enlem / Boylam</FormLabel>
              <Flex gap={2}>
                <Input disabled value={selected?.lat} />
                <Input disabled value={selected?.lng} />
              </Flex>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Renk</FormLabel>
              <Select name="color" placeholder="Renk seçiniz">
                <option value="red">Kırmızı</option>
                <option value="blue">Mavi</option>
                <option value="green">Yeşil</option>
              </Select>
            </FormControl>

            <ModalFooter my={3}>
              <Button variant="ghost" mr={3} onClick={close} type="button">
                Kapat
              </Button>
              <Button colorScheme="blue" type="submit">
                Oluştur
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
