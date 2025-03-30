import { render, screen } from "@testing-library/react";
import IndividualClassResults from "../individual-class-results";
import { DisplayMode, type ClassResult } from "~/app/_common/types";

// Mock the ClassResultsEntry component
jest.mock("../class-results-entry", () => {
  return function MockClassResultsEntry({ entry }: { entry: ClassResult }) {
    return <div data-testid={`entry-${entry.name}-${entry.number}`}>{entry.name}</div>;
  };
});

describe("IndividualClassResults", () => {
  const mockResults: ClassResult[] = [
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
        toNextInPax: 1.234,
        runs: [],
        rallyCrossTime: 0,
        rallyCrossToFirst: 0,
        rallyCrossToNext: 0
      }
    },
    {
      name: "Jane Smith",
      carClass: "SS",
      number: "99",
      car: "Corvette",
      carClassGroup: "SS",
      color: "Red",
      position: "2",
      paxPosition: 2,
      runInfo: {
        total: 46.912,
        paxTime: 46.912,
        cleanCount: 1,
        coneCount: 1,
        dnfCount: 0,
        toFirstInClass: 1.234,
        toNextInClass: 0,
        toFirstInPax: 1.234,
        toNextInPax: 0,
        runs: [],
        rallyCrossTime: 0,
        rallyCrossToFirst: 0,
        rallyCrossToNext: 0
      }
    }
  ];

  it("renders class name as a heading", () => {
    render(
      <IndividualClassResults
        className="SS"
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("SS");
  });

  it("renders all entries for the class", () => {
    render(
      <IndividualClassResults
        className="SS"
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    expect(screen.getByTestId("entry-John Doe-42")).toBeInTheDocument();
    expect(screen.getByTestId("entry-Jane Smith-99")).toBeInTheDocument();
  });

  it("renders with rallycross display mode", () => {
    render(
      <IndividualClassResults
        className="SS"
        results={mockResults}
        displayMode={DisplayMode.rallycross}
      />
    );

    expect(screen.getByTestId("entry-John Doe-42")).toBeInTheDocument();
    expect(screen.getByTestId("entry-Jane Smith-99")).toBeInTheDocument();
  });

  it("renders empty results list", () => {
    render(
      <IndividualClassResults
        className="SS"
        results={[]}
        displayMode={DisplayMode.autocross}
      />
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("SS");
    expect(screen.queryByTestId(/^entry-/)).not.toBeInTheDocument();
  });
}); 