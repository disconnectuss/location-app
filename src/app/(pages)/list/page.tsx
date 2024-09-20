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
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";

const LocationList = () => {
  const locations = useAppSelector((state) => state.location.locations);

  return (
    <Box padding={4}>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="xl" marginBottom={4}>
          Location List
        </Heading>

        <Button>
          <Link>Show Route</Link>
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
                      src={location.color + "-marker.svg"}
                      alt="marker"
                    />
                  </Td>
                  <Td>{location.title}</Td>
                  <Td>{location.lat}</Td>
                  <Td>{location.lng}</Td>
                  <Td>
                    <Button size="sm" colorScheme="blue">
                      <Link href={`/edit/${location.id}`}>Edit</Link>
                    </Button>
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
