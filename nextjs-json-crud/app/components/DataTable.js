"use client";

import { useEffect, useMemo, useState } from "react";

import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import Pagination from "./Pagination";
import UserViewModal from "./UserViewModal";

const API_URL = "http://localhost:3001/users";

const ITEMS_PER_PAGE = 5;

export default function DataTable() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [sortField, setSortField] = useState("name");

    const [sortDirection, setSortDirection] =
        useState("asc");

    const [showForm, setShowForm] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [viewingUser, setViewingUser] = useState(null);

    async function fetchUsers() {

        try {

            setLoading(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.error(error);

            alert("Failed to load users");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {

        const searchValue = search
            .toLowerCase()
            .trim();

        let result = users.filter((user) => {

            return (
                user.name
                    .toLowerCase()
                    .includes(searchValue) ||

                user.email
                    .toLowerCase()
                    .includes(searchValue) ||

                user.phone
                    .toLowerCase()
                    .includes(searchValue) ||

                user.city
                    .toLowerCase()
                    .includes(searchValue)
            );

        });

        result.sort((a, b) => {

            const first = String(
                a[sortField]
            ).toLowerCase();

            const second = String(
                b[sortField]
            ).toLowerCase();

            if (first < second) {
                return sortDirection === "asc"
                    ? -1
                    : 1;
            }

            if (first > second) {
                return sortDirection === "asc"
                    ? 1
                    : -1;
            }

            return 0;

        });

        return result;

    }, [
        users,
        search,
        sortField,
        sortDirection
    ]);

    const totalPages = Math.ceil(
        filteredUsers.length /
        ITEMS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

    const currentUsers =
        filteredUsers.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

    function handleSort(field) {

        if (sortField === field) {

            setSortDirection(
                sortDirection === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortField(field);

            setSortDirection("asc");

        }

    }

    function handleAdd() {

        setEditingUser(null);

        setShowForm(true);

    }

    function handleEdit(user) {

        setEditingUser(user);

        setShowForm(true);

    }

    function handleView(user) {

        setViewingUser(user);

    }

    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const response =
                await fetch(
                    `${API_URL}/${id}`,
                    {
                        method: "DELETE"
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Delete failed"
                );
            }

            await fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete user"
            );

        }

    }

    function handleFormSuccess() {

        setShowForm(false);

        setEditingUser(null);

        fetchUsers();

    }

    return (

        <div className="space-y-5">

            {/* HEADER */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <h2 className="text-2xl font-bold">
                        Users
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage your users
                    </p>

                </div>

                <button
                    onClick={handleAdd}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                    + Add User
                </button>

            </div>

            {/* SEARCH */}

            <SearchBar
                search={search}
                setSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
            />

            {/* TABLE */}

            {loading ? (

                <div className="rounded-xl border bg-white p-10 text-center">
                    Loading users...
                </div>

            ) : (

                <UserTable
                    users={currentUsers}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

            )}

            {/* PAGINATION */}

            {!loading && (

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    totalItems={filteredUsers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                />

            )}

            {/* ADD / EDIT */}

            {showForm && (

                <UserForm
                    user={editingUser}
                    onSuccess={handleFormSuccess}
                    onClose={() => {
                        setShowForm(false);
                        setEditingUser(null);
                    }}
                />

            )}

            {/* VIEW */}

            <UserViewModal
                user={viewingUser}
                onClose={() => setViewingUser(null)}
            />

        </div>

    );

}