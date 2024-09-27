import { render, screen, fireEvent } from "@testing-library/react";
import LocationEdit from "@/(pages)/edit/[id]/page";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/hooks";
import { useRouter } from "next/navigation";
import { updateLocation } from "@/lib/store/locationSlice";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
jest.mock("@/utils/hooks/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));
describe("LocationEdit Component", () => {
  const mockDispatch = jest.fn();
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should display "Location could not be found" if the location is missing', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ locations: [] });
    render(<LocationEdit params={{ id: "1" }} />);
    expect(
      screen.getByText("Location could not be found.")
    ).toBeInTheDocument();
  });
  it("should render the form when the location is found", () => {
    const mockLocation = {
      id: "1",
      title: "Old Title",
      name: "Old Name",
      lat: 123.45,
      lng: 67.89,
      color: "blue",
    };
    (useAppSelector as jest.Mock).mockReturnValue({
      locations: [mockLocation],
    });
    render(<LocationEdit params={{ id: "1" }} />);
    const nameInput = screen.getByLabelText("Location Name");
    const latitudeInput = screen.getByLabelText("Latitude");
    fireEvent.change(nameInput, { target: { value: "Updated Title" } });
    fireEvent.change(latitudeInput, { target: { value: "Updated Latitude" } });
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);
    expect(mockDispatch).toHaveBeenCalledWith(
      updateLocation({
        id: "1",
        title: "Updated Title",
        name: "Old Name",
        lat: 123.45,
        lng: 67.89,
        color: "blue",
      })
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/list");
    expect(toast.success).toHaveBeenCalledWith("Location updated successfully");
  });
});
