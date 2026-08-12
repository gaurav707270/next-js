"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiPlus, FiGrid, FiList, FiSearch } from "react-icons/fi";
import { getProjects, deleteProject } from "../../../services/projectApi";
import ProjectStats from "../components/ProjectStats";
import ProjectCard from "../components/ProjectCard";
import ProjectTable from "../components/ProjectTable";
import ProjectModal from "../components/ProjectModal";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Layout Controls
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Delete Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProject) return;
    setIsDeleting(true);
    try {
      await deleteProject(selectedProject._id);
      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id));
      setSelectedProject(null);
    } catch (err) {
      alert("Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const query = search.toLowerCase();
        const matchesSearch =
          project.name?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.manager?.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" || project.status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.startDate || 0) - new Date(a.startDate || 0);
        if (sortBy === "oldest") return new Date(a.startDate || 0) - new Date(b.startDate || 0);
        if (sortBy === "nameAsc") return (a.name || "").localeCompare(b.name || "");
        if (sortBy === "nameDesc") return (b.name || "").localeCompare(a.name || "");
        if (sortBy === "dueDate") return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        if (sortBy === "priority") {
          const rank = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (rank[b.priority] || 0) - (rank[a.priority] || 0);
        }
        return 0;
      });
  }, [projects, search, statusFilter, sortBy]);

  return (
    <div className="container-fluid py-4 px-md-5 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Projects</h2>
          <p className="text-muted mb-0">Manage, track, and collaborate on active projects.</p>
        </div>
        <Link href="/projects/create" className="btn btn-primary d-inline-flex align-items-center gap-2">
          <FiPlus size={18} /> Create Project
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Top Level Metrics */}
      <ProjectStats projects={projects} />

      {/* Filter and View Controls Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FiSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search projects or managers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="onHold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="nameAsc">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="col-12 col-md-2 d-flex justify-content-md-end">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid />
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${viewMode === "table" ? "active" : ""}`}
                  onClick={() => setViewMode("table")}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Render area */}
      {loading ? (
        <Loader message="Fetching projects..." />
      ) : filteredAndSortedProjects.length === 0 ? (
        <EmptyState
          title={search || statusFilter !== "all" ? "No Matching Results" : "No Projects Found"}
          message={
            search || statusFilter !== "all"
              ? "Try adjusting your search query or status filter criteria."
              : "You haven't created any projects yet."
          }
        />
      ) : viewMode === "grid" ? (
        <div className="row g-4">
          {filteredAndSortedProjects.map((project) => (
            <div key={project._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <ProjectCard project={project} onDeleteInit={(p) => setSelectedProject(p)} />
            </div>
          ))}
        </div>
      ) : (
        <ProjectTable projects={filteredAndSortedProjects} onDeleteInit={(p) => setSelectedProject(p)} />
      )}

      {/* Deletion Dialog */}
      <ProjectModal
        show={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}