import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

const GROUPES: NavGroup[] = [
  {
    id: 'etudiants',
    label: 'Gestion Étudiant',
    icon: 'bi-mortarboard-fill',
    items: [
      { path: '/etudiants',    label: 'Étudiants',   icon: 'bi-people-fill' },
      { path: '/inscriptions', label: 'Inscriptions', icon: 'bi-clipboard-check-fill' },
    ],
  },
  {
    id: 'ressources',
    label: 'Ressources',
    icon: 'bi-folder-fill',
    items: [
      { path: '/ressources/ecoles',             label: 'Écoles',             icon: 'bi-building' },
      { path: '/ressources/filieres',           label: 'Filières',           icon: 'bi-diagram-3-fill' },
      { path: '/ressources/specialites',        label: 'Spécialités',        icon: 'bi-bookmark-star-fill' },
      { path: '/ressources/parcours',           label: 'Parcours',           icon: 'bi-map-fill' },
      { path: '/ressources/niveaux',            label: 'Niveaux',            icon: 'bi-bar-chart-steps' },
      { path: '/ressources/cycles',             label: 'Cycles',             icon: 'bi-arrow-repeat' },
      { path: '/ressources/pays',               label: 'Pays',               icon: 'bi-globe' },
      { path: '/ressources/annees-academiques', label: 'Années académiques', icon: 'bi-calendar-range-fill' },
      { path: '/ressources/decisions',          label: 'Décisions',          icon: 'bi-check2-circle' },
      { path: '/ressources/civilites',          label: 'Civilités',          icon: 'bi-person-badge-fill' },
    ],
  },
];

function hideOffcanvas() {
  const el = document.getElementById('sidebarMobile');
  if (!el) return;
  import('bootstrap').then(({ Offcanvas }) => {
    Offcanvas.getInstance(el)?.hide();
  });
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => location.pathname.startsWith(item.path));

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROUPES.map((g) => [g.id, isGroupActive(g)]))
  );

  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Link
        to="/dashboard"
        className={`sidebar-link${location.pathname === '/dashboard' ? ' active' : ''}`}
        style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}
        onClick={onNavigate}
      >
        <i className="bi bi-grid-1x2-fill"></i> Tableau de bord
      </Link>

      <hr className="sidebar-divider" />

      {GROUPES.map((groupe) => (
        <div key={groupe.id}>
          <p className="sidebar-section-title">{groupe.label}</p>

          <button
            className={`sidebar-toggle${open[groupe.id] ? ' open' : ''}`}
            onClick={() => toggle(groupe.id)}
          >
            <i className={`bi ${groupe.icon}`}></i>
            <span>{groupe.label}</span>
            <i className="bi bi-chevron-down chevron"></i>
          </button>

          {open[groupe.id] && (
            <div>
              {groupe.items.map((item) => {
                const actif = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar-link${actif ? ' active' : ''}`}
                    onClick={onNavigate}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div className="sidebar-footer">Gestion 2iE — 2025 / 2026</div>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar d-none d-md-flex flex-column">
        <div className="sidebar-brand"><img src="https://tse1.mm.bing.net/th/id/OIP.gtrWF2jcLg-pFz1GsbhoVwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
        alt="Dashboard Illustration" className="mt-0 ml-2" style={{marginRight:4, maxWidth: "60px", borderRadius: "60%", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"}} />
          Gestion 2iE
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile — offcanvas */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex={-1}
        id="sidebarMobile"
        aria-labelledby="sidebarMobileLabel"
        style={{ width: 260, background: '#1a1d23' }}
      >
        <div className="offcanvas-header" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <h5 className="offcanvas-title fw-bold text-white" id="sidebarMobileLabel">
            <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Gestion 2iE
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Fermer" />
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column" style={{ background: '#1a1d23' }}>
          <SidebarContent onNavigate={hideOffcanvas} />
        </div>
      </div>
    </>
  );
}
