import IsToday from "../is-today";

describe("IsToday", () => {
  let mockDate: Date;

  beforeEach(() => {
    // Mock current date to 2024-03-30
    mockDate = new Date(2024, 2, 30); // Month is 0-based
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns true for today's date", () => {
    const today = new Date(2024, 2, 30);
    expect(IsToday(today)).toBe(true);
  });

  it("returns false for yesterday's date", () => {
    const yesterday = new Date(2024, 2, 29);
    expect(IsToday(yesterday)).toBe(false);
  });

  it("returns false for tomorrow's date", () => {
    const tomorrow = new Date(2024, 2, 31);
    expect(IsToday(tomorrow)).toBe(false);
  });

  it("returns false for same day in different month", () => {
    const sameDay = new Date(2024, 3, 30); // April 30, 2024
    expect(IsToday(sameDay)).toBe(false);
  });

  it("returns false for same day in different year", () => {
    const sameDay = new Date(2023, 2, 30); // March 30, 2023
    expect(IsToday(sameDay)).toBe(false);
  });
}); 