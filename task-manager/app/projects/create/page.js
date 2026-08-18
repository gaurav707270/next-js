"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "../../components/ProjectForm";
import { createProject } from "../../../services/projectApi";

export default function CreateProjectPage() {
    // const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // const handleCreate = async (formData) => {
        // setSubmitting(true);
        setError(null);
        try {
            await createProject(formData);
            router.push("/projects");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to create project.");
            setSubmitting(false);
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: "800px" }}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
            <ProjectForm onSubmit={handleCreate} isSubmitting={submitting} />
        </div>
    );
}
