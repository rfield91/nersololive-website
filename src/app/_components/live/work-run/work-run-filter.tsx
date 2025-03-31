import Link from "next/link";

interface WorkRunFilterProps {
    classes: string[];
    selectedClass: string;
    handleSelectClass: (c: string) => void;
}

const WorkRunFilter = ({
    classes,
    selectedClass,
    handleSelectClass,
}: WorkRunFilterProps) => {
    const showStyle = "bg-[#6505eb] text-white";
    const hideStyle = "bg-white text-[#6505eb] border border-[#6505eb]";

    const classLinks = classes.map((c) => {
        return (
            <Link
                key={c}
                href={`#`}
                onClick={() => handleSelectClass(c)}
                className={`${
                    selectedClass === c ? showStyle : hideStyle
                } col-span-2 m-1 rounded-xl text-center font-bold`}
            >
                {c}
            </Link>
        );
    });

    return (
        <div className="mt-2 p-2">
            <div className="grid grid-cols-12">{classLinks}</div>
        </div>
    );
};

export default WorkRunFilter;
