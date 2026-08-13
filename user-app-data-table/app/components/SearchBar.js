"use client";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="rounded-xl border bg-white p-4">
            <div className="relative w-full md:w-96">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}