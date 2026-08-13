"use client";

export default function UserTable({
    users,
    sortField,
    sortDirection,
    handleSort,
    handleView,
    handleEdit,
    handleDelete
}) {
    function sortIcon(field) {
        if (sortField !== field) {
            return "";
        }

        return sortDirection === "asc" ? " ↑" : " ↓";
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-white">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-5 py-4 text-left">
                                ID
                            </th>

                            <th className="px-5 py-4 text-left">
                                <button
                                    onClick={() => handleSort("name")}
                                    className="font-semibold hover:text-blue-600"
                                >
                                    Name
                                    {sortIcon("name")}
                                </button>
                            </th>

                            <th className="px-5 py-4 text-left">
                                <button
                                    onClick={() => handleSort("email")}
                                    className="font-semibold hover:text-blue-600"
                                >
                                    Email
                                    {sortIcon("email")}
                                </button>
                            </th>

                            <th className="px-5 py-4 text-left">
                                Phone
                            </th>

                            <th className="px-5 py-4 text-left">
                                City
                            </th>

                            <th className="px-5 py-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="px-5 py-4">
                                    {user.id}
                                </td>

                                <td className="px-5 py-4 font-medium">
                                    {user.name}
                                </td>

                                <td className="px-5 py-4">
                                    {user.email}
                                </td>

                                <td className="px-5 py-4">
                                    {user.phone}
                                </td>

                                <td className="px-5 py-4">
                                    {user.city}
                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => handleView(user)}
                                            className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm text-white hover:bg-gray-800"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="rounded-lg bg-yellow-500 px-3 py-1.5 text-sm text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

                {users.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No users found
                    </div>
                )}

            </div>

        </div>
    );
}