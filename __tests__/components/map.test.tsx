import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Map from "@/components/map";
import * as getLocModule from "@/utils/funcs/getLoc";
jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ position }: { position: [number, number] }) => (
    <div data-testid="marker">{`Marker at ${position}`}</div>
  ),
  Polyline: ({ positions }: { positions: [number, number][] }) => (
    <div data-testid="polyline">{`Polyline with ${positions.length} positions`}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));
jest.mock("@/utils/funcs/getLoc", () => ({
  __esModule: true,
  default: jest.fn(),
}));
describe("Map Component", () => {
  beforeEach(() => {
    (getLocModule.default as jest.Mock).mockResolvedValue([39.9334, 32.8597]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the map and fetches user location", async () => {
    render(<Map locations={[]} isClickable={false} />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("marker")).toHaveTextContent(
        "Marker at 39.9334,32.8597"
      );
    });
  });
});
