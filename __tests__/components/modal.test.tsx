// __tests__/components/modal.test.tsx

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, PreloadedState } from "@reduxjs/toolkit"; // Check it later
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import locationReducer from "@/lib/store/locationSlice";
import LocationList from "@/(pages)/list/page";
import { ChakraProvider } from "@chakra-ui/react";
import { RootState } from "@/lib/store/store";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["locations"],
};
const persistedLocationReducer = persistReducer(persistConfig, locationReducer);
const preloadedState: PreloadedState<RootState> = {
  location: {
    locations: [{ id: "1", title: "Test Location", lat: 123, lng: 456 }],
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
};
const store = configureStore({
  reducer: {
    location: persistedLocationReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
describe("LocationList Component", () => {
  it("should display a location", () => {
    render(
      <ChakraProvider>
        <Provider store={store}>
          <LocationList />
        </Provider>
      </ChakraProvider>
    );
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });
});
