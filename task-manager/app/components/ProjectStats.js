import React from "react";
import { FiFolder, FiActivity, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function ProjectStats({ projects = [] }) {
    const total = projects.length;
    const active = projects.filter((p) => p.status === "active").length;
    const completed = projects.filter((p) => p.status === "completed").length;

    const today = new Date().toISOString().split("T")[0];
    const overdue = projects.filter(
        (p) => p.dueDate && p.dueDate < today && p.status !== "completed"
    ).length;

    const stats = [
        { title: "Total Projects", count: total, icon: <FiFolder className="text-primary" size={24} />, bg: "bg-primary-subtle" },
        { title: "Active Projects", count: active, icon: <FiActivity className="text-info" size={24} />, bg: "bg-info-subtle" },
        { title: "Completed Projects", count: completed, icon: <FiCheckCircle className="text-success" size={24} />, bg: "bg-success-subtle" },
        { title: "Overdue Projects", count: overdue, icon: <FiAlertCircle className="text-danger" size={24} />, bg: "bg-danger-subtle" },
    ];

    return (
        <div className="row g-3 mb-4">
            {stats.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <p className="text-muted small mb-1 fw-medium">{item.title}</p>
                                <h3 className="fw-bold mb-0">{item.count}</h3>
                            </div>
                            <div className={`p-3 rounded-circle ${item.bg}`}>
                                {item.icon}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}