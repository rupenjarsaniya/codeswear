import Link from "next/link";

export default function Custom404() {
    return <div className="flex items-center justify-center flex-col min-h-[90vh]">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <Link href={'/'}>
            <button className="flex text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded mt-5">Home</button>
        </Link>
    </div>
}