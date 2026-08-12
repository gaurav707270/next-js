"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiCalendar, FiUser, FiUsers, FiDollarSign } from "react-icons/fi";
import { getProjectById, getProjectTasks } from "../../../services/projectApi";
import ProjectProgress from "../../components/ProjectProgress";
import Loader from "../../components/Loader";
import { getStatusBadge, getPriorityBadge } from "../../components/ProjectForm";

export default function ProjectDetailsPage({ params }) {
    const resolvedParams = use(params);
    const projectId = resolvedParams.id;

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const projectData = await getProjectById(projectId);
                setProject(projectData);

                try {
                    const taskData = await getProjectTasks(projectId);
                    setTasks(taskData || []);
                } catch (taskErr) {
                    // If tasks fetch fails independently, preserve project UI view state
                    setTasks([]);
                }
            } catch (err) {
                setError("Project not found or API error.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [projectId]);

    if (loading) return <Loader message="Loading project details..." />;
    if (error || !project) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger">{error || "Project missing."}</div>
                <Link href="/projects" className="btn btn-primary">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4 bg-light min-vh-100">
            {/* Navigation Top Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Link href="/projects" className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1">
                    <FiArrowLeft /> Back
                </Link>
                <Link href={`/projects/${projectId}/edit`} className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
                    <FiEdit2 /> Edit Project
                </Link>
            </div>

            {/* Main Info Header Card */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                        <div>
                            <h3 className="fw-bold mb-1">{project.name}</h3>
                            <p className="text-muted mb-0">{project.description}</p>
                        </div>
                        <div className="d-flex gap-2">
                            <span className={`badge ${getStatusBadge(project.status)} text-capitalize fs-6`}>
                                {project.status}
                            </span>
                            <span className={`badge ${getPriorityBadge(project.priority)} text-capitalize fs-6`}>
                                {project.priority}
                            </span>
                        </div>
                    </div>

                    <hr className="my-3 text-border" />

                    {/* Quick Metadata Matrix */}
                    <div className="row g-3">
                        <div className="col-6 col-md-3">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                                <FiUser /> Manager
                            </div>
                            <div className="fw-bold">{project.manager || "Unassigned"}</div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                                <FiUsers /> Team Size
                            </div>
                            <div className="fw-bold">{project.teamMembers || 1} members</div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                                <FiCalendar /> Start - Due Date
                            </div>
                            <div className="fw-semibold small">
                                {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"} -{" "}
                                {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "N/A"}
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                                <FiDollarSign /> Budget
                            </div>
                            <div className="fw-bold">{project.budget ? `$${project.budget}` : "N/A"}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stat Breakdown Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Overall Progress</h5>
                            <ProjectProgress progress={project.progress || 0} height="15px" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Tasks Summary</h5>
                            <div className="d-flex justify-content-between small mb-1">
                                <span>Total Tasks:</span>
                                <span className="fw-bold">{project.totalTasks || tasks.length || 0}</span>
                            </div>
                            <div className="d-flex justify-content-between small mb-1">
                                <span>Completed:</span>
                                <span className="fw-bold text-success">{project.completedTasks || 0}</span>
                            </div>
                            <div className="d-flex justify-content-between small mb-1">
                                <span>In Progress:</span>
                                <span className="fw-bold text-primary">{project.inProgressTasks || 0}</span>
                            </div>
                            <div className="d-flex justify-content-between small">
                                <span>Pending:</span>
                                <span className="fw-bold text-warning">{project.pendingTasks || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Embedded Project Tasks List */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">Project Tasks</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Task Name</th>
                                    <th>Assigned To</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            No tasks assigned to this project yet.
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task) => (
                                        <tr key={task._id || task.id}>
                                            <td className="fw-semibold">{task.name || task.title}</td>
                                            <td>{task.assignedTo || "Unassigned"}</td>
                                            <td>
                                                <span className={`badge ${getPriorityBadge(task.priority)} text-capitalize`}>
                                                    {task.priority || "medium"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${getStatusBadge(task.status)} text-capitalize`}>
                                                    {task.status || "pending"}
                                                </span>
                                            </td>
                                            <td className="small text-muted">
                                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
