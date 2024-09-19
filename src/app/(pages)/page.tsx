"use client";
import { useAppSelector } from "@/lib/hooks";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Page = () => {
  const store = useAppSelector((store) => store);
  // console.log(store)
  // browser | Chrome conflict => URL.parse error
  // if (!URL.canParse) {
  //   URL.canParse = function (urlString) {
  //     try {
  //       new URL(urlString);
  //       return true;
  //     } catch (error) {
  //       return false;
  //     }
  //   };
  // } 

  
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
