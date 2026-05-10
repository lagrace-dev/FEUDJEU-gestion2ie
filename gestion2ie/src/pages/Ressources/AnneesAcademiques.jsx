import { useState } from "react";
import ListeAnneesAcademiques from "./AnneesAcademiques/ListeAnneesAcademiques";
import AnneeAcademiqueService from "../../service/AnneeAcademiqueService";

const initialState = { libelle: "", date_debut: "", date_fin: "", est_active: "0" };

export default function AnneesAcademiques() {
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
            await AnneeAcademiqueService.create({
                ...values,
                est_active: values.est_active === "1" ? 1 : 0,
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
            <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4" 
            style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)" }}>
                <div>
                    <h2 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
                         <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "45px",
              height: "45px",
              background: "rgba(37, 99, 235, 0.12)",
            }}
          >
            <i className="bi bi-calendar text-primary"></i>
          </div>
                        Années académiques</h2>
                    <p className="text-muted mb-1 ml-50">Gestion des années académiques</p>
                </div>
                <button className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 py-2 rounded-pill shadow-sm`} onClick={() => setShowForm((s) => !s)}>
                    <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
                    {showForm ? "Fermer" : "Nouvelle année"}
                </button>
            </div>

            <div className="overflow-hidden" style={{
                maxHeight: showForm ? "2000px" : "0",
                opacity: showForm ? 1 : 0,
                transition: "max-height 0.5s ease, opacity 0.4s ease",
            }}>
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title fw-bold mb-3">Nouvelle année académique</h5>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit} style={{boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px"}}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="libelle" className="form-label">Libellé</label>
                                    <input type="text" className="form-control" id="libelle" name="libelle"
                                        placeholder="ex: 2025-2026"
                                        value={values.libelle} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="date_debut" className="form-label">Date de début</label>
                                    <input type="date" className="form-control" id="date_debut" name="date_debut"
                                        value={values.date_debut} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="date_fin" className="form-label">Date de fin</label>
                                    <input type="date" className="form-control" id="date_fin" name="date_fin"
                                        value={values.date_fin} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="est_active" className="form-label">Active</label>
                                    <select className="form-select" id="est_active" name="est_active"
                                        value={values.est_active} onChange={handleChange}>
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? "Enregistrement..." : "Enregistrer"}
                                </button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ListeAnneesAcademiques refreshKey={refreshKey} />
        </>
    );
}
