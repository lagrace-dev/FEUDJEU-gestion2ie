import { useEffect, useState } from "react";
import InscriptionService from "../../../service/InscriptionService";


function ListeInscriptions({ refreshKey }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await InscriptionService.getAll();
            setItems(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError("Impossible de charger les inscriptions.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, [refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cette inscription ?")) return;
        try {
            await InscriptionService.remove(id);
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
                                <i className="bi bi-clipboard-check text-primary"></i>
                            </div>
                            Liste des inscriptions
                        </h4>
                        <p className="text-muted mb-0 ms-1">
                            Gestion des inscriptions étudiantes
                        </p>
                    </div>

                    <div className="px-3 py-2 rounded-pill fw-semibold"
                        style={{
                            background: "rgba(37, 99, 235, 0.1)",
                            color: "#2563eb",
                            fontSize: "0.9rem",
                        }}>
                        {items.length} inscription{items.length > 1 ? "s" : ""}
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="text-muted">Chargement des inscriptions...</p>
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
                            <i className="bi bi-clipboard-check fs-1 text-secondary"></i>
                        </div>
                        <h5 className="fw-bold text-dark">Aucune inscription enregistrée</h5>
                        <p className="text-muted mb-0">Ajoutez une nouvelle inscription pour commencer.</p>
                    </div>
                )}

                {!loading && !error && items.length > 0 && (
                    <div className="table-responsive">
                        <table className="table align-middle mb-0"
                            style={{
                                borderCollapse: "separate",
                                borderSpacing: "0 12px",
                            }}>
                            <thead className="table-dark text-uppercase">
                                <tr>
                                    <th className="border-0 text-uppercase fw-semibold px-3 text-white"
                                        style={{ fontSize: "0.8rem" }}>
                                        Étudiant
                                    </th>
                                    <th className="border-0 text-uppercase fw-semibold text-white"
                                        style={{ fontSize: "0.8rem" }}>
                                        Parcours
                                    </th>
                                    <th className="border-0 text-uppercase fw-semibold text-white"
                                        style={{ fontSize: "0.8rem" }}>
                                        Année
                                    </th>
                                    <th className="border-0 text-uppercase fw-semibold text-white"
                                        style={{ fontSize: "0.8rem" }}>
                                        Décision
                                    </th>
                                    <th className="border-0 text-uppercase fw-semibold text-white"
                                        style={{ fontSize: "0.8rem" }}>
                                        Date
                                    </th>
                                    <th className="border-0 text-uppercase text-white fw-semibold text-end px-3"
                                        style={{ fontSize: "0.8rem" }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((i) => (
                                    <tr key={i.id} style={{
                                        background: "#f8fafc",
                                        borderRadius: "16px",
                                        transition: "0.3s ease",
                                    }}
                                        className="shadow-sm">
                                        <td className="border-0 px-3 py-3 fw-semibold text-dark"
                                            style={{
                                                borderTopLeftRadius: "16px",
                                                borderBottomLeftRadius: "16px",
                                            }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-3"
                                                    style={{
                                                        width: "42px",
                                                        height: "42px",
                                                        background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(59,130,246,0.08))",
                                                    }}>
                                                    <i className="bi bi-person-fill text-primary"></i>
                                                </div>
                                                {i.etudiant}
                                            </div>
                                        </td>
                                        <td className="border-0 py-3">
                                            <span className="px-3 py-2 rounded-pill fw-semibold"
                                                style={{
                                                    background: "rgba(59, 130, 246, 0.12)",
                                                    color: "#1e40af",
                                                    fontSize: "0.9rem",
                                                }}>
                                                {i.parcours || "-"}
                                            </span>
                                        </td>
                                        <td className="border-0 py-3">
                                            <span className="badge px-3 py-2 rounded-pill shadow-sm"
                                                style={{
                                                    background: "rgba(100, 116, 139, 0.1)",
                                                    color: "#475569",
                                                }}>
                                                {i.annee || "-"}
                                            </span>
                                        </td>
                                        <td className="border-0 py-3">
                                            <span className="badge px-3 py-2 rounded-pill shadow-sm"
                                                style={{
                                                    background: "rgba(16, 185, 129, 0.12)",
                                                    color: "#059669",
                                                }}>
                                                {i.decision || "-"}
                                            </span>
                                        </td>
                                        <td className="border-0 py-3">
                                            <span className="text-muted small">
                                                {i.dateInscription ? new Date(i.dateInscription).toLocaleDateString() : "-"}
                                            </span>
                                        </td>
                                        <td className="border-0 text-end px-4 py-3"
                                            style={{
                                                borderTopRightRadius: "16px",
                                                borderBottomRightRadius: "16px",
                                            }}>
                                            <button
                                                className="btn btn-sm btn-outline-danger rounded-pill px-3 shadow-sm"
                                                onClick={() => handleDelete(i.id)}
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

export default ListeInscriptions;
