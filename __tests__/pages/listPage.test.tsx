import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";
import LocationList from "@/(pages)/list/page";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
import { deleteLocation } from "@/lib/store/locationSlice";
interface Location {
  id: string;
  title: string;
  lat: number;
  lng: number;
  color: string;
}
interface LocationState {
  locations: Location[];
}
interface AppState {
  location: LocationState;
}
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));
const mockStore = configureStore<AppState>([]);
describe("LocationList Component", () => {
  let store: MockStoreEnhanced<AppState>;
  beforeEach(() => {
    store = mockStore({
      location: {
        locations: [
          {
            id: "1",
            title: "Test Location 1",
            lat: 123.45,
            lng: 67.89,
            color: "blue",
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });
  it("should display a location and dispatch deleteLocation when the Delete button is clicked", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <LocationList />
        </ChakraProvider>
      </Provider>
    );
    expect(
      screen.getByText((content, element) =>
        content.includes("Test Location 1")
      )
    ).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete-button-1"); // Match the test ID
    fireEvent.click(deleteButton);
    const row = screen.getByRole("row", { name: /Test Location 1/i });
    expect(row).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith("Location deleted successfully");
  });
}); // check test again