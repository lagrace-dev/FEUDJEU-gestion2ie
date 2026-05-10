import { useState } from "react";

function Search({ onSearch, placeholder = "Rechercher..." }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className="mb-4">
            <div className="position-relative">
                <input
                    type="text"
                    className="form-control rounded-3 shadow-sm ps-4 pe-5"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleChange}
                    style={{
                        border: "1px solid #e2e8f0",
                        background: "#ffffff",
                        fontSize: "0.95rem",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#2563eb";
                        e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                    }}
                />
                <i
                    className="bi bi-search position-absolute"
                    style={{
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94a3b8",
                        pointerEvents: "none",
                    }}
                ></i>
                {searchTerm && (
                    <button
                        className="btn btn-link position-absolute"
                        style={{
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            padding: 0,
                            textDecoration: "none",
                        }}
                        onClick={handleClear}
                        title="Effacer"
                    >
                        <i className="bi bi-x-circle-fill" style={{ color: "#cbd5e1", fontSize: "1.2rem" }}></i>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Search;
