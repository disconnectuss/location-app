"use client";
import Form from "@/components/form";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/hooks";
import { updateLocation } from "@/lib/store/locationSlice";
import { Box, Heading, Text } from "@chakra-ui/react";
import { FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Location, LocationEditProps } from "@/utils/types/types";
const LocationEdit = ({ params }: LocationEditProps) => {
  const { locations } = useAppSelector((store) => store.location);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const found = useMemo(
    () => locations.find((i: Location) => i.id === params.id),
    [locations, params.id]
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const locData = Object.fromEntries(formData.entries()) as Partial<Location>;
    if (found) {
      const updatedLoc = { ...found, ...locData };
      dispatch(updateLocation(updatedLoc as Location));
      router.push("/list");
      toast.success("Location updated successfully");
    }
  };
  if (!found) {
    return (
      <Box padding={4}>
        <Heading as="h1" size="xl" marginBottom={4}>
          Edit Location
        </Heading>
        <Text>Location could not be found.</Text>
      </Box>
    );
  }
  return (
    <Box padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        Edit Location
      </Heading>
      <Form handleSubmit={handleSubmit} editItem={found} />
    </Box>
  );
};
export default LocationEdit;
