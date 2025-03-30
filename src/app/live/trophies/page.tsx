import type { DisplayMode } from "~/app/_common/types";
import Trophies from "~/app/_components/live/utils/trophies";
import { getClassResults } from "~/app/api/class-results/get-class-results";
import { env } from "~/env";

async function getTrophies() {
    const displayMode = env.CLASS_RESULT_DISPLAY_MODE as DisplayMode;
    const results = await getClassResults(displayMode);

    return results;
}

export default async function Live() {
    const results = await getTrophies();

    if (results === null) return <main>No class results available.</main>;


    return (
        <main>
            <Trophies results={results} />
        </main>
    );
}
