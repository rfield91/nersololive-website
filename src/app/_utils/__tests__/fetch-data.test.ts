import { fetchClassResults, fetchPaxResults, fetchRawResults, fetchRunWork } from "../fetch-data";

// Mock fetch globally
global.fetch = jest.fn();

describe("Data Fetching", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchClassResults", () => {
    it("fetches and parses class results successfully", async () => {
      const mockData = {
        results: {
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
          ]
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      const result = await fetchClassResults();
      expect(result).toEqual(mockData.results);
      expect(global.fetch).toHaveBeenCalledWith(process.env.CLASS_RESULTS_JSON_URL);
    });

    it("handles fetch errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchClassResults()).rejects.toThrow("Network error");
    });

    it("handles non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchClassResults()).rejects.toThrow("Failed to fetch class results");
    });
  });

  describe("fetchPaxResults", () => {
    it("fetches and parses PAX results successfully", async () => {
      const mockData = {
        results: [
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
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      const result = await fetchPaxResults();
      expect(result).toEqual(mockData.results);
      expect(global.fetch).toHaveBeenCalledWith(process.env.PAX_RESULTS_JSON_URL);
    });

    it("handles fetch errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchPaxResults()).rejects.toThrow("Network error");
    });

    it("handles non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchPaxResults()).rejects.toThrow("Failed to fetch PAX results");
    });
  });

  describe("fetchRawResults", () => {
    it("fetches and parses raw results successfully", async () => {
      const mockData = {
        results: [
          {
            position: 1,
            entryInfo: {
              name: "John Doe",
              carClass: "SS",
              number: 42,
              car: "Porsche GT3",
              color: "Black"
            },
            total: 45.678,
            time: 45.678,
            coneCount: 0,
            toFirst: 0,
            toNext: 1.234
          }
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      const result = await fetchRawResults();
      expect(result).toEqual(mockData.results);
      expect(global.fetch).toHaveBeenCalledWith(process.env.RAW_RESULTS_JSON_URL);
    });

    it("handles fetch errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchRawResults()).rejects.toThrow("Network error");
    });

    it("handles non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchRawResults()).rejects.toThrow("Failed to fetch raw results");
    });
  });

  describe("fetchRunWork", () => {
    it("fetches and parses run work successfully", async () => {
      const mockData = {
        runWork: {
          "SS": { run: 1, work: 2 },
          "AS": { run: 2, work: 1 }
        },
        numberOfHeats: 2,
        timestamp: new Date()
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      const result = await fetchRunWork();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(process.env.RUN_WORK_JSON_URL);
    });

    it("handles fetch errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchRunWork()).rejects.toThrow("Network error");
    });

    it("handles non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchRunWork()).rejects.toThrow("Failed to fetch run work");
    });
  });
}); 