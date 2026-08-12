import React from "react";

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {message && <p className="text-muted mt-3 mb-0 fs-6">{message}</p>}
        </div>
    );
}