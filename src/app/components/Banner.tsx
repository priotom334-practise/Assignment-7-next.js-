import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";

async function DateLabel() {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <p className="bg-green-300 text-green-900 w-fit rounded-2xl p-1">{date}</p>;
}

const Banner = () => {

    return (
        <div className="container mx-auto px-4  py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4  px-6 md:px-8 py-10 bg-mist-200 rounded-2xl">
                <div className="flex flex-col gap-4 md:w-1/2">
                    <Suspense fallback={<span className="loading loading-spinner loading-xs" />}>
                        <DateLabel />
                    </Suspense>
                    <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
                    <p className="text-neutral-700 text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br />
                        সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <button className="w-fit bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">সব পন্য দেখুন</button>
                </div>

                <div>
                    <Image src="/bazar-hero.png" alt="banner" width={400} height={300} className="w-full h-auto" />
                </div>
            </div >
        </div>
    );
};

export default Banner;