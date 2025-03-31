import { render, screen, fireEvent } from "@testing-library/react";
import AutocrossResultEntry from "../autocross-result-entry";
import type { ClassResult } from "~/app/_common/types";

// Mock the child components
jest.mock("../run-data", () => {
  return function MockRunData() {
    return <div data-testid="run-data">Run Data</div>;
  };
});

jest.mock("../run-time-display", () => {
  return function MockRunTimeDisplay({ run }: { run: { time: number } }) {
    return <span data-testid="run-time">{run.time}</span>;
  };
});

describe("AutocrossResultEntry", () => {
  const mockEntry: ClassResult = {
    name: "John Doe",
    carClass: "SS",
    number: "42",
    car: "Porsche GT3",
    carClassGroup: "SS",
    color: "Black",
    position: "1",
    paxPosition: 2,
    runInfo: {
      total: 45.678,
      paxTime: 45.678,
      cleanCount: 2,
      coneCount: 0,
      dnfCount: 0,
      toFirstInClass: 0,
      toNextInClass: 1.234,
      toFirstInPax: 0,
      toNextInPax: 1.234,
      runs: [
        { number: 1, status: "CLEAN", time: 45.678, coneCount: 0, isBest: true },
        { number: 2, status: "CLEAN", time: 46.789, coneCount: 0, isBest: false }
      ],
      rallyCrossTime: 0,
      rallyCrossToFirst: 0,
      rallyCrossToNext: 0
    }
  };

  it("renders basic entry information", () => {
    render(<AutocrossResultEntry entry={mockEntry} />);

    expect(screen.getByText("SS #42")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Porsche GT3")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();
  });

  it("renders position information", () => {
    render(<AutocrossResultEntry entry={mockEntry} />);

    expect(screen.getByText("Class")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("PAX")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders best and last run times", () => {
    render(<AutocrossResultEntry entry={mockEntry} />);

    expect(screen.getByText("Best")).toBeInTheDocument();
    expect(screen.getByText("45.678")).toBeInTheDocument();
    expect(screen.getByText("Last")).toBeInTheDocument();
    expect(screen.getByTestId("run-time")).toHaveTextContent("46.789");
  });

  it("renders delta times when both values are non-zero", () => {
    const entryWithDeltas = {
      ...mockEntry,
      runInfo: {
        ...mockEntry.runInfo,
        toFirstInClass: 1.234,
        toNextInClass: 0.567
      }
    };
    render(<AutocrossResultEntry entry={entryWithDeltas} />);

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("1.234")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("0.567")).toBeInTheDocument();
  });

  it("toggles run data visibility on click", () => {
    render(<AutocrossResultEntry entry={mockEntry} />);

    // Initially hidden with CSS
    const runData = screen.getByTestId("run-data").parentElement;
    expect(runData).toHaveClass("hidden");

    // Show runs
    fireEvent.click(screen.getByText("SS #42").parentElement!.parentElement!);
    expect(runData).not.toHaveClass("hidden");

    // Hide runs
    fireEvent.click(screen.getByText("SS #42").parentElement!.parentElement!);
    expect(runData).toHaveClass("hidden");
  });

  it("applies special styling for PAX position 1", () => {
    const paxLeaderEntry = { ...mockEntry, paxPosition: 1 };
    const { container } = render(<AutocrossResultEntry entry={paxLeaderEntry} />);

    const entryDiv = container.firstChild as HTMLElement;
    expect(entryDiv).toHaveClass("bg-orange-100");
  });

  it("shows N/A for missing run data", () => {
    const entryWithNoRuns = {
      ...mockEntry,
      runInfo: {
        ...mockEntry.runInfo,
        total: 0,
        runs: []
      }
    };
    render(<AutocrossResultEntry entry={entryWithNoRuns} />);

    const naElements = screen.getAllByText("N/A");
    expect(naElements).toHaveLength(1);
    expect(naElements[0]).toBeInTheDocument();
  });

  it("does not show delta times when either value is zero", () => {
    const entryWithoutDeltas = {
      ...mockEntry,
      runInfo: {
        ...mockEntry.runInfo,
        toFirstInClass: 0,
        toNextInClass: 0
      }
    };
    render(<AutocrossResultEntry entry={entryWithoutDeltas} />);

    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});