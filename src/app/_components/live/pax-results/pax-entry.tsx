import type { ClassResult } from "~/app/_common/types";

const PaxEntry = ({ entry }: { entry: ClassResult }) => {
    const best = entry.runInfo.runs.find((e) => e.isBest);

    return (
        <div data-testid="pax-entry" className="m-2 bg-white text-black shadow-lg lg:mx-0">
            <div className="grid grid-cols-12 gap-1">
                <div className="col-span-2 text-center">
                    <div className="text-xs text-slate-600">PAX</div>
                    <div>{entry.paxPosition}</div>
                    <div className="text-xs text-slate-600">Class</div>
                    <div>{entry.position}</div>
                </div>
                <div className="col-span-6">
                    <div className="text-xs">
                        {entry.carClass} #{entry.number}
                    </div>
                    <div className="text-sm">{entry.name}</div>
                    <div className="text-xs text-slate-600">{entry.car}</div>
                    <div className="text-xs text-slate-500">{entry.color}</div>
                </div>
                <div className="col-span-2 text-center">
                    <div className="text-xs text-slate-600">PAX</div>
                    <div>{entry.runInfo.paxTime}</div>
                    <div className="text-xs text-slate-600">Raw</div>
                    <div>{best?.time}</div>
                </div>
                <div className="col-span-2 text-center">
                    {entry.runInfo.toFirstInPax && entry.runInfo.toNextInPax ? (
                        <>
                            <div className="text-xs text-slate-600">First</div>
                            <div>
                                {entry.runInfo.toFirstInPax
                                    ? entry.runInfo.toFirstInPax.toFixed(3)
                                    : ""}
                            </div>
                            <div className="text-xs text-slate-600">Next</div>
                            <div>
                                {entry.runInfo.toNextInPax
                                    ? entry.runInfo.toNextInPax.toFixed(3)
                                    : ""}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PaxEntry;
