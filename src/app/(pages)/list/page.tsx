"use client";
import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import NextLink from "next/link";
import { deleteLocation } from "@/lib/store/locationSlice";
import { toast } from "react-toastify";
const LocationList = () => {
  const locations = useAppSelector((state) => state.location.locations);
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteLocation(id));
    toast.success("New Location deleted successfully");
  };
  return (
    <Box padding={4}>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="xl" marginBottom={4}>
          Location List
        </Heading>
        <Button as={NextLink} href="/route">
          Show Route
        </Button>
      </Flex>
      {locations.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Icon</Th>
                <Th>Title</Th>
                <Th>Latitude</Th>
                <Th>Longitude</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations.map((location) => (
                <Tr key={location.id}>
                  <Td>
                    <Image
                      width={35}
                      height={35}
                      src={`/${location.color}-marker.svg`}
                      alt={`${location.title} marker`}
                    />
                  </Td>
                  <Td>{location.title}</Td>
                  <Td>{location.lat}</Td>
                  <Td>{location.lng}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button
                        as={NextLink}
                        href={`/edit/${location.id}`}
                        size="sm"
                        colorScheme="blue"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(location.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box>No locations added yet.</Box>
      )}
    </Box>
  );
};
export default LocationList;
