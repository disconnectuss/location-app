import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Chakra, StoreProvider } from '@/providers';

interface MyAppProps extends AppProps {}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Chakra>
        <Component {...pageProps} />
      </Chakra>
    </StoreProvider>
  );
};

export default MyApp;