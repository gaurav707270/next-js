import React, { useState, useEffect } from "react";
import Link from "next/link";

export const getStatusBadge = (status) => {
  const map = {
    planning: "bg-secondary",
    active: "bg-primary",
    onHold: "bg-warning text-dark",
    completed: "bg-success",
    cancelled: "bg-danger",
  };
  return map[status] || "bg-secondary";
};

export const getPriorityBadge = (priority) => {
  const map = {
    low: "bg-secondary",
    medium: "bg-info text-dark",
    high: "bg-warning text-dark",
    urgent: "bg-danger",
  };
  return map[priority] || "bg-secondary";
};

export default function ProjectForm({ initialData = null, onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    teamMembers: 1,
    status: "planning",
    priority: "medium",
    startDate: "",
    dueDate: "",
    budget: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        manager: initialData.manager || "",
        teamMembers: initialData.teamMembers || 1,
        status: initialData.status || "planning",
        priority: initialData.priority || "medium",
        startDate: initialData.startDate ? initialData.startDate.split("T")[0] : "",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
        budget: initialData.budget || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";
    if (formData.startDate && formData.dueDate && formData.dueDate < formData.startDate) {
      newErrors.dueDate = "Due date cannot be before start date.";
    }
    if (!formData.status) newErrors.status = "Status is required.";
    if (!formData.priority) newErrors.priority = "Priority is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-4">{initialData ? "Edit Project" : "Create New Project"}</h4>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold">Project Name *</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Description *</label>
              <textarea
                name="description"
                rows="3"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                placeholder="Brief project details..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Project Manager</label>
              <input
                type="text"
                name="manager"
                className="form-control"
                placeholder="Manager name"
                value={formData.manager}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Team Members (Count)</label>
              <input
                type="number"
                name="teamMembers"
                min="1"
                className="form-control"
                value={formData.teamMembers}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Status *</label>
              <select
                name="status"
                className={`form-select ${errors.status ? "is-invalid" : ""}`}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="onHold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Priority *</label>
              <select
                name="priority"
                className={`form-select ${errors.priority ? "is-invalid" : ""}`}
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Start Date *</label>
              <input
                type="date"
                name="startDate"
                className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Due Date *</label>
              <input
                type="date"
                name="dueDate"
                className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
                value={formData.dueDate}
                onChange={handleChange}
              />
              {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Budget ($)</label>
              <input
                type="number"
                name="budget"
                className="form-control"
                placeholder="e.g. 5000"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href="/projects" className="btn btn-light border">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}