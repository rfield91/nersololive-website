import { render, screen } from "@testing-library/react";
import RunDisplay from "../run-display";
import type { Run } from "~/app/_common/types";

// Mock the RunTimeDisplay component
jest.mock("../run-time-display", () => {
  return function MockRunTimeDisplay({ run }: { run: Run }) {
    return <span data-testid="run-time">{run.time}</span>;
  };
});

describe("RunDisplay", () => {
  const mockRun: Run = {
    number: 1,
    status: "OK",
    time: 45.678,
    coneCount: 0,
    isBest: false
  };

  it("renders run number and time", () => {
    render(<RunDisplay run={mockRun} />);

    expect(screen.getByText("1:")).toBeInTheDocument();
    expect(screen.getByTestId("run-time")).toBeInTheDocument();
  });

  it("applies bold styling to best run", () => {
    const bestRun = { ...mockRun, isBest: true };
    const { container } = render(<RunDisplay run={bestRun} />);

    const runDiv = container.firstChild as HTMLElement;
    expect(runDiv).toHaveClass("font-bold");
  });

  it("does not apply bold styling to non-best run", () => {
    const { container } = render(<RunDisplay run={mockRun} />);

    const runDiv = container.firstChild as HTMLElement;
    expect(runDiv).not.toHaveClass("font-bold");
  });
}); 