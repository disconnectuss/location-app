'use client';

import Map from '@/components/map';
import { useAppSelector } from '@/lib/hooks';

const Page = () => {
  const { locations } = useAppSelector((store) => store.location);

  return (
    <div>
      <Map locations={locations}/>
    </div>
  );
};

export default Page;
