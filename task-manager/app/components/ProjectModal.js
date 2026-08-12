import React from "react";

export default function ProjectModal({ show, project, onClose, onConfirm, isDeleting }) {
  if (!show || !project) return null;

  return (
    <div className="modal fade show d-block tab-index-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold text-danger">Delete Project?</h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={isDeleting}></button>
          </div>
          <div className="modal-body py-0">
            <p className="mb-1">
              Are you sure you want to delete <strong>{project.name}</strong>?
            </p>
            <p className="text-muted small">This action cannot be undone and will permanently remove associated data.</p>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-light border" onClick={onClose} disabled={isDeleting}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}