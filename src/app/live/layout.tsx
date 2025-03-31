import Image from "next/image";
import Link from "next/link";
import Navigation from "../_components/live/navigation";

export default function LiveResultsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pages = [
        {
            name: "Class",
            link: "/live/class",
        },
        {
            name: "PAX",
            link: "/live/pax",
        },
        {
            name: "Raw",
            link: "/live/raw",
        },
        {
            // Trophies will display after 4pm. We cannot use the event time because it is not available on initilaization.
            // Work/Run doesnt really serve a purpose after lunch.
            name: new Date().getHours() >= 16 ? "Trophies" : "Work/Run",
            link: new Date().getHours() >= 16 ? "/live/trophies" : "/live/workrun",
        },
        {
            name: "Utils",
            link: "/live/utils",
        },
    ];

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="my-2 flex flex-row items-center text-2xl">
                <Link href="/">
                    <Image
                        src={"/ner150.png"}
                        alt="NER Logo"
                        width={50}
                        height={50}
                    />
                </Link>{" "}
                SoloLive
            </div>
            <Navigation pages={pages} />
            {children}
        </section>
    );
}
