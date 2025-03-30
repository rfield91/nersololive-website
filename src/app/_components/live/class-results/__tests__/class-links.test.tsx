import { render, screen, fireEvent } from "@testing-library/react";
import ClassLinks from "../class-links";

describe("ClassLinks", () => {
  const mockClasses = ["SS", "AS", "BS"];
  const mockToggleFilter = jest.fn();
  const mockClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all class links", () => {
    render(
      <ClassLinks
        classes={mockClasses}
        filteredClasses={[]}
        toggleFilter={mockToggleFilter}
        clearFilters={mockClearFilters}
      />
    );

    mockClasses.forEach(className => {
      expect(screen.getByText(className)).toBeInTheDocument();
    });
  });

  it("shows all classes with active style when no filters", () => {
    const { container } = render(
      <ClassLinks
        classes={mockClasses}
        filteredClasses={[]}
        toggleFilter={mockToggleFilter}
        clearFilters={mockClearFilters}
      />
    );

    mockClasses.forEach(className => {
      const link = screen.getByText(className);
      expect(link).toHaveClass("bg-[#6505eb]", "text-white");
    });

    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
  });

  it("shows only filtered classes with active style", () => {
    const { container } = render(
      <ClassLinks
        classes={mockClasses}
        filteredClasses={["SS"]}
        toggleFilter={mockToggleFilter}
        clearFilters={mockClearFilters}
      />
    );

    const activeLink = screen.getByText("SS");
    expect(activeLink).toHaveClass("bg-[#6505eb]", "text-white");

    ["AS", "BS"].forEach(className => {
      const inactiveLink = screen.getByText(className);
      expect(inactiveLink).toHaveClass("bg-white", "text-[#6505eb]");
    });

    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("calls toggleFilter when clicking a class link", () => {
    render(
      <ClassLinks
        classes={mockClasses}
        filteredClasses={[]}
        toggleFilter={mockToggleFilter}
        clearFilters={mockClearFilters}
      />
    );

    fireEvent.click(screen.getByText("SS"));
    expect(mockToggleFilter).toHaveBeenCalledWith("SS");
  });

  it("calls clearFilters when clicking clear button", () => {
    render(
      <ClassLinks
        classes={mockClasses}
        filteredClasses={["SS"]}
        toggleFilter={mockToggleFilter}
        clearFilters={mockClearFilters}
      />
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(mockClearFilters).toHaveBeenCalled();
  });
}); 