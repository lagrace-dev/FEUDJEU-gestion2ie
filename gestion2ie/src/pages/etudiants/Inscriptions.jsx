import { useState } from "react";
import AjouterInscription from "./Inscriptions/AjouterInscription";
import ListeInscriptions from "./Inscriptions/ListeInscriptions";

export default function Inscriptions() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(k => k + 1);
    setShowForm(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px"    }}>
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
              <i className="bi bi-person-plus text-primary"></i>
            </div>
            Inscriptions</h2>
          <p className="text-muted mb-0">Gestion des inscriptions</p>
        </div>
        <button className={`btn ${showForm ? "btn-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`} onClick={() => setShowForm(!showForm)}>
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
          {showForm ? "Fermer" : "Nouvelle inscription"}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <AjouterInscription showForm={showForm} setShowForm={setShowForm} onSuccess={handleSuccess} />
        </div>
      )}

      <ListeInscriptions refreshKey={refreshKey} />
    </>
  );
}
