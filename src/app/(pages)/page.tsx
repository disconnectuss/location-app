"use client";
import { useAppSelector } from "@/lib/hooks";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Page = () => {
  const store = useAppSelector((store) => store);
  console.log(store)
  return (
    <div>
      <h1>hello</h1>
      <Box bg={"gray.500"}>
        <Heading>hekufg</Heading>
      </Box>
    </div>
  );
};

export default Page;
