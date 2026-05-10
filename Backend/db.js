const mysql = require("mysql2");

// ── Connexion à la base de données MySQL ──────────────────────────────────────
const db = mysql.createConnection({
    host:     process.env.DB_HOST || "localhost",
    user:     process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "gestion2ie",
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion MySQL :", err.message);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

module.exports = db;
