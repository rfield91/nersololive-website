import { render, screen, fireEvent } from "@testing-library/react";
import { WorkRunOrder } from "../work-run-order";
import type { RunWork } from "~/app/_common/types";

// Mock the IsToday utility
jest.mock("~/app/_utils/is-today", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("WorkRunOrder", () => {
  const mockRunWork: RunWork = {
    runWork: {
      "SS": { run: 1, work: 2 },
      "AS": { run: 2, work: 1 }
    },
    timestamp: new Date(),
    numberOfHeats: 2
  };

  const threeHeatRunWork: RunWork = {
    runWork: {
      "SS": { run: 1, work: 2 },
      "AS": { run: 2, work: 3 },
      "BS": { run: 3, work: 1 }
    },
    timestamp: new Date(),
    numberOfHeats: 3
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows message when event is not today", () => {
    const { default: IsToday } = require("~/app/_utils/is-today");
    IsToday.mockReturnValue(false);

    render(<WorkRunOrder runWork={mockRunWork} />);

    expect(screen.getByText(/work\/run order will be available on the day of the event/i)).toBeInTheDocument();
  });

  it("renders work/run order for today's event", () => {
    const { default: IsToday } = require("~/app/_utils/is-today");
    IsToday.mockReturnValue(true);

    render(<WorkRunOrder runWork={mockRunWork} />);

    expect(screen.getByText(/please select your class from the filters below/i)).toBeInTheDocument();
    expect(screen.getByText(/two heats/i)).toBeInTheDocument();
    expect(screen.getByText(/you must check in for work both morning and afternoon/i)).toBeInTheDocument();
  });

  it("displays correct run and work assignments when a class is selected", () => {
    const { default: IsToday } = require("~/app/_utils/is-today");
    IsToday.mockReturnValue(true);

    render(<WorkRunOrder runWork={mockRunWork} />);

    // Select a class
    fireEvent.click(screen.getByText("SS"));

    // Check run and work assignments
    expect(screen.getByText("Run")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows correct message for more than 2 heats", () => {
    const { default: IsToday } = require("~/app/_utils/is-today");
    IsToday.mockReturnValue(true);

    render(<WorkRunOrder runWork={threeHeatRunWork} />);

    expect(screen.getByText(/3 heats/i)).toBeInTheDocument();
    expect(screen.getByText(/watch the flag/i)).toBeInTheDocument();
  });

  it("renders class filters", () => {
    render(<WorkRunOrder runWork={mockRunWork} />);

    expect(screen.getByText("SS")).toBeInTheDocument();
    expect(screen.getByText("AS")).toBeInTheDocument();
  });
}); 