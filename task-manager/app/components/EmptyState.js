import React from "react";
import Link from "next/link";
import { FiFolderPlus, FiInbox } from "react-icons/fi";

export default function EmptyState({
  title = "No Projects Found",
  message = "You haven't created any projects yet.",
  showActionButton = true,
}) {
  return (
    <div className="text-center py-5 border rounded bg-white shadow-sm p-4">
      <div className="mb-3 text-muted">
        <FiInbox size={48} />
      </div>
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted mb-4">{message}</p>
      {showActionButton && (
        <Link href="/projects/create" className="btn btn-primary d-inline-flex align-items-center gap-2">
          <FiFolderPlus /> Create Project
        </Link>
      )}
    </div>
  );
}