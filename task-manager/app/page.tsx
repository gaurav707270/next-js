export default function Home() {
    return (
        <main className="min-vh-100 bg-light">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-5 text-center">

                                <h1 className="display-5 fw-bold mb-3">
                                    Task Manager App
                                </h1>

                                <p className="lead text-muted mb-4">
                                    Manage your projects and tasks efficiently
                                    with a simple and powerful task management
                                    application.
                                </p>

                                <div className="d-flex justify-content-center gap-3">
                                    <a
                                        href="/login"
                                        className="btn btn-primary px-4"
                                    >
                                        Login
                                    </a>

                                    <a
                                        href="/register"
                                        className="btn btn-outline-primary px-4"
                                    >
                                        Register
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}