"use client";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
const Map = dynamic(() => import("@/components/map"), { ssr: false });
const Page = () => {
  return (
    <Box>
      <Map />
    </Box>
  );
};
export default Page;
