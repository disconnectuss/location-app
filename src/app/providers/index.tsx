"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../lib/store/store";
import { memo } from "react";

// Updated type for children
const Providers = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider>
          <ChakraProvider>
            {children}
            <ToastContainer position="bottom-right" autoClose={3000} />
          </ChakraProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
});

// Adding display name for easier debugging
Providers.displayName = "Providers";

export default Providers;
