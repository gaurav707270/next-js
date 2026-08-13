"use client";

export default function Pagination({
    currentPage,
    totalPages,
    setCurrentPage,
    totalItems,
    itemsPerPage
}) {
    if (totalPages === 0) {
        return null;
    }

    const start =
        (currentPage - 1) * itemsPerPage + 1;

    const end = Math.min(
        currentPage * itemsPerPage,
        totalItems
    );

    return (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-gray-500">
                Showing {start} - {end} of {totalItems}
            </p>

            <div className="flex gap-2">

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg px-4 py-2 ${currentPage === page
                                ? "bg-blue-600 text-white"
                                : "border bg-white"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>

            </div>
        </div>
    );
}