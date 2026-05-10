import { useState } from "react";
import AjouterEtudiant from "./AjouterEtudiant";
import ListeEtudiants from "./ListeEtudiants";
import Search from "../../components/Search";

export default function Etudiants() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "30px",
                height: "30px",
                background: "rgba(37, 99, 235, 0.12)",
              }}
            >
              <i className="bi bi-people-fill text-primary"></i>
            </div>
            Étudiants
          </h2>
          <p className="text-muted mb-0">Gestion des étudiants</p>
        </div>
        <button
          className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`}
          onClick={() => setShowForm((s) => !s)}
          aria-expanded={showForm}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
          {showForm ? "Fermer" : "Nouvel étudiant"}
        </button>
      </div>

      <div
        className={`overflow-hidden`}
        style={{
          maxHeight: showForm ? "2000px" : "0",
          opacity: showForm ? 1 : 0,
          transition: "max-height 0.5s ease, opacity 0.4s ease",
        }}
      >
        <AjouterEtudiant
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      </div>

      <Search onSearch={setSearchTerm} placeholder="Rechercher par nom ou prénom..." />

      <ListeEtudiants refreshKey={refreshKey} searchTerm={searchTerm} />
    </>
  );
}
