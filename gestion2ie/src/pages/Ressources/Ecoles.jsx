import AjouterEcoles from "./Ecoles/AjouterEcoles";
import TableEcoles from "./Ecoles/TableEcoles";
import { useState } from "react";

export default function Ecoles() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(k => k + 1);
    setShowForm(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px"    }}>
        <div><h2 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
           <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "30px",
              height: "30px",
              background: "rgba(37, 99, 235, 0.12)",
            }}>
            <i className="bi bi-building text-primary"></i>
          </div>
          Écoles</h2>
          <p className="text-muted mb-0">Gestion des écoles</p></div>
        <button className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`}
        onClick={() => setShowForm((s) => !s)}>
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>{showForm ? "Fermer" : "Nouvelle école"}
        </button>
      </div>
      {showForm && (
        <div className="card mb-4"> 
          <AjouterEcoles showForm={showForm} setShowForm={setShowForm} onSuccess={handleSuccess} />
        </div>
      )}
      <TableEcoles refreshKey={refreshKey} />
    </>
  );
}
