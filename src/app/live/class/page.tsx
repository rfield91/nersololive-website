import {
    DisplayMode,
    type ClassResult,
    type ClassResultsJson,
} from "~/app/_common/types";
import ClassResults from "~/app/_components/live/class-results/class-results";
import { env } from "~/env";
import { getClassResults } from "~/app/api/class-results/get-class-results";

export default async function Live() {
    const displayMode = env.CLASS_RESULT_DISPLAY_MODE as DisplayMode;
    const results = await getClassResults(displayMode);

    if (results === null) return <main>No results available</main>;

    return (
        <main className="mt-4">
            <ClassResults results={results} displayMode={displayMode} />
        </main>
    );
}
