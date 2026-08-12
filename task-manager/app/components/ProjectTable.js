import React from "react";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import ProjectProgress from "./ProjectProgress";
import { getStatusBadge, getPriorityBadge } from "./ProjectForm";

export default function ProjectTable({ projects = [], onDeleteInit }) {
  return (
    <div className="table-responsive bg-white rounded shadow-sm border">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Project Name</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th style={{ minWidth: "150px" }}>Progress</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td>
                <Link href={`/projects/${p._id}`} className="fw-bold text-decoration-none text-dark">
                  {p.name}
                </Link>
              </td>
              <td className="text-muted small">{p.manager || "N/A"}</td>
              <td>
                <span className={`badge ${getStatusBadge(p.status)} text-capitalize`}>
                  {p.status}
                </span>
              </td>
              <td>
                <span className={`badge ${getPriorityBadge(p.priority)} text-capitalize`}>
                  {p.priority}
                </span>
              </td>
              <td className="text-muted small">
                {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : "N/A"}
              </td>
              <td>
                <ProjectProgress progress={p.progress} height="6px" showLabel={false} />
              </td>
              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <Link href={`/projects/${p._id}`} className="btn btn-outline-primary">
                    <FiEye />
                  </Link>
                  <Link href={`/projects/${p._id}/edit`} className="btn btn-outline-secondary">
                    <FiEdit2 />
                  </Link>
                  <button onClick={() => onDeleteInit(p)} className="btn btn-outline-danger">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}