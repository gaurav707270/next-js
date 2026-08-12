import React from "react";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2, FiCalendar, FiUser, FiCheckSquare } from "react-icons/fi";
import ProjectProgress from "./ProjectProgress";
import { getStatusBadge, getPriorityBadge } from "./ProjectForm";

export default function ProjectCard({ project, onDeleteInit }) {
  const {
    _id,
    name,
    description,
    status = "planning",
    priority = "medium",
    manager = "Unassigned",
    startDate,
    dueDate,
    progress = 0,
    completedTasks = 0,
    totalTasks = 0,
  } = project;

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold text-truncate me-2 mb-0" style={{ maxWidth: "70%" }}>
            {name}
          </h5>
          <div className="d-flex gap-1">
            <span className={`badge ${getStatusBadge(status)} text-capitalize`}>{status}</span>
            <span className={`badge ${getPriorityBadge(priority)} text-capitalize`}>{priority}</span>
          </div>
        </div>

        <p className="card-text text-muted small mb-3 text-truncate-2" style={{ height: "2.5rem" }}>
          {description || "No project description provided."}
        </p>

        <div className="mb-3 small text-muted">
          <div className="d-flex align-items-center gap-2 mb-1">
            <FiUser size={14} />
            <span className="text-truncate">Manager: <strong>{manager}</strong></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FiCalendar size={14} />
            <span>Due: {dueDate ? new Date(dueDate).toLocaleDateString() : "N/A"}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
            <span><FiCheckSquare size={14} className="me-1" />Tasks</span>
            <span className="fw-semibold">{completedTasks}/{totalTasks}</span>
          </div>

          <ProjectProgress progress={progress} />

          <hr className="my-3 text-border" />

          <div className="d-flex justify-content-end gap-2">
            <Link href={`/projects/${_id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
              <FiEye size={14} /> View
            </Link>
            <Link href={`/projects/${_id}/edit`} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
              <FiEdit2 size={14} /> Edit
            </Link>
            <button
              onClick={() => onDeleteInit(project)}
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
            >
              <FiTrash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}