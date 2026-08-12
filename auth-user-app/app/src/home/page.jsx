"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import { logout } from "@/redux-store/features/AuthSlice";
import {
    getCurrentUser,
    removeCurrentUser,
} from "@/utils/localStorage";

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = getCurrentUser();

        if (!user) {
            router.push("/signin");
            return;
        }

        setCurrentUser(user);

        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        removeCurrentUser();
        dispatch(logout());
        router.push("/signin");
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Home Page</h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            <hr />

            <h2>Current User</h2>

            {currentUser && (
                <div
                    style={{
                        border: "1px solid gray",
                        padding: "15px",
                        marginBottom: "20px",
                    }}
                >
                    <h3>{currentUser.name}</h3>
                    <p>{currentUser.email}</p>
                </div>
            )}

            <hr />

            <h2>All Users</h2>

            {users.map((user) => (
                <div
                    key={user.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        marginBottom: "15px",
                    }}
                >
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}