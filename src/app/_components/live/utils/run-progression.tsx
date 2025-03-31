import type {
    ClassResult,
    HeatProgression,
    RunWork,
} from "~/app/_common/types";

const RunProgression = ({
    runWorkData: { runWork, timestamp },
    runsData,
}: {
    runWorkData: RunWork;
    runsData: ClassResult[];
}) => {
    const heats: Record<string, ClassResult[]> = {};

    // strip the novice prefix from classes to include novices in the count
    // Pro is ran in its own group regardless of class
    const getClassName = (data: ClassResult): string => {
        if (data.carClassGroup === "P") {
            return "P";
        }
        if (data.carClassGroup === "N") {
            return data.carClass.slice(1);
        }
        return data.carClass;
    };

    // parse the run data into heat buckets
    Object.entries(runsData).forEach((runs) => {
        const [, data] = runs;
        const runHeat = runWork[getClassName(data)]?.run;
        if (!heats[runHeat] && runHeat !== undefined) {
            heats[runHeat] = [];
        }
        if (heats[runHeat]) {
            heats[runHeat].push(runs[1]);
        }
    });

    const heatsRunCounts = Object.entries(heats).map(
        (heat): HeatProgression => {
            const [number, cars] = heat;

            const runCounts: Record<string, string[]> = {};
            let maxRuns = 0;
            let totalCompleted = 0;

            cars.forEach((data) => {
                const numberOfRuns = data.runInfo.runs.length;

                if (!runCounts[numberOfRuns]) {
                    runCounts[numberOfRuns] = [];
                }

                if (numberOfRuns > maxRuns && parseInt(data.number) < 100) {
                    maxRuns = numberOfRuns;
                }

                totalCompleted += numberOfRuns;

                runCounts[numberOfRuns].push(`${data.number} ${data.carClass}`);
            });

            // Calculate expected runs based on the current heat state
            // If most cars have completed a run, that's the expected run count
            const expectedRuns = Math.max(1, maxRuns);
            const totalRuns = expectedRuns * cars.length;

            return {
                heat: number,
                runCounts,
                maxRuns: expectedRuns,
                totalRuns,
                totalCompleted,
                percentComplete: Math.ceil((totalCompleted / totalRuns) * 100),
            };
        },
    );

    return (
        <div className="mx-2 mb-5 mt-5">
            {heatsRunCounts.map((heat, key) => {
                const percentComplete = isNaN(heat.percentComplete)
                    ? 0
                    : heat.percentComplete;
                return (
                    <div className="pb-7" key={key}>
                        <div className="flex place-content-between content-center">
                            <h5 className="text-primary mb-2 mt-0 text-2xl font-medium leading-tight">
                                Heat {key + 1}
                            </h5>
                            <div>
                                Current Run:{" "}
                                <span className="font-bold">
                                    {heat.maxRuns}
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-full rounded-full bg-[#6505eb]/20">
                                <div
                                    className="font-large rounded-full bg-[#6505eb] p-2 text-center text-sm leading-none text-white"
                                    style={{ width: `${percentComplete}%` }}
                                >
                                    {" "}
                                    {percentComplete.toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="text-center">
                <p className="mb-2">
                    Bars show the percentage of drivers for each heat who have
                    completed the current run count.
                </p>
                <p className="font-italics mb-2">
                    e.g. If the Heat is at the end of their second runs, the
                    percentage will near 100%, when the first driver completes
                    their third run It wil reset the heat percentage to the
                    start and increment the run &quot;Current run&quot;
                </p>
            </div>
        </div>
    );
};

export default RunProgression;
