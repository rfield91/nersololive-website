import { render, screen } from "@testing-library/react";
import PaxResults from "../pax-results";
import type { ClassResult } from "~/app/_common/types";

describe("PaxResults", () => {
  const mockResults: ClassResult[] = [
    {
      name: "Jane Smith",
      carClass: "AS",
      number: "123",
      car: "Corvette",
      carClassGroup: "AS",
      color: "Red",
      position: "1",
      paxPosition: 1,
      runInfo: {
        total: 46.789,
        paxTime: 45.789,
        cleanCount: 2,
        coneCount: 0,
        dnfCount: 0,
        toFirstInClass: 0,
        toNextInClass: 2.345,
        toFirstInPax: 0,
        toNextInPax: 1.234,
        runs: [
          { number: 1, status: "clean", time: 46.789, coneCount: 0, isBest: true }
        ],
        rallyCrossTime: 0,
        rallyCrossToFirst: 0,
        rallyCrossToNext: 0
      }
    },
    {
      name: "John Doe",
      carClass: "SS",
      number: "42",
      car: "Porsche GT3",
      carClassGroup: "SS",
      color: "Black",
      position: "2",
      paxPosition: 2,
      runInfo: {
        total: 45.678,
        paxTime: 44.678,
        cleanCount: 2,
        coneCount: 0,
        dnfCount: 0,
        toFirstInClass: 0,
        toNextInClass: 1.234,
        toFirstInPax: 0.567,
        toNextInPax: 0.789,
        runs: [
          { number: 1, status: "clean", time: 45.678, coneCount: 0, isBest: true }
        ],
        rallyCrossTime: 0,
        rallyCrossToFirst: 0,
        rallyCrossToNext: 0
      }
    }
  ];

  it("renders entries in order", () => {
    render(<PaxResults results={mockResults} />);

    const entries = screen.getAllByTestId("pax-entry");
    expect(entries).toHaveLength(2);
    expect(entries[0]).toHaveTextContent("Jane Smith");
    expect(entries[1]).toHaveTextContent("John Doe");
  });

  it("displays correct PAX times and positions", () => {
    render(<PaxResults results={mockResults} />);

    // Check PAX times
    const entries = screen.getAllByTestId("pax-entry");
    expect(entries[0]).toHaveTextContent("45.789");
    expect(entries[1]).toHaveTextContent("44.678");
  });
}); 