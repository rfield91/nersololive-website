import type { ClassResult, RawResult, RunWork } from "~/app/_common/types";

export async function fetchClassResults(): Promise<Record<string, ClassResult[]>> {
  const response = await fetch(process.env.CLASS_RESULTS_JSON_URL!);
  if (!response.ok) {
    throw new Error("Failed to fetch class results");
  }
  const data = await response.json();
  return data.results;
}

export async function fetchPaxResults(): Promise<ClassResult[]> {
  const response = await fetch(process.env.PAX_RESULTS_JSON_URL!);
  if (!response.ok) {
    throw new Error("Failed to fetch PAX results");
  }
  const data = await response.json();
  return data.results;
}

export async function fetchRawResults(): Promise<RawResult[]> {
  const response = await fetch(process.env.RAW_RESULTS_JSON_URL!);
  if (!response.ok) {
    throw new Error("Failed to fetch raw results");
  }
  const data = await response.json();
  return data.results;
}

export async function fetchRunWork(): Promise<RunWork> {
  const response = await fetch(process.env.RUN_WORK_JSON_URL!);
  if (!response.ok) {
    throw new Error("Failed to fetch run work");
  }
  return response.json();
} 