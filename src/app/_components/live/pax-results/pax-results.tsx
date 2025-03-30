import type { ClassResult } from "~/app/_common/types";
import PaxEntry from "./pax-entry";

const PaxResults = ({ results }: { results: ClassResult[] }) => {
    const sortedResults = [...results].sort((a, b) => a.paxPosition - b.paxPosition);
    const entries = sortedResults.map((entry) => {
        return <PaxEntry key={entry.name} entry={entry} />;
    });

    return <div>{entries}</div>;
};

export default PaxResults;
