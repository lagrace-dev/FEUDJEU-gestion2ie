import { useEffect, useState } from "react";
import EtudiantService from "../../service/EtudiantService";

function ListeEtudiants({ refreshKey, searchTerm = "" }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await EtudiantService.getAll();
            setItems(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError("Impossible de charger la liste des étudiants.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, [refreshKey]);

    // Filtrer les étudiants selon le terme de recherche
    const filteredItems = items.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.nom.toLowerCase().includes(searchLower) ||
            item.prenoms.toLowerCase().includes(searchLower)
        );
    });

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cet étudiant ?")) return;
        try {
            await EtudiantService.remove(id);
            fetchAll();
        } catch (err) { console.error(err); }
    };

    return (
  <div className="card border-0 rounded-4 overflow-hidden"
    style={{
      background: "#ffffff",
      boxShadow: "0 8px 30px rgba(15, 23, 42, 0.3)",
    }}>
    <div className="card-body p-4">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "45px",
                height: "45px",
                background: "rgba(37, 99, 235, 0.12)",
              }}>
              <i className="bi bi-people-fill text-primary"></i>
            </div>
            Liste des étudiants enregistrés
          </h4>
          <p className="text-muted mb-0 ms-1">Gestion des étudiants</p>
        </div>

        <div className="px-3 py-2 rounded-pill fw-semibold"
          style={{
            background: "rgba(37, 99, 235, 0.1)",
            color: "#2563eb",
            fontSize: "0.9rem",
          }}>
          {filteredItems.length} étudiant{filteredItems.length > 1 ? "s" : ""}
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted">Chargement des étudiants...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-3 d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center py-5">
          <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "90px",
              height: "90px",
              background: "#f1f5f9",
            }}>
            <i className="bi bi-people-fill fs-1 text-secondary"></i>
          </div>
          <h5 className="fw-bold text-dark">Aucun étudiant enregistré</h5>
          <p className="text-muted mb-0">Ajoutez un nouvel étudiant pour commencer.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
        <div className="text-center py-5">
          <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "90px",
              height: "90px",
              background: "#f1f5f9",
            }}>
            <i className="bi bi-search fs-1 text-secondary"></i>
          </div>
          <h5 className="fw-bold text-dark">Aucune correspondance</h5>
          <p className="text-muted mb-0">Aucun étudiant ne correspond à votre recherche "{searchTerm}".</p>
        </div>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle mb-0"
            style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
            <thead className="table-dark text-uppercase border-bottom-3 border-secondary">
              <tr>
                <th className="border-0 text-uppercase fw-semibold px-3 text-white" style={{ fontSize: "0.8rem" }}>Civilité</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Pays</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Nom</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Prénoms</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Date de naissance</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Email</th>
                <th className="border-0 text-uppercase fw-semibold text-white" style={{ fontSize: "0.8rem" }}>Téléphone</th>
                <th className="border-0 text-uppercase text-white fw-semibold text-end px-3" style={{ fontSize: "0.8rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((e) => (
                <tr key={e.id}
                  style={{ background: "#f8fafc", borderRadius: "16px", transition: "0.3s ease" }}
                  className="shadow-sm">
               <td className="border-0 px-3 py-3 fw-semibold text-dark"
                    style={{ borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }}>
                
                        <i className="bi bi-person-badge-fill text-primary mr-2"></i>
                    {e.civilite}
                  </td>
                  <td className="py-3">
                    <span className="badge text-secondary px-3 py-2 rounded-pill shadow-sm" style={{background: "rgba(251, 69, 32, 0.2)"}}>{e.pays}</span>
                  </td>
                  <td className="py-3">{e.nom}</td>
                  <td className="py-3">{e.prenoms}</td>
                  <td className="py-3">
                    <span className="badge text-dark px-3 py-2 rounded-pill shadow-sm" style={{background: "rgba(37, 235, 60, 0.36)"}}>{e.dateNaissance}</span>
                  </td>
                  <td className="py-3">{e.email}</td>
                  <td className="py-3">{e.telephone}</td>
                  <td className="text-end px-4 py-3">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3 shadow-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      <i className="bi bi-trash me-1"></i> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>

    );
}

export default ListeEtudiants;
