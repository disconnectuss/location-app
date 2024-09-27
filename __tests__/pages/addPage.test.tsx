import { render, screen } from "@testing-library/react";
import Page from "../../src/app/(pages)/add/page";
import "@testing-library/jest-dom";
jest.mock(
  "@/components/map",
  () =>
    ({ isClickable }: { isClickable: boolean }) =>
      <div data-testid="map" data-clickable={isClickable}></div>
);
describe("Page Component", () => {
  it("renders the Map component with isClickable prop set to true", () => {
    render(<Page />);
    const mapComponent = screen.getByTestId("map");
    expect(mapComponent).toBeInTheDocument();
    expect(mapComponent).toHaveAttribute("data-clickable", "true");
  });
});
