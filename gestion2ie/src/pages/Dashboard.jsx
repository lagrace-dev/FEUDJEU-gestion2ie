// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import EtudiantService from '../service/EtudiantService';
import ParcoursService from '../service/ParcoursService';
import EcoleService from '../service/EcoleService';
import SpecialiteService from '../service/SpecialiteService';
import CycleService from '../service/CycleService';
import NiveauService from '../service/NiveauService';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    etudiants: null,
    parcours: null,
    ecoles: null,
    specialites: null,
    cycles: null,
    niveaux: null,
  });

  useEffect(() => {
    EtudiantService.getAll().then(res => setStats(s => ({ ...s, etudiants: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
    ParcoursService.getAll().then(res => setStats(s => ({ ...s, parcours: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
    EcoleService.getAll().then(res => setStats(s => ({ ...s, ecoles: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
    SpecialiteService.getAll().then(res => setStats(s => ({ ...s, specialites: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
    CycleService.getAll().then(res => setStats(s => ({ ...s, cycles: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
    NiveauService.getAll().then(res => setStats(s => ({ ...s, niveaux: Array.isArray(res.data) ? res.data.length : 0 }))).catch(console.error);
  }, []);

  const cards = [
    { title: "Étudiants",          statKey: "etudiants",         icon: "bi-people-fill",          bgColor: "bg-primary",  path: "/etudiants" },
    { title: "Inscriptions",        statKey: "etudiants",         icon: "bi-clipboard-check-fill", bgColor: "bg-success",  path: "/etudiants/inscriptions" },
    { title: "Écoles",              statKey: "ecoles",            icon: "bi-building",             bgColor: "bg-warning",  path: "/ressources/ecoles" },
    { title: "Parcours",            statKey: "parcours",          icon: "bi-road",                 bgColor: "bg-primary",  path: "/ressources/parcours" },
    { title: "Spécialités",         statKey: "specialites",       icon: "bi-star",                 bgColor: "bg-success",  path: "/ressources/specialites" },
    { title: "Cycles",              statKey: "cycles",            icon: "bi-clock",                bgColor: "bg-info",     path: "/ressources/cycles" },
    { title: "Niveaux",             statKey: "niveaux",           icon: "bi-bar-chart",            bgColor: "bg-warning",  path: "/ressources/niveaux" },
  ];

  return (
    <>
      <div className="mt-0 mb-4 d-flex flex-column align-items-center gap-2 flex-wrap">
        <h1 className="fw-bold mb-1" style={{ padding: "10px", borderRadius: "8px",
          WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(45deg, #2563eb, #9333ea)", backgroundClip: "text", WebkitBackgroundClip: "text" }}>
        Tableau de bord
          </h1> 
          <img src="https://tse1.mm.bing.net/th/id/OIP.gtrWF2jcLg-pFz1GsbhoVwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
        alt="Dashboard Illustration" className="mt-0 ml-2" style={{ maxWidth: "90px", borderRadius: "50%", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"}} />

        <p className=" mb-0" style={{ fontSize: "1.1rem", color: "#3e71d7" }}>
          Bienvenue, <strong >{user?.nom} 2IE</strong> !
        </p>
      </div>

      <div className="row g-4">
        {cards.map((card, index) => {
          const count = stats[card.statKey];
          const isLoading = count === null;

          return (
            <div key={index} className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100"
                onClick={() => navigate(card.path)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(15, 23, 42, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="card-body d-flex align-items-center gap-3">
                  {/* Icône */}
                  <div className={`${card.bgColor} bg-opacity-10 rounded-3 p-3`}>
                    <i className={`bi ${card.icon} ${card.bgColor.replace('bg-', 'text-')} fs-3`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted mb-1 small">{card.title}</p>
                    {isLoading ? (
                      <div
                        className="placeholder-glow"
                        style={{ width: 60 }}
                      >
                        <span className="placeholder col-12 rounded" style={{ height: 28 }}></span>
                      </div>
                    ) : (
                      <h4 className="mb-0 fw-bold">{count}</h4>
                    )}
                  </div>

                  {/* Flèche */}
                  <i className="bi bi-arrow-right text-muted fs-5"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}