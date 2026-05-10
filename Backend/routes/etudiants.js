const express = require('express');
const pool = require('../db');

const router = express.Router();
const db = pool.promise();

const COLUMNS = [
    'nom',
    'prenoms',
    'pays_id',
    'civilites_id',
    'dateNaissance',
    'email',
    'telephone',
];

const SELECT_WITH_JOINS = `
    SELECT e.*,
           p.libelle  AS pays,
           c.libelle  AS civilite
    FROM etudiants e
    LEFT JOIN pays      p ON p.id = e.pays_id
    LEFT JOIN civilites c ON c.id = e.civilites_id
`;

router.get('/', async (_req, res) => {
    try {
        const [rows] = await db.query(SELECT_WITH_JOINS);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`${SELECT_WITH_JOINS} WHERE e.id = ?`, [
            req.params.id,
        ]);
        if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cols = COLUMNS.filter((c) => req.body[c] !== undefined);
        if (cols.length === 0) return res.status(400).json({ error: 'Aucun champ valide.' });
        const values = cols.map((c) => req.body[c]);
        const sql = `INSERT INTO etudiants (${cols
            .map((c) => `\`${c}\``)
            .join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`;
        const [result] = await db.query(sql, values);
        const [rows] = await db.query(`${SELECT_WITH_JOINS} WHERE e.id = ?`, [
            result.insertId,
        ]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const cols = COLUMNS.filter((c) => req.body[c] !== undefined);
        if (cols.length === 0) return res.status(400).json({ error: 'Aucun champ valide.' });
        const setClause = cols.map((c) => `\`${c}\` = ?`).join(', ');
        const values = cols.map((c) => req.body[c]);
        values.push(req.params.id);
        await db.query(`UPDATE etudiants SET ${setClause} WHERE id = ?`, values);
        const [rows] = await db.query(`${SELECT_WITH_JOINS} WHERE e.id = ?`, [
            req.params.id,
        ]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query(`DELETE FROM etudiants WHERE id = ?`, [req.params.id]);
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
