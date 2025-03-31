import { render, screen } from "@testing-library/react";
import PaxEntry from "../pax-entry";
import type { ClassResult } from "~/app/_common/types";

describe("PaxEntry", () => {
  const mockEntry: ClassResult = {
    name: "John Doe",
    carClass: "SS",
    number: "42",
    car: "Porsche GT3",
    carClassGroup: "SS",
    color: "Black",
    position: "1",
    paxPosition: 1,
    runInfo: {
      total: 45.678,
      paxTime: 45.678,
      cleanCount: 2,
      coneCount: 0,
      dnfCount: 0,
      toFirstInClass: 0,
      toNextInClass: 1.234,
      toFirstInPax: 0,
      toNextInPax: 0.567,
      runs: [
        { number: 1, status: "clean", time: 45.678, coneCount: 0, isBest: true }
      ],
      rallyCrossTime: 0,
      rallyCrossToFirst: 0,
      rallyCrossToNext: 0
    }
  };

  it("renders entry information correctly", () => {
    render(<PaxEntry entry={mockEntry} />);

    // Check position information
    expect(screen.getByText("SS #42")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Porsche GT3")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();

    // Check times using more specific queries
    const paxTimes = screen.getAllByText("PAX");
    const rawTimes = screen.getAllByText("Raw");
    
    // Get the PAX time from the second PAX label (the one showing the time)
    expect(paxTimes[1].nextElementSibling).toHaveTextContent("45.678");
    expect(rawTimes[0].nextElementSibling).toHaveTextContent("45.678");
  });

  it("handles missing toFirstInPax and toNextInPax", () => {
    const entryWithoutGaps: ClassResult = {
      ...mockEntry,
      runInfo: {
        ...mockEntry.runInfo,
        toFirstInPax: 0,
        toNextInPax: 0
      }
    };

    render(<PaxEntry entry={entryWithoutGaps} />);
    expect(screen.queryByText("0.000")).not.toBeInTheDocument();
    expect(screen.queryByText("0.567")).not.toBeInTheDocument();
  });

  it("handles missing best run times", () => {
    const entryWithoutBestRun: ClassResult = {
      ...mockEntry,
      runInfo: {
        ...mockEntry.runInfo,
        runs: []
      }
    };

    render(<PaxEntry entry={entryWithoutBestRun} />);
    const rawTimes = screen.getAllByText("Raw");
    expect(rawTimes[0].nextElementSibling).toBeEmptyDOMElement();
  });
}); 