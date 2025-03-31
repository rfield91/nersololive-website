import Link from "next/link";

interface ClassLinksProps {
    classes: string[];
    filteredClasses: string[];
    toggleFilter: (c: string) => void;
    clearFilters: () => void;
}

const ClassLinks = ({
    classes,
    filteredClasses,
    toggleFilter,
    clearFilters,
}: ClassLinksProps) => {
    const noSelected = !filteredClasses.length;
    const showStyle = "bg-[#6505eb] text-white border border-[#6505eb]";
    const hideStyle = "bg-white text-[#6505eb] border border-[#6505eb]";

    const classLinks = classes.map((c) => {
        const selected = filteredClasses.includes(c);
        return (
            <Link
                key={c}
                href={`#`}
                onClick={() => toggleFilter(c)}
                className={`${
                    selected || noSelected ? showStyle : hideStyle
                } col-span-2 m-1 rounded-xl text-center font-bold`}
            >
                {c}
            </Link>
        );
    });

    return (
        <div className="mt-2 p-2">
            <div className="grid grid-cols-12">
                {classLinks}
                {!noSelected && (
                    <Link
                        key={`clear`}
                        href={`#`}
                        onClick={clearFilters}
                        className={`col-span-2 col-start-11 m-1 rounded-xl bg-orange-500 text-center font-bold text-white`}
                    >
                        Clear
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ClassLinks;
