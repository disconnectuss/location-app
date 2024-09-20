"use client"; // Keep this to ensure client-side rendering

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../lib/store"; 
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
