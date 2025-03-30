import { render, screen, fireEvent } from "@testing-library/react";
import ClassResults from "../class-results";
import { DisplayMode, type ClassResult } from "~/app/_common/types";

// Mock the child components
jest.mock("../class-links", () => {
  return function MockClassLinks({ classes, filteredClasses, toggleFilter, clearFilters }: any) {
    return (
      <div data-testid="class-links">
        {classes.map((c: string) => (
          <button
            key={c}
            data-testid={`filter-${c}`}
            onClick={() => toggleFilter(c)}
          >
            {c}
          </button>
        ))}
        {filteredClasses.length > 0 && (
          <button data-testid="clear-filters" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>
    );
  };
});

jest.mock("../individual-class-results", () => {
  return function MockIndividualClassResults({ className, results }: any) {
    return (
      <div data-testid={`class-${className}`}>
        {results.map((r: ClassResult) => (
          <div key={`${r.name}-${r.number}`}>{r.name}</div>
        ))}
      </div>
    );
  };
});

describe("ClassResults", () => {
  const mockResults: Record<string, ClassResult[]> = {
    SS: [
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
      }
    ],
    AS: [
      {
        name: "Jane Smith",
        carClass: "AS",
        number: "99",
        car: "Corvette",
        carClassGroup: "AS",
        color: "Red",
        position: "1",
        paxPosition: 2,
        runInfo: {
          total: 46.912,
          paxTime: 46.912,
          cleanCount: 1,
          coneCount: 1,
          dnfCount: 0,
          toFirstInClass: 0,
          toNextInClass: 0,
          toFirstInPax: 1.234,
          toNextInPax: 0,
          runs: [],
          rallyCrossTime: 0,
          rallyCrossToFirst: 0,
          rallyCrossToNext: 0
        }
      }
    ]
  };

  it("renders all class results initially", () => {
    render(
      <ClassResults
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    expect(screen.getByTestId("class-SS")).toBeInTheDocument();
    expect(screen.getByTestId("class-AS")).toBeInTheDocument();
  });

  it("filters results when a class is selected", () => {
    render(
      <ClassResults
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    fireEvent.click(screen.getByTestId("filter-SS"));

    expect(screen.getByTestId("class-SS")).toBeInTheDocument();
    expect(screen.queryByTestId("class-AS")).not.toBeInTheDocument();
  });

  it("shows all results when filters are cleared", () => {
    render(
      <ClassResults
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    // First, filter to show only SS
    fireEvent.click(screen.getByTestId("filter-SS"));
    expect(screen.queryByTestId("class-AS")).not.toBeInTheDocument();

    // Then clear filters
    fireEvent.click(screen.getByTestId("clear-filters"));

    expect(screen.getByTestId("class-SS")).toBeInTheDocument();
    expect(screen.getByTestId("class-AS")).toBeInTheDocument();
  });

  it("toggles class visibility when clicking filter multiple times", () => {
    render(
      <ClassResults
        results={mockResults}
        displayMode={DisplayMode.autocross}
      />
    );

    // First click - show only SS
    fireEvent.click(screen.getByTestId("filter-SS"));
    expect(screen.getByTestId("class-SS")).toBeInTheDocument();
    expect(screen.queryByTestId("class-AS")).not.toBeInTheDocument();

    // Second click - remove SS filter
    fireEvent.click(screen.getByTestId("filter-SS"));
    expect(screen.getByTestId("class-SS")).toBeInTheDocument();
    expect(screen.getByTestId("class-AS")).toBeInTheDocument();
  });
}); 