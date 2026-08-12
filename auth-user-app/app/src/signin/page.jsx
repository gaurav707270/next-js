"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import { signIn } from "@/redux-store/features/AuthSlice";
import { saveCurrentUser } from "@/utils/localStorage";

export default function SignIn() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.get("/users");

            const user = res.data.find(
                (item) =>
                    item.email === loginData.email &&
                    item.password === loginData.password
            );

            if (!user) {
                alert("Invalid Email or Password");
                return;
            }

            dispatch(signIn(user));

            saveCurrentUser(user);

            alert("Login Successfully");

            router.push("/home");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={loginData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

            <br />

            <button onClick={() => router.push("/signup")}>
                Create New Account
            </button>

        </div>
    );
}