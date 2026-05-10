import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

function Logout()  {
    export default function Layout() {
      const { user, logout } = useAuth();
      const navigate = useNavigate();
    
      const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
      };
      
      return (
        <div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>
            <span className="d-none d-sm-inline">Déconnexion</span>
          </button>
        </div>
      )
 }
