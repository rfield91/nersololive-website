"use client";

import type { ClassResult } from "~/app/_common/types";
import React from "react";

type TrophiesProps = {
    results: Record<string, ClassResult[]>;
};

export default function Trophies({ results }: TrophiesProps) {
    // Get all trophy results (positions containing 'T')
    const trophyResults = Object.entries(results).flatMap(([carClass, classResults]) =>
        classResults
            .filter(result => result.position.includes('T'))
            .map(result => ({
                ...result,
                carClass,
                totalInClass: classResults.length
            }))
    );

    if (trophyResults.length === 0) {
        return null;
    }

    return (
        <div className="mt-2 pb-[300px]">
            <div className="flex flex-col gap-2 mx-auto">
                {trophyResults.map((result, index) => {
                    const bestRun = result.runInfo.runs.find(run => run.isBest);
                    const position = parseInt(result.position.replace('T', ''));
                    const ordinal = (pos: number) => {
                        const suffixes = ['th', 'st', 'nd', 'rd'];
                        const suffix = pos % 100 > 10 && pos % 100 < 14 ? 'th' : suffixes[pos % 10] || 'th';
                        return pos + suffix;
                    };
                    
                    const currentGroup = trophyResults[index]?.carClassGroup;
                    const prevGroup = index > 0 ? trophyResults[index - 1]?.carClassGroup : null;
                    
                    return (
                        <React.Fragment key={`${result.carClassGroup}-${result.position}`}>
                            {(!prevGroup || currentGroup !== prevGroup) && (
                                <div className="text-xl font-bold mt-4">{result.carClassGroup} <span className="text-xs text-gray-400 float-right mt-2">Participants: {result.totalInClass}</span></div>
                            )}
                            <div className="ml-4 flex flex-col">
                                <div className="text-md">
                                    {ordinal(position)} - {result.name} #{result.number}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {result.car} - {bestRun ? bestRun.time.toFixed(3) : 'N/A'} {result.runInfo.toNextInClass ? `(+${result.runInfo.toNextInClass.toFixed(3)})` : ''}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
