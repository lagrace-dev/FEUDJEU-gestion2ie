import { useState } from 'react';
import EcoleService from '../../../service/EcoleService';

const initialState = {
    libelle: "",
    adresse: "",
    telephone: "",
    email: ""
};

function AjouterEcoles({ showForm, setShowForm, onSuccess }) {
    const [values, setValues] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await EcoleService.create(values);
            setValues(initialState);
            if (onSuccess) onSuccess();
            else setShowForm(false);
        } catch (err) {
            setError("Erreur lors de l'enregistrement.");
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
                    Ajouter une école
                </h5>

                {error && (
                    <div className="alert alert-danger border-0 shadow-sm rounded-3 d-flex align-items-center mb-4">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                                placeholder="Nom de l'école"
                                required 
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-semibold small mb-2">
                                Email
                            </label>
                            <input 
                                type="email" 
                                className="form-control rounded-3 shadow-sm"
                                id="email" 
                                name="email" 
                                value={values.email}
                                onChange={handleChange} 
                                placeholder="contact@ecole.com"
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="adresse" className="form-label fw-semibold small mb-2">
                                Adresse
                            </label>
                            <input 
                                type="text" 
                                className="form-control rounded-3 shadow-sm"
                                id="adresse" 
                                name="adresse" 
                                value={values.adresse}
                                onChange={handleChange} 
                                placeholder="Adresse de l'établissement"
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telephone" className="form-label fw-semibold small mb-2">
                                Téléphone
                            </label>
                            <input 
                                type="tel" 
                                className="form-control rounded-3 shadow-sm"
                                id="telephone" 
                                name="telephone" 
                                value={values.telephone}
                                onChange={handleChange} 
                                placeholder="+226 XX XX XX XX"
                            />
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary rounded-3"
                            onClick={() => {
                                setShowForm(!showForm);
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

export default AjouterEcoles;