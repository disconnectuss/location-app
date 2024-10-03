import { render, screen } from "@testing-library/react";
import { useAppSelector } from "@/utils/hooks/hooks";
import "@testing-library/jest-dom";
import Page from "@/(pages)/route/page";
jest.mock("next/dynamic", () =>
  jest.fn(() => () => <div data-testid="mock-map" />)
);
jest.mock("@/utils/hooks/hooks", () => ({
  useAppSelector: jest.fn(),
}));
describe("Route Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the map with locations from the Redux store", () => {
    (useAppSelector as jest.Mock).mockReturnValue([
      { id: "1", lat: 10, lng: 20 },
      { id: "2", lat: 30, lng: 40 },
    ]);
    render(<Page />);
    const mapElement = screen.getByTestId("mock-map");
    expect(mapElement).toBeInTheDocument();
  });
  it("should render the map even with no locations", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    render(<Page />);
    const mapElement = screen.getByTestId("mock-map");
    expect(mapElement).toBeInTheDocument();
  });
});
