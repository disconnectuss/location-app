'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('@/components/map'), { ssr: false });

const Page = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default Page;
