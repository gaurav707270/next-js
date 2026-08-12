"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "../../../../components/ProjectForm";
import Loader from "../../../../components/Loader";
import { getProjectById, updateProject } from "../../../../services/projectApi";

export default function EditProjectPage({ params }) {
    const resolvedParams = use(params);
    const projectId = resolvedParams.id;

    const router = useRouter();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await getProjectById(projectId);
                setProject(data);
            } catch (err) {
                setError("Failed to fetch project details.");
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [projectId]);

    const handleUpdate = async (formData) => {
        setSubmitting(true);
        setError(null);
        try {
            await updateProject(projectId, formData);
            router.push(`/projects/${projectId}`);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update project.");
            setSubmitting(false);
        }
    };

    if (loading) return <Loader message="Loading details for edit..." />;

    return (
        <div className="container py-4" style={{ maxWidth: "800px" }}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
            {project && (
                <ProjectForm initialData={project} onSubmit={handleUpdate} isSubmitting={submitting} />
            )}
        </div>
    );
}
