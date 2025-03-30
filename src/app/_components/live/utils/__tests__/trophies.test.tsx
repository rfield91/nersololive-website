import { render, screen } from "@testing-library/react";
import Trophies from "../trophies";
import type { ClassResult } from "~/app/_common/types";

describe("Trophies", () => {
  const mockResults: Record<string, ClassResult[]> = {
    "SS": [
      {
        name: "John Doe",
        carClass: "SS",
        number: "42",
        car: "Porsche GT3",
        carClassGroup: "SS",
        color: "Black",
        position: "T1",
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
      }
    ],
    "AS": [
      {
        name: "Jane Smith",
        carClass: "AS",
        number: "123",
        car: "Corvette",
        carClassGroup: "AS",
        color: "Red",
        position: "T2",
        paxPosition: 2,
        runInfo: {
          total: 46.789,
          paxTime: 46.789,
          cleanCount: 2,
          coneCount: 0,
          dnfCount: 0,
          toFirstInClass: 1.234,
          toNextInClass: 2.345,
          toFirstInPax: 1.234,
          toNextInPax: 2.345,
          runs: [
            { number: 1, status: "clean", time: 46.789, coneCount: 0, isBest: true }
          ],
          rallyCrossTime: 0,
          rallyCrossToFirst: 0,
          rallyCrossToNext: 0
        }
      }
    ]
  };

  it("renders trophy results", () => {
    render(<Trophies results={mockResults} />);

    expect(screen.getByText("SS")).toBeInTheDocument();
    expect(screen.getByText("AS")).toBeInTheDocument();
    expect(screen.getByText("1st - John Doe #42", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("2nd - Jane Smith #123", { exact: false })).toBeInTheDocument();
  });

  it("displays car information and times", () => {
    render(<Trophies results={mockResults} />);

    expect(screen.getByText("Porsche GT3 - 45.678 (+1.234)", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Corvette - 46.789 (+2.345)", { exact: false })).toBeInTheDocument();
  });

  it("returns null when no trophy results", () => {
    const emptyResults: Record<string, ClassResult[]> = {
      "SS": [
        {
          ...mockResults["SS"][0],
          position: "1"
        }
      ]
    };

    const { container } = render(<Trophies results={emptyResults} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles missing best run times", () => {
    const resultsWithNoBestRun: Record<string, ClassResult[]> = {
      "SS": [
        {
          ...mockResults["SS"][0],
          runInfo: {
            ...mockResults["SS"][0].runInfo,
            runs: []
          }
        }
      ]
    };

    render(<Trophies results={resultsWithNoBestRun} />);
    expect(screen.getByText("Porsche GT3 - N/A", { exact: false })).toBeInTheDocument();
  });
}); 