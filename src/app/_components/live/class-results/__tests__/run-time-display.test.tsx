import { render, screen } from "@testing-library/react";
import RunTimeDisplay from "../run-time-display";
import type { Run } from "~/app/_common/types";

describe("RunTimeDisplay", () => {
  const baseRun: Run = {
    number: 1,
    time: 45.678,
    coneCount: 0,
    isBest: false,
    status: "CLEAN"
  };

  it("displays clean run time correctly", () => {
    render(<RunTimeDisplay run={baseRun} />);
    expect(screen.getByText("45.678")).toBeInTheDocument();
  });

  it("displays dirty run time with cone count", () => {
    const dirtyRun: Run = {
      ...baseRun,
      status: "DIRTY",
      coneCount: 2
    };
    render(<RunTimeDisplay run={dirtyRun} />);
    expect(screen.getByText("45.678+2")).toBeInTheDocument();
  });

  it("displays other status runs with status in parentheses", () => {
    const dnfRun: Run = {
      ...baseRun,
      status: "DNF"
    };
    render(<RunTimeDisplay run={dnfRun} />);
    expect(screen.getByText("45.678")).toBeInTheDocument();
    expect(screen.getByText("(DNF)")).toBeInTheDocument();
  });

  it("applies green and bold styling to best run", () => {
    const bestRun: Run = {
      ...baseRun,
      isBest: true
    };
    const { container } = render(<RunTimeDisplay run={bestRun} />);
    
    const span = container.firstChild as HTMLElement;
    expect(span).toHaveClass("text-green-700", "font-bold");
  });

  it("does not apply special styling to non-best run", () => {
    const { container } = render(<RunTimeDisplay run={baseRun} />);
    
    const span = container.firstChild as HTMLElement;
    expect(span).not.toHaveClass("text-green-700", "font-bold");
  });
}); 