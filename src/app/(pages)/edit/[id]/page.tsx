"use client";
import Form from "@/components/form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLocation } from "@/lib/slices/locationSlice";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Location } from "../../../lib/slices/locationSlice";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const LocationEdit = ({ params }: Props) => {
  const { locations } = useAppSelector((store) => store.location);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const found = locations.find((i) => i.id === params.id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-ignore
    const formData = new FormData(e.target);
    const locData = Object.fromEntries(formData.entries());

    const updatedLoc = { ...found, ...locData };

    dispatch(updateLocation(updatedLoc as Location));

    router.push("/list");
  };

  return (
    <Box padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        Edit Location
      </Heading>

      {!found ? (
        <Text>Location couldn't be found.</Text>
      ) : (
        <Form handleSubmit={handleSubmit} editItem={found} />
      )}
    </Box>
  );
};

export default LocationEdit;
