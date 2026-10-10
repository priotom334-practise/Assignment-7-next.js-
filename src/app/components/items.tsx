import Link from "next/link";



interface Navs {
    slug: string;
    nameBn: string;
    icon: string;
    id: string;
}


const items = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();

    return (
        <div className="flex gap-5 justify-left mt-2">

            {data.map((n: Navs) => (
                <div key={n.slug} >
                    <div className="flex items-center text-sm font-semibold text-neutral-700 transition-colors hover:text-red-700">
                        <span className="text-[15px] leading-none flex items-center justify-center h-10 w-10">
                            {n.icon}
                        </span>
                        <Link href={`/category/${n.slug}`}>
                            {n.nameBn}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default items;