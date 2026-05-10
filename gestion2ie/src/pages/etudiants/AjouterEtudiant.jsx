import { useEffect, useState } from "react";
import EtudiantService from "../../service/EtudiantService";
import PaysService from "../../service/PaysService";
import CiviliteService from "../../service/CiviliteService";

const initialState = {
    nom: "",
    prenoms: "",
    pays_id: "",
    civilites_id: "",
    dateNaissance: "",
    email: "",
    telephone: "",
};

function AjouterEtudiant({ onSuccess, onCancel }) {
    const [etudiant, setEtudiant] = useState(initialState);
    const [pays, setPays] = useState([]);
    const [civilites, setCivilites] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        PaysService.getAll()
            .then((res) => setPays(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
        CiviliteService.getAll()
            .then((res) => setCivilites(Array.isArray(res.data) ? res.data : []))
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            if (!etudiant.civilites_id || !etudiant.pays_id) {
                throw new Error("Veuillez sélectionner la civilité et le pays.");
            }
            await EtudiantService.create({
                ...etudiant,
                pays_id: Number(etudiant.pays_id),
                civilites_id: Number(etudiant.civilites_id),
            });
            setEtudiant(initialState);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || "Erreur lors de l'enregistrement de l'étudiant.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
  <div className="card-body p-0">

    <div className="d-flex align-items-center gap-3 px-4 py-3 border-bottom">
      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
        <i className="bi bi-person-plus fs-5 text-primary"></i>
      </div>
      <div>
        <h6 className="mb-0 fw-semibold">Nouvel étudiant</h6>
        <small className="text-muted">Remplissez les informations ci-dessous</small>
      </div>
    </div>

    <div className="p-4">
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit} style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.2)", padding: "20px", borderRadius: "8px" }}>

        {/* Section Identité */}
        <p className="text-uppercase text-muted fw-semibold mb-3" style={{ fontSize: 11, letterSpacing: "0.06em" }}>Identité</p>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label htmlFor="civilites_id" className="form-label small text-muted mb-1">Civilité</label>
            <select className="form-select form-select-sm" id="civilites_id" name="civilites_id"
              value={etudiant.civilites_id} onChange={handleChange} required>
              <option value="">— Choisir —</option>
              {civilites.map((c) => (
                <option key={c.id} value={c.id}>{c.libelle}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="nom" className="form-label small text-muted mb-1">Nom <span className="text-danger">*</span></label>
            <input type="text" className="form-control form-control-sm" id="nom" name="nom"
              value={etudiant.nom} onChange={handleChange} placeholder="Dupont" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="prenoms" className="form-label small text-muted mb-1">Prénoms <span className="text-danger">*</span></label>
            <input type="text" className="form-control form-control-sm" id="prenoms" name="prenoms"
              value={etudiant.prenoms} onChange={handleChange} placeholder="Jean Paul" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="dateNaissance" className="form-label small text-muted mb-1">Date de naissance</label>
            <input type="date" className="form-control form-control-sm" id="dateNaissance" name="dateNaissance"
              value={etudiant.dateNaissance} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="pays_id" className="form-label small text-muted mb-1">Pays <span className="text-danger">*</span></label>
            <select className="form-select form-select-sm" id="pays_id" name="pays_id"
              value={etudiant.pays_id} onChange={handleChange} required>
              <option value="">— Choisir —</option>
              {pays.map((p) => (
                <option key={p.id} value={p.id}>{p.libelle}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Section Contact */}
        <p className="text-uppercase text-muted fw-semibold mb-3 pt-3 border-top" style={{ fontSize: 11, letterSpacing: "0.06em" }}>Contact</p>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label small text-muted mb-1">
              <i className="ti ti-mail me-1"></i>Email
            </label>
            <input type="email" className="form-control form-control-sm" id="email" name="email"
              value={etudiant.email} onChange={handleChange} placeholder="jean@exemple.com" />
          </div>
          <div className="col-md-6">
            <label htmlFor="telephone" className="form-label small text-muted mb-1">
              <i className="ti ti-phone me-1"></i>Téléphone
            </label>
            <input type="tel" className="form-control form-control-sm" id="telephone" name="telephone"
              value={etudiant.telephone} onChange={handleChange} placeholder="+226 XX XX XX XX" />
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center justify-content-between pt-3 border-top">
          <small className="text-muted"><span className="text-danger">*</span> champs obligatoires</small>
          <div className="d-flex gap-2">
            {onCancel && (
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>
                Annuler
              </button>
            )}
            <button type="submit" className="btn btn-sm btn-primary d-flex align-items-center gap-1" disabled={submitting}>
              <i className="ti ti-device-floppy"></i>
              {submitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</div>
    );
}

export default AjouterEtudiant;
