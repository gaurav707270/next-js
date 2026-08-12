import React from "react";

export default function ProjectProgress({ progress = 0, height = "10px", showLabel = true }) {
    const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

    let barClass = "bg-primary";
    if (safeProgress === 100) barClass = "bg-success";
    else if (safeProgress < 25) barClass = "bg-danger";
    else if (safeProgress < 50) barClass = "bg-warning";

    return (
        <div>
            {showLabel && (
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted fw-semibold">Progress</span>
                    <span className="small fw-bold">{safeProgress}%</span>
                </div>
            )}
            <div className="progress" style={{ height }}>
                <div
                    className={`progress-bar ${barClass} progress-bar-striped progress-bar-animated`}
                    role="progressbar"
                    style={{ width: `${safeProgress}%` }}
                    aria-valuenow={safeProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
        </div>
    );
}