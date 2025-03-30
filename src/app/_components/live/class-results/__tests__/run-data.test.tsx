import { render, screen } from "@testing-library/react";
import RunData from "../run-data";
import type { RunInfo } from "~/app/_common/types";

// Mock the RunDisplay component
jest.mock("../run-display", () => {
  return function MockRunDisplay({ run }: { run: { number: number } }) {
    return <div data-testid={`run-${run.number}`}>Run {run.number}</div>;
  };
});

describe("RunData", () => {
  const mockRunInfo: RunInfo = {
    total: 45.678,
    paxTime: 45.678,
    cleanCount: 2,
    coneCount: 1,
    dnfCount: 1,
    toFirstInClass: 0,
    toNextInClass: 1.234,
    toFirstInPax: 0,
    toNextInPax: 1.234,
    rallyCrossTime: 0,
    rallyCrossToFirst: 0,
    rallyCrossToNext: 0,
    runs: [
      { number: 1, status: "CLEAN", time: 45.678, coneCount: 0, isBest: true },
      { number: 2, status: "CLEAN", time: 46.789, coneCount: 0, isBest: false },
      { number: 3, status: "DIRTY", time: 45.123, coneCount: 1, isBest: false },
      { number: 4, status: "DNF", time: 44.567, coneCount: 0, isBest: false }
    ]
  };

  it("renders all runs", () => {
    render(<RunData runInfo={mockRunInfo} />);

    expect(screen.getByTestId("run-1")).toBeInTheDocument();
    expect(screen.getByTestId("run-2")).toBeInTheDocument();
    expect(screen.getByTestId("run-3")).toBeInTheDocument();
    expect(screen.getByTestId("run-4")).toBeInTheDocument();
  });

  it("displays run statistics correctly", () => {
    render(<RunData runInfo={mockRunInfo} />);

    expect(screen.getByText("Cones: 1")).toBeInTheDocument();
    expect(screen.getByText("Clean Runs: 2")).toBeInTheDocument();
    expect(screen.getByText("DNF: 1")).toBeInTheDocument();
  });

  it("renders empty run list", () => {
    const emptyRunInfo = {
      ...mockRunInfo,
      runs: [],
      cleanCount: 0,
      coneCount: 0,
      dnfCount: 0
    };
    render(<RunData runInfo={emptyRunInfo} />);

    expect(screen.getByText("Cones: 0")).toBeInTheDocument();
    expect(screen.getByText("Clean Runs: 0")).toBeInTheDocument();
    expect(screen.getByText("DNF: 0")).toBeInTheDocument();
  });
}); 