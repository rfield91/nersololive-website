import type { Run } from "~/app/_common/types";

const RunTimeDisplay = ({ run }: { run: Run }) => {
    const timeDisplay = (() => {
        if (run.status == "DIRTY")
            return (
                <span>
                    {run.time?.toFixed(3)}+{run.coneCount}
                </span>
            );

        if (run.status == "CLEAN")
            return <span>{run.time?.toFixed(3).toString()}</span>;

        return (
            <span>
                {run.time?.toFixed(3)}{" "}
                <span className="text-xs">({run.status})</span>
            </span>
        );
    })();

    return (
        <span className={run.isBest ? "text-green-700 font-bold" : ""}>
            {timeDisplay}
        </span>
    );
};

export default RunTimeDisplay;
