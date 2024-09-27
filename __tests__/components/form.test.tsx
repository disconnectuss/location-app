import { render, screen, fireEvent } from "@testing-library/react";
import Form from "@/components/form/index"; 
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom';

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockHandleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {});
const mockOnClose = jest.fn();

describe("Form Component", () => {
  const editItem = {
    id: "1",
    name: "Test Name",
    title: "Test Location",
    lat: 51.5074,
    lng: 0.1278,
    color: "red",
  };

  const latlng: [number, number] = [40.7128, -74.006];

  beforeEach(() => {
    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("should render form with required fields", () => {
    render(
      <Form
        handleSubmit={mockHandleSubmit}
        editItem={editItem}
        latlng={latlng}
        onClose={mockOnClose}
      />
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Location Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Latitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Location Color")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("should call handleSubmit when form is submitted", () => {
    render(
      <Form
        handleSubmit={mockHandleSubmit}
        editItem={editItem}
        latlng={latlng}
        onClose={mockOnClose}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("should call onClose when the close button is clicked without editItem", () => {
    render(
      <Form
        handleSubmit={mockHandleSubmit}
        latlng={latlng}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call router.push when Back button is clicked with editItem", () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    render(
      <Form
        handleSubmit={mockHandleSubmit}
        editItem={editItem}
        latlng={latlng}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(mockRouterPush).toHaveBeenCalledWith("/list");
  });
});
