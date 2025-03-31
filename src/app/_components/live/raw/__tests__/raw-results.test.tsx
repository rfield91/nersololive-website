import { render, screen } from "@testing-library/react";
import RawResults from "../raw-results";
import type { RawResult } from "~/app/_common/types";

describe("RawResults", () => {
  const mockResults: RawResult[] = [
    {
      position: 1,
      entryInfo: {
        name: "John Doe",
        carClass: "SS",
        number: 42,
        car: "Porsche GT3",
        color: "Black"
      },
      total: 45.678,
      time: 45.678,
      coneCount: 0,
      toFirst: 0,
      toNext: 1.234
    },
    {
      position: 2,
      entryInfo: {
        name: "Jane Smith",
        carClass: "AS",
        number: 99,
        car: "Corvette",
        color: "Red"
      },
      total: 46.912,
      time: 46.912,
      coneCount: 0,
      toFirst: 1.234,
      toNext: 0.567
    }
  ];

  it("renders multiple entries correctly", () => {
    render(<RawResults results={mockResults} />);

    // Check first entry
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("SS #42")).toBeInTheDocument();
    expect(screen.getByText("Porsche GT3")).toBeInTheDocument();

    // Check second entry
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("AS #99")).toBeInTheDocument();
    expect(screen.getByText("Corvette")).toBeInTheDocument();
  });

  it("renders an empty div when no results are provided", () => {
    const { container } = render(<RawResults results={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
}); 