"use client";
import dynamic from "next/dynamic";
import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <Spinner size="xl" />,
});
const Page: React.FC = () => {
  return (
    <Box>
      <Map />
    </Box>
  );
};
export default Page;
