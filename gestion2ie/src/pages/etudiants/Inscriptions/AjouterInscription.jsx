import { useEffect, useState } from "react";
import InscriptionService from "../../../service/InscriptionService";
import EtudiantService from "../../../service/EtudiantService";
import ParcoursService from "../../../service/ParcoursService";
import AnneeAcademiqueService from "../../../service/AnneeAcademiqueService";
import DecisionService from "../../../service/DecisionService";

const initialState = {
    etudiants_id: "",
    parcours_id: "",
    annee_academique_id: "",
    decisions_id: "",
    dateInscription: "",
};

function AjouterInscription({ showForm, setShowForm, onSuccess }) {
    const [values, setValues] = useState(initialState);
    const [etudiants, setEtudiants] = useState([]);
    const [parcours, setParcours] = useState([]);
    const [annees, setAnnees] = useState([]);
    const [decisions, setDecisions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        EtudiantService.getAll()
            .then((res) => setEtudiants(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
        ParcoursService.getAll()
            .then((res) => setParcours(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
        AnneeAcademiqueService.getAll()
            .then((res) => setAnnees(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
        DecisionService.getAll()
            .then((res) => setDecisions(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            if (!values.etudiants_id || !values.parcours_id || !values.annee_academique_id || !values.decisions_id) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            await InscriptionService.create({
                ...values,
                etudiants_id: Number(values.etudiants_id),
                parcours_id: Number(values.parcours_id),
                annee_academique_id: Number(values.annee_academique_id),
                decisions_id: Number(values.decisions_id),
            });
            setValues(initialState);
            if (onSuccess) onSuccess();
            else setShowForm(false);
        } catch (err) {
            setError(err.message || "Erreur lors de l'enregistrement.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card border-0 rounded-4 overflow-hidden"
            style={{
                background: "#ffffff",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
            }}>
            <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-4 d-flex align-items-center gap-2">
                    <i className="bi bi-plus-circle text-primary"></i>
                    Ajouter une inscription
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
                            <label htmlFor="etudiants_id" className="form-label fw-semibold small mb-2">
                                Étudiant <span className="text-danger">*</span>
                            </label>
                            <select 
                                className="form-select rounded-3 shadow-sm"
                                id="etudiants_id" 
                                name="etudiants_id" 
                                value={values.etudiants_id}
                                onChange={handleChange}
                                required>
                                <option value="">— Choisir —</option>
                                {etudiants.map((e) => (
                                    <option key={e.id} value={e.id}>{e.nom} {e.prenoms}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="parcours_id" className="form-label fw-semibold small mb-2">
                                Parcours <span className="text-danger">*</span>
                            </label>
                            <select 
                                className="form-select rounded-3 shadow-sm"
                                id="parcours_id" 
                                name="parcours_id" 
                                value={values.parcours_id}
                                onChange={handleChange}
                                required>
                                <option value="">— Choisir —</option>
                                {parcours.map((p) => (
                                    <option key={p.id} value={p.id}>{p.libelle}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="annee_academique_id" className="form-label fw-semibold small mb-2">
                                Année académique <span className="text-danger">*</span>
                            </label>
                            <select 
                                className="form-select rounded-3 shadow-sm"
                                id="annee_academique_id" 
                                name="annee_academique_id" 
                                value={values.annee_academique_id}
                                onChange={handleChange}
                                required>
                                <option value="">— Choisir —</option>
                                {annees.map((a) => (
                                    <option key={a.id} value={a.id}>{a.libelle}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="decisions_id" className="form-label fw-semibold small mb-2">
                                Décision <span className="text-danger">*</span>
                            </label>
                            <select 
                                className="form-select rounded-3 shadow-sm"
                                id="decisions_id" 
                                name="decisions_id" 
                                value={values.decisions_id}
                                onChange={handleChange}
                                required>
                                <option value="">— Choisir —</option>
                                {decisions.map((d) => (
                                    <option key={d.id} value={d.id}>{d.libelle}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="dateInscription" className="form-label fw-semibold small mb-2">
                                Date d'inscription <span className="text-danger">*</span>
                            </label>
                            <input 
                                type="date" 
                                className="form-control rounded-3 shadow-sm"
                                id="dateInscription" 
                                name="dateInscription" 
                                value={values.dateInscription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary rounded-3"
                            onClick={() => {
                                setShowForm(false);
                                setValues(initialState);
                                setError(null);
                            }}>
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary rounded-3"
                            disabled={submitting}>
                            <i className="bi bi-check-circle me-2"></i>
                            {submitting ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AjouterInscription;
