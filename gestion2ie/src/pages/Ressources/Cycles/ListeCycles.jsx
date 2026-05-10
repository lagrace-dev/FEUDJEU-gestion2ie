import { useEffect, useState } from "react";
import CycleService from "../../../service/CycleService";

function ListeCycles({ refreshKey }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CycleService.getAll();
            setItems(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError("Impossible de charger les cycles.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, [refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce cycle ?")) return;
        try {
            await CycleService.remove(id);
            fetchAll();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="card border-0 rounded-4 overflow-hidden" style={{
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.3)",
    }}
>
    <div className="card-body p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <div>
                <h4 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: "45px",
                            height: "45px",
                            background: "rgba(37, 99, 235, 0.12)",
                        }}>
                        <i className="bi bi-arrow-repeat text-primary"></i>
                    </div>

                    Liste des cycles
                </h4>

                <p className="text-muted mb-0 ms-1">
                    Consultez les cycles académiques enregistrés
                </p>
            </div>

            <div
                className="px-3 py-2 rounded-pill fw-semibold"
                style={{
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "#2563eb",
                    fontSize: "0.9rem",
                }}
            >
                {items.length} cycles
            </div>
        </div>

        {/* LOADING */}
        {loading && (
            <div className="text-center py-5">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                ></div>

                <p className="text-muted mb-0">
                    Chargement des cycles...
                </p>
            </div>
        )}

        {/* ERROR */}
        {error && (
            <div className="alert alert-danger border-0 rounded-4 shadow-sm">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
            </div>
        )}

        {/* EMPTY */}
        {!loading && !error && items.length === 0 && (
            <div className="text-center py-5">

                <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                        width: "90px",
                        height: "90px",
                        background: "#f1f5f9",
                    }}
                >
                    <i className="bi bi-arrow-repeat fs-1 text-secondary"></i>
                </div>

                <h5 className="fw-bold text-dark">
                    Aucun cycle enregistré
                </h5>

                <p className="text-muted mb-0">
                    Ajoutez un nouveau cycle pour commencer.
                </p>
            </div>
        )}

        {/* TABLE */}
        {!loading && !error && items.length > 0 && (
        <div className="table-responsive">

            <table className="table align-middle mb-0"
                    style={{borderCollapse: "separate",
                        borderSpacing: "0 12px",}}>
        <thead className="table-dark border-bottom-3 border-secondary">
            <tr>
             <th className="border-0 text-uppercase  fw-semibold px-3 text-white"
                 style={{ fontSize: "0.8rem" }}>Libellé
            </th>
            <th className="border-0 text-uppercase fw-semibold text-white"
                                style={{ fontSize: "0.8rem" }}> Durée
                            </th>
            <th  className="border-0 text-uppercase text-white fw-semibold text-end px-3"
                style={{ fontSize: "0.8rem" }}>Actions
            </th>
            </tr>
        </thead>
        <tbody>
        {items.map((c) => (<tr key={c.id} style={{background: "#f8fafc", borderRadius: "16px", transition: "0.3s ease",}}
        className="shadow-sm">
            <td className="border-0 px-3 py-3 fw-semibold text-dark"
                style={{borderTopLeftRadius: "16px",
                        borderBottomLeftRadius: "16px",}}>
            <div className="d-flex align-items-center gap-3">

            <div className="d-flex align-items-center justify-content-center rounded-3"
                style={{width: "42px",
                        height: "42px",
                        background:"linear-gradient(135deg, rgba(37,99,235,0.15), rgba(59,130,246,0.08))",}}>
            <i className="bi bi-mortarboard-fill text-primary"></i>
            </div>{c.libelle}
            </div>
            </td>
            <td className="border-0 py-3">
            <span className="px-3 py-2 rounded-pill fw-semibold"
                style={{background:"rgba(16, 185, 129, 0.12)",
                        color: "#059669",
                        fontSize: "0.9rem",}}>
                                        {c.duree_annees} ans
                                        </span>
                                </td>

                                {/* ACTION */}
                                <td
                                    className="border-0 text-end px-3 py-3"
                                    style={{
                                        borderTopRightRadius: "16px",
                                        borderBottomRightRadius: "16px",
                                    }}
                                >
                                    <button
                                        className="btn btn-sm rounded-pill px-3"
                                        style={{
                                            border: "1px solid rgba(239,68,68,0.3)",
                                            color: "#ef4444",
                                            background: "#fff",
                                            transition: "0.3s",
                                        }}
                                        onClick={() => handleDelete(c.id)}
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        Supprimer
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

export default ListeCycles;
