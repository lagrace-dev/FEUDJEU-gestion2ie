import { useEffect, useMemo, useState } from "react";
import ListeSpecialites from "./Specialites/ListeSpecialites";
import SpecialiteService from "../../service/SpecialiteService";
import FiliereService from "../../service/FiliereService";

const initialState = { libelle: "", filieres_id: "", description: "" };

export default function Specialites() {
    const [showForm, setShowForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [values, setValues] = useState(initialState);
    const [filieres, setFilieres] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        FiliereService.getAll()
            .then((res) => setFilieres(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
    }, []);

    const filieresMap = useMemo(
        () => filieres.reduce((acc, f) => ({ ...acc, [f.id]: f.libelle }), {}),
        [filieres]
    );

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await SpecialiteService.create({
                ...values,
                filieres_id: Number(values.filieres_id),
            });
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
        <i className="bi bi-star text-primary"></i>
      </div>
      Spécialités
    </h2>
    <p className="text-muted mb-0">Gestion des spécialités</p>
  </div>
  <button 
    className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`}
    onClick={() => setShowForm((s) => !s)}
  >
    <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
    {showForm ? "Fermer" : "Nouvelle spécialité"}
  </button>
</div>

<div 
  className="card border-0 rounded-4 overflow-hidden mb-4"
  style={{
    background: "#ffffff",
    boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
  }}
>
  <div className={`collapse ${showForm ? "show" : ""}`}>
    <div className="card-body p-4">
      <h5 className="card-title fw-bold mb-4 d-flex align-items-center gap-2">
        <i className="bi bi-plus-circle text-primary"></i>
        Ajouter une spécialité
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
              placeholder="Nom de la spécialité" 
              required 
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="filieres_id" className="form-label fw-semibold small mb-2">
              Filière <span className="text-danger">*</span>
            </label>
            <select 
              className="form-select rounded-3 shadow-sm" 
              id="filieres_id" 
              name="filieres_id"
              value={values.filieres_id} 
              onChange={handleChange} 
              required
            >
              <option value="">-- Choisir la filère --</option>
              {filieres.map((f) => (
                <option key={f.id} value={f.id}>{f.libelle}</option>
              ))}
            </select>
          </div>

          <div className="col-md-12">
            <label htmlFor="description" className="form-label fw-semibold small mb-2">
              Description
            </label>
            <textarea 
              className="form-control rounded-3 shadow-sm" 
              id="description" 
              name="description" 
              rows="3"
              value={values.description} 
              onChange={handleChange} 
              placeholder="Description de la spécialité"
            />
          </div>

          <div className="d-flex gap-2 mt-4">
            <button 
              type="button" 
              className="btn btn-outline-secondary rounded-3"
              onClick={() => {
                setShowForm(false);
                setValues(initialState);
                setError(null);
              }}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn btn-primary rounded-3" 
              disabled={submitting}
            >
              <i className="bi bi-check-circle me-2"></i>
              {submitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<ListeSpecialites refreshKey={refreshKey} filieresMap={filieresMap} />
</>
    );
}
