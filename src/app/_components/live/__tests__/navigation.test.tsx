import { render, screen } from "@testing-library/react";
import Navigation from "../navigation";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navigation", () => {
  const mockPages = [
    { name: "Page 1", link: "/page1" },
    { name: "Page 2", link: "/page2" },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReset();
  });

  it("renders all navigation items", () => {
    (usePathname as jest.Mock).mockReturnValue("/page1");
    render(<Navigation pages={mockPages} />);

    expect(screen.getByText("Page 1")).toBeInTheDocument();
    expect(screen.getByText("Page 2")).toBeInTheDocument();
  });

  it("applies active styles to current page", () => {
    (usePathname as jest.Mock).mockReturnValue("/page1");
    render(<Navigation pages={mockPages} />);

    const activeLink = screen.getByText("Page 1").closest("a");
    const inactiveLink = screen.getByText("Page 2").closest("a");

    expect(activeLink).toHaveClass("border-white");
    expect(inactiveLink).toHaveClass("border-transparent");
  });

  it("renders navigation items in correct order", () => {
    (usePathname as jest.Mock).mockReturnValue("/page1");
    render(<Navigation pages={mockPages} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Page 1");
    expect(items[1]).toHaveTextContent("Page 2");
  });
}); 