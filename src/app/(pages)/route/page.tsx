"use client";

import dynamic from "next/dynamic";

// Dynamically import the Map component and disable SSR
const Map = dynamic(() => import('@/components/map'), { ssr: false });

import { useAppSelector } from '@/lib/hooks';

const Page = () => {
  const { locations } = useAppSelector((store) => store.location);

  return (
    <div>
      <Map locations={locations} isClickable />
    </div>
  );
};

export default Page;
