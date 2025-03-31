import { render, screen } from "@testing-library/react";
import RunProgression from "../run-progression";
import type { ClassResult, RunWork } from "~/app/_common/types";

describe("RunProgression", () => {
  const mockRunWork: RunWork = {
    runWork: {
      "SS": { run: 1, work: 2 },
      "AS": { run: 2, work: 1 },
      "BS": { run: 3, work: 3 }
    },
    timestamp: new Date(),
    numberOfHeats: 3
  };

  const mockRunsData: ClassResult[] = [
    {
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
    },
    {
      name: "Jane Smith",
      carClass: "AS",
      number: "123",
      car: "Corvette",
      carClassGroup: "AS",
      color: "Red",
      position: "1",
      paxPosition: 2,
      runInfo: {
        total: 46.789,
        paxTime: 46.789,
        cleanCount: 2,
        coneCount: 0,
        dnfCount: 0,
        toFirstInClass: 0,
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
    },
    {
      name: "Bob Wilson",
      carClass: "BS",
      number: "99",
      car: "Miata",
      carClassGroup: "BS",
      color: "Blue",
      position: "1",
      paxPosition: 3,
      runInfo: {
        total: 47.123,
        paxTime: 47.123,
        cleanCount: 2,
        coneCount: 0,
        dnfCount: 0,
        toFirstInClass: 0,
        toNextInClass: 0,
        toFirstInPax: 2.345,
        toNextInPax: 0,
        runs: [
          { number: 1, status: "clean", time: 47.123, coneCount: 0, isBest: true }
        ],
        rallyCrossTime: 0,
        rallyCrossToFirst: 0,
        rallyCrossToNext: 0
      }
    }
  ];

  it("renders run progression information", () => {
    render(
      <RunProgression
        runWorkData={mockRunWork}
        runsData={mockRunsData}
      />
    );

    // Check heat information
    expect(screen.getByText(/heat 1/i)).toBeInTheDocument();
    expect(screen.getByText(/heat 2/i)).toBeInTheDocument();
    expect(screen.getByText(/heat 3/i)).toBeInTheDocument();

    // Check progress bars
    expect(screen.getAllByText("100%")).toHaveLength(3);
  });

  it("displays correct run assignments", () => {
    render(
      <RunProgression
        runWorkData={mockRunWork}
        runsData={mockRunsData}
      />
    );

    // Check run assignments
    const currentRunElements = screen.getAllByText(/current run:/i);
    expect(currentRunElements).toHaveLength(3);
    
    // Check that each heat shows the current run as 1
    const runNumbers = screen.getAllByText("1");
    expect(runNumbers).toHaveLength(3);
  });

  it("shows explanation text", () => {
    render(
      <RunProgression
        runWorkData={mockRunWork}
        runsData={mockRunsData}
      />
    );

    expect(screen.getByText(/bars show the percentage of drivers/i)).toBeInTheDocument();
    expect(screen.getByText(/e\.g\. if the heat is at the end of their second runs/i)).toBeInTheDocument();
  });
}); 