import { env } from "~/env";
import { DisplayMode, type ClassResult, type ClassResultsJson } from "~/app/_common/types";

export async function getClassResults(
    displayMode: DisplayMode,
): Promise<Record<string, ClassResult[]> | null> {
    const res = await fetch(env.CLASS_RESULTS_JSON_URL);

    if (!res.ok) {
        throw new Error("Could not fetch class results");
    }

    const resultsJson = (await res.json()) as ClassResultsJson;

    const results = resultsJson.results;

    if (results === undefined) return null;

    if (displayMode === DisplayMode.rallycross) {
        const classes = Object.keys(results);

        classes.forEach((c) => {
            results[c].forEach((entry) => {
                const runInfo = entry.runInfo;

                // Pad missing runs
                if (runInfo.runs.length < env.EXPECTED_RUNS) {
                    for (
                        let i = runInfo.runs.length;
                        i < env.EXPECTED_RUNS;
                        i++
                    ) {
                        runInfo.runs.push({
                            number: i + 1,
                            status: "CLEAN",
                            time: 100,
                            coneCount: 0,
                            isBest: false,
                        });
                    }
                }

                runInfo.rallyCrossTime = runInfo.runs.reduce(
                    (partialTotal, r) =>
                        partialTotal +
                        (r.status == "DNF"
                            ? r.time + 10
                            : r.time + r.coneCount * 2),
                    0,
                );
            });

            results[c].sort(
                (a, b) => a.runInfo.rallyCrossTime - b.runInfo.rallyCrossTime,
            );

            for (let i = 0; i < results[c].length; i++) {
                results[c][i].position = (i + 1).toString();

                if (i > 0) {
                    results[c][i].runInfo.rallyCrossToFirst =
                        results[c][i].runInfo.rallyCrossTime -
                        results[c][0].runInfo.rallyCrossTime;
                    results[c][i].runInfo.rallyCrossToNext =
                        results[c][i].runInfo.rallyCrossTime -
                        results[c][i - 1].runInfo.rallyCrossTime;
                }
            }
        });
    }

    return results;
} 