"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/users";

export default function UserForm({
    user,
    onSuccess,
    onClose
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: ""
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                city: ""
            });
        }

        setErrors({});
    }, [user]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    function validate() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            newErrors.email = "Invalid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            const url = user
                ? `${API_URL}/${user.id}`
                : API_URL;

            const method = user ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            onSuccess();

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                        {user ? "Edit User" : "Add User"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>
                        <label className="mb-1 block font-medium">
                            Name
                        </label>

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Phone
                        </label>

                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            City
                        </label>

                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.city && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.city}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : user
                                    ? "Update"
                                    : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}