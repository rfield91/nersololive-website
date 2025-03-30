import { render, screen, fireEvent } from "@testing-library/react";
import WorkRunFilter from "../work-run-filter";

describe("WorkRunFilter", () => {
  const mockClasses = ["SS", "AS", "BS"];
  const mockHandleSelectClass = jest.fn();

  beforeEach(() => {
    mockHandleSelectClass.mockClear();
  });

  it("renders all class links", () => {
    render(
      <WorkRunFilter
        classes={mockClasses}
        selectedClass="SS"
        handleSelectClass={mockHandleSelectClass}
      />
    );

    mockClasses.forEach((c) => {
      expect(screen.getByText(c)).toBeInTheDocument();
    });
  });

  it("applies correct styles to selected class", () => {
    render(
      <WorkRunFilter
        classes={mockClasses}
        selectedClass="SS"
        handleSelectClass={mockHandleSelectClass}
      />
    );

    const selectedLink = screen.getByText("SS");
    expect(selectedLink).toHaveClass("bg-[#6505eb]", "text-white");
  });

  it("applies correct styles to unselected classes", () => {
    render(
      <WorkRunFilter
        classes={mockClasses}
        selectedClass="SS"
        handleSelectClass={mockHandleSelectClass}
      />
    );

    const unselectedLinks = [screen.getByText("AS"), screen.getByText("BS")];
    unselectedLinks.forEach((link) => {
      expect(link).toHaveClass("bg-white", "text-[#6505eb]", "border", "border-[#6505eb]");
    });
  });

  it("calls handleSelectClass with correct class when clicked", () => {
    render(
      <WorkRunFilter
        classes={mockClasses}
        selectedClass="SS"
        handleSelectClass={mockHandleSelectClass}
      />
    );

    fireEvent.click(screen.getByText("AS"));
    expect(mockHandleSelectClass).toHaveBeenCalledWith("AS");
  });
}); 