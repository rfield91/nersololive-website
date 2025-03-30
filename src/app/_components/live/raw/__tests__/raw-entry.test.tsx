import { render, screen } from "@testing-library/react";
import RawEntry from "../raw-entry";
import type { RawResult } from "~/app/_common/types";

describe("RawEntry", () => {
  const mockEntry: RawResult = {
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
    toFirst: 1.234,
    toNext: 2.345
  };

  it("renders entry information correctly", () => {
    render(<RawEntry entry={mockEntry} />);

    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText("SS #42")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Porsche GT3")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("Raw")).toBeInTheDocument();
    expect(screen.getByText(45.678)).toBeInTheDocument();
  });

  it("renders toFirst and toNext when both values are non-zero", () => {
    render(<RawEntry entry={mockEntry} />);

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("1.234")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("2.345")).toBeInTheDocument();
  });

  it("does not render toFirst and toNext when either value is zero", () => {
    const entryWithZeroFirst = {
      ...mockEntry,
      toFirst: 0,
      toNext: 1.234
    };
    render(<RawEntry entry={entryWithZeroFirst} />);
    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();

    const entryWithZeroNext = {
      ...mockEntry,
      toFirst: 1.234,
      toNext: 0
    };
    render(<RawEntry entry={entryWithZeroNext} />);
    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
}); 