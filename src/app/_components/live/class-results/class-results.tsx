"use client";

import { useState } from "react";
import type { ClassResult, DisplayMode } from "~/app/_common/types";
import ClassLinks from "./class-links";
import IndividualClassResults from "./individual-class-results";

type ClassResultsProps = {
    results: Record<string, ClassResult[]>;
    displayMode: DisplayMode;
};

const ClassResults = ({ results, displayMode }: ClassResultsProps) => {
    const classes = Object.keys(results);

    // const [filteredClasses, setFilteredClasses] = useState<string[]>([]);
    const defaultClasses: string[] = [];
    // const [filteredClasses, setFilteredClasses] = useLocalStorage<string[]>(
    //     "filteredClasses",
    //     defaultClasses
    // );
    const [filteredClasses, setFilteredClasses] =
        useState<string[]>(defaultClasses);

    const handleFilteredClasses = (toggleClass: string) => {
        const classesToUpdate = [...filteredClasses];

        // remove item if it is already in the array, or add if it is not
        const index = classesToUpdate.indexOf(toggleClass);
        index === -1
            ? classesToUpdate.push(toggleClass)
            : classesToUpdate.splice(index, 1);

        setFilteredClasses(classesToUpdate);
    };

    const clearFilteredClasses = () => {
        setFilteredClasses([]);
    };

    const classResults = classes.map((classKey) => {
        // hide elements that are not selected filters
        if (filteredClasses.length > 0 && !filteredClasses.includes(classKey)) {
            return null;
        }
        return (
            <IndividualClassResults
                className={classKey}
                results={results[classKey]}
                key={classKey}
                displayMode={displayMode}
            />
        );
    });

    return (
        <div>
            <ClassLinks
                classes={classes}
                filteredClasses={filteredClasses}
                toggleFilter={handleFilteredClasses}
                clearFilters={clearFilteredClasses}
            />
            <div>{classResults}</div>
        </div>
    );
};

export default ClassResults;
