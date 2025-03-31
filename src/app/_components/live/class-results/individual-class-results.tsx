import Link from "next/link";
import type { ClassResult, DisplayMode } from "~/app/_common/types";
import ClassResulsEntry from "./class-results-entry";

const IndividualClassResults = ({
    className,
    results,
    displayMode,
}: {
    className: string;
    results: ClassResult[];
    displayMode: DisplayMode;
}) => {
    const entries = results.map((entry) => {
        return (
            <ClassResulsEntry
                entry={entry}
                key={`${entry.name}-${entry.number}`}
                displayMode={displayMode}
            />
        );
    });

    return (
        <div key={className} id={className}>
            <h2 className="cursor-pointer p-1 text-center text-lg font-bold tracking-widest text-white">
                <Link href={`#${className}`}>{className}</Link>
            </h2>

            <div>{entries}</div>
        </div>
    );
};

export default IndividualClassResults;
