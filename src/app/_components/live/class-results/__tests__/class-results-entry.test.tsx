import { render, screen } from "@testing-library/react";
import ClassResultsEntry from "../class-results-entry";
import { DisplayMode, type ClassResult } from "~/app/_common/types";

// Mock the child components
jest.mock("../autocross-result-entry", () => {
  return function MockAutocrossResultEntry({ entry }: { entry: ClassResult }) {
    return <div data-testid="autocross-entry">{entry.name}</div>;
  };
});

jest.mock("../rallycross-result-entry", () => {
  return function MockRallycrossResultEntry({ entry }: { entry: ClassResult }) {
    return <div data-testid="rallycross-entry">{entry.name}</div>;
  };
});

describe("ClassResultsEntry", () => {
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
      cleanCount: 3,
      coneCount: 0,
      dnfCount: 0,
      toFirstInClass: 0,
      toNextInClass: 1.234,
      toFirstInPax: 0,
      toNextInPax: 1.234,
      runs: [],
      rallyCrossTime: 0,
      rallyCrossToFirst: 0,
      rallyCrossToNext: 0
    }
  };

  it("renders autocross entry when displayMode is autocross", () => {
    render(
      <ClassResultsEntry
        entry={mockEntry}
        displayMode={DisplayMode.autocross}
      />
    );

    expect(screen.getByTestId("autocross-entry")).toBeInTheDocument();
    expect(screen.queryByTestId("rallycross-entry")).not.toBeInTheDocument();
  });

  it("renders rallycross entry when displayMode is rallycross", () => {
    render(
      <ClassResultsEntry
        entry={mockEntry}
        displayMode={DisplayMode.rallycross}
      />
    );

    expect(screen.getByTestId("rallycross-entry")).toBeInTheDocument();
    expect(screen.queryByTestId("autocross-entry")).not.toBeInTheDocument();
  });
}); 