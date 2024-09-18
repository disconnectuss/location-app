// src/chakra.js
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {FC, PropsWithChildren} from 'react';

interface ChakraProps extends PropsWithChildren<{}> {}

 const theme = extendTheme({
  // Customize your theme here
});

export const Chakra:FC<ChakraProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

