"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { useAppSelector, useAppDispatch } from "@/utils/hooks/hooks";
import NextLink from "next/link";
import { deleteLocation } from "@/lib/store/locationSlice";
import { toast } from "react-toastify";
import { Location } from "@/utils/types/types";

const LocationList: React.FC = () => {
  const locations = useAppSelector((state) => state.location.locations);
  const dispatch = useAppDispatch();
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const handleCheckboxChange = (id: string) => {
    setChecked((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((checkedId) => checkedId !== id)
        : [...prevChecked, id]
    );
  };
  const deleteChecked = () => {
    checked.map((id) => dispatch(deleteLocation(id)));
    toast.success("Selected locations deleted successfully");
    setChecked([]);
  };
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteLocation(id));
      toast.success("Location deleted successfully");
    },
    [dispatch]
  );
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);
  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const sorted = [...locations].sort((a, b) => {
        const distanceA = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          a.lat,
          a.lng
        );
        const distanceB = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          b.lat,
          b.lng
        );
        return distanceA - distanceB;
      });
      setSortedLocations(sorted);
    }
  }, [userLocation, locations]);
  return (
    <Box padding={4}>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="xl" marginBottom={4}>
          Location List
        </Heading>
        <Button onClick={deleteChecked} isDisabled={checked.length === 0}>
          Delete {checked.length > 0 ? `(${checked.length})` : ""}
        </Button>
        <Button as={NextLink} href="/route">
          Show Route
        </Button>
      </Flex>
      {sortedLocations.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Select</Th>
                <Th>Icon</Th>
                <Th>Title</Th>
                <Th>Latitude</Th>
                <Th>Longitude</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedLocations.map((location) => (
                <Tr key={location.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={checked.includes(location.id)}
                      onChange={() => handleCheckboxChange(location.id)}
                    />
                  </Td>
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

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default LocationList;
