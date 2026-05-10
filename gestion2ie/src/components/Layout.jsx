// src/components/Layout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top navbar 
      <nav className="navbar navbar-dark bg-dark px-3 sticky-top shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <button
            className="navbar-toggler border-0 d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMobile"
            aria-controls="sidebarMobile"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand fw-bold mb-0">
            <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Gestion 2iE
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white d-none d-sm-inline">
            <i className="bi bi-person-circle me-1"></i>{user?.nom}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>
            <span className="d-none d-sm-inline">Déconnexion</span>
          </button>
        </div>
      </nav>
      */}
      {/* Sidebar + main content */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow-1 overflow-auto bg-light p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
