"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const LocationList = () => {
  const [mounted, setMounted] = useState(false);
  const locations = useSelector((state: RootState) => state.location.locations);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Spinner size="xl" />;
  }

  return (
    <Box padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        Location List
      </Heading>
      {locations.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Latitude</Th>
                <Th>Longitude</Th>
                <Th>Color</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations.map((location) => (
                <Tr key={location.id}>
                  <Td>{location.title}</Td>
                  <Td>{location.lat}</Td>
                  <Td>{location.lng}</Td>
                  <Td>{location.color}</Td>
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
