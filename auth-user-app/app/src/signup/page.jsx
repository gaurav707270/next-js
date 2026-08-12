"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function SignUp() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await api.get("/users");

        const exist = res.data.find(
            (item) => item.email === user.email
        );

        if (exist) {
            alert("Email already exists");
            return;
        }

        await api.post("/users", user);

        alert("Account Created Successfully");

        router.push("/signin");
    };

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Sign Up
                </button>
            </form>

            <br />

            <button onClick={() => router.push("/signin")}>
                Already Have Account
            </button>
        </div>
    );
}