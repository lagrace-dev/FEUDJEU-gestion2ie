import { useState } from "react";
import ListePays from "./Pays/ListePays";
import PaysService from "../../service/PaysService";

const initialState = { libelle: "", nationalite: "", code: "", iso: "" };

export default function Pays() {
    const [showForm, setShowForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [values, setValues] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await PaysService.create(values);
            setValues(initialState);
            setShowForm(false);
            setRefreshKey((k) => k + 1);
        } catch (err) {
            setError("Erreur lors de l'enregistrement.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
  <>
    <div className="d-flex justify-content-between align-items-center mb-4" style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px"    }}>
      <div>
        <h2 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "30px",
              height: "30px",
              background: "rgba(37, 99, 235, 0.12)",
            }}
          >
            <i className="bi bi-flag text-primary"></i>
          </div>
          🌍Pays
        </h2>
        <p className="text-muted mb-0">Gestion des pays</p>
      </div>
      <button 
        className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`}
        onClick={() => setShowForm((s) => !s)}
      >
        <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
        {showForm ? "Fermer" : "Nouveau pays"}
      </button>
    </div>

    <div className="card border-0 rounded-4 overflow-hidden mb-4"
      style={{
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
      }}>
      <div className={`collapse ${showForm ? "show" : ""}`}>
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-4 d-flex align-items-center gap-2">
            <i className="bi bi-flag text-primary"></i>
            Ajouter un pays
          </h5>

          {error && (
            <div className="alert alert-danger border-0 shadow-sm rounded-3 d-flex align-items-center mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px" }}>
            <div className="row g-4">
              <div className="col-md-6">
                <label htmlFor="libelle" className="form-label fw-semibold small mb-2">
                  Libellé <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-control rounded-3 shadow-sm" 
                  id="libelle" 
                  name="libelle"
                  value={values.libelle}
                  onChange={handleChange}
                  required
                  placeholder="Nom du pays"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="nationalite" className="form-label fw-semibold small mb-2">
                  Nationalité
                </label>
                <input 
                  type="text" 
                  className="form-control rounded-3 shadow-sm" 
                  id="nationalite" 
                  name="nationalite"
                  value={values.nationalite}
                  onChange={handleChange}
                  placeholder="Nationalité"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="code" className="form-label fw-semibold small mb-2">
                  Code
                </label>
                <input 
                  type="text" 
                  className="form-control rounded-3 shadow-sm" 
                  id="code" 
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  placeholder="Code du pays"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="iso" className="form-label fw-semibold small mb-2">
                  ISO
                </label>
                <input 
                  type="text" 
                  className="form-control rounded-3 shadow-sm" 
                  id="iso" 
                  name="iso"
                  value={values.iso}
                  onChange={handleChange}
                  placeholder="Code ISO"
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button 
                type="submit" 
                className="btn btn-primary rounded-3" 
                disabled={submitting}
              >
                <i className="bi bi-check-circle me-2"></i>
                {submitting ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary rounded-3"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-circle me-2"></i>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

            <ListePays refreshKey={refreshKey} />
        </>
    );
}
