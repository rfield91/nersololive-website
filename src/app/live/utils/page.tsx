import type { PaxResultsJson, RunWork, UtilityData, DisplayMode, ClassResultsJson, ClassResult } from "~/app/_common/types";
import RunProgression from "~/app/_components/live/utils/run-progression";
import IsToday from "~/app/_utils/is-today";
import { env } from "~/env";

async function getUtilityData(): Promise<UtilityData | null> {
    const res1 = await fetch(env.RUN_WORK_JSON_URL);
    const res2 = await fetch(env.PAX_RESULTS_JSON_URL);

    if (!res1.ok || !res2.ok) {
        throw new Error("Could not fetch pax results");
    }

    const runWork = (await res1.json()) as RunWork;
    const paxResultJson = (await res2.json()) as PaxResultsJson;

    if (runWork === undefined || paxResultJson === undefined) return null;

    return {
        runWorkData: runWork,
        runData: paxResultJson.results,
    };
}

export default async function Live() {
    const data = await getUtilityData();

    if (data === null) return <main>No utility data available.</main>;

    const eventDate = new Date(data.runWorkData.timestamp);

    if (!IsToday(eventDate)) {
        return (
            <div className="mx-2 mb-5 mt-5 text-center">
                Utils will be available on the day of the event.
            </div>
        );
    }

    return (
        <main>
            <RunProgression
                runWorkData={data.runWorkData}
                runsData={data.runData}
            />
        </main>
    );
}
