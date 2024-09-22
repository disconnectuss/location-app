"use client";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";
const Map = dynamic(() => import("@/components/map"), { ssr: false });
const Page = () => {
  const locations = useAppSelector((store) => store.location.locations);
  const memoizedLocations = useMemo(() => locations, [locations]);
  return (
    <Box>
      <Map locations={memoizedLocations} isClickable />
    </Box>
  );
};
export default Page;
