"use client";

import { useState } from "react";
import type { RunWork } from "~/app/_common/types";
import IsToday from "~/app/_utils/is-today";
import WorkRunFilter from "./work-run-filter";

type WorkRunOrderProps = {
    runWork: RunWork;
};

export function WorkRunOrder({
    runWork: { runWork, numberOfHeats, timestamp },
}: WorkRunOrderProps) {
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [filteredClasses, setFilteredClasses] = useState<string[]>([]);

    const eventDate = new Date(timestamp);

    if (!IsToday(eventDate)) {
        return (
            <div className="mx-2 mb-5 mt-5 text-center">
                Work/Run order will be available on the day of the event.
            </div>
        );
    }

    return (
        <div>
            <div className="mb-5 mt-5 text-center">
                <p className="pb-2">
                    Please select your class from the filters below.
                </p>
                <p className="pb-2">
                    If you are a Novice, you will run with your base class.
                </p>
                <p className="pb-2">i.e. NDS runs with DS.</p>

                {numberOfHeats == 2 ? (
                    <p className="pb-2">
                        This event will run as <strong>two heats.</strong>
                    </p>
                ) : (
                    <p className="pb-2">
                        This event will run as{" "}
                        <strong>{numberOfHeats} heats</strong>. You are off
                        during the heat(s) not listed as running or working. Use
                        this time to prep your car, get lunch, etc. Please{" "}
                        <strong>watch the flag</strong> to know when to check in
                        for work.
                    </p>
                )}

                <p className="pb-2">
                    <strong>
                        You must check in for work both morning and afternoon
                    </strong>
                </p>
            </div>
            <WorkRunFilter
                classes={Object.keys(runWork)}
                selectedClass={selectedClass}
                handleSelectClass={(newClass) => {
                    setFilteredClasses([newClass]);

                    setSelectedClass(newClass);
                }}
            />
            {filteredClasses.map((c) => {
                return (
                    <div
                        key={c}
                        className="m-2 bg-white text-black shadow-lg lg:mx-0"
                    >
                        <h2 className="p-2 text-center text-lg font-bold tracking-widest">
                            {c}
                        </h2>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="col-span-1 text-center">
                                <div>Run</div>
                                <div className="text-xl font-bold">
                                    {runWork[c].run}
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <div>Work</div>
                                <div className="text-xl font-bold">
                                    {runWork[c].work}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
