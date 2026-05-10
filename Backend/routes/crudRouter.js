const express = require('express');
const pool = require('../db');


function crudRouter(table, columns) {
    const router = express.Router();
    const db = pool.promise();

    // GET /  -> liste
    router.get('/', async (_req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM \`${table}\``);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // GET /:id
    router.get('/:id', async (req, res) => {
        try {
            const [rows] = await db.query(
                `SELECT * FROM \`${table}\` WHERE id = ?`,
                [req.params.id]
            );
            if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // POST /
    router.post('/', async (req, res) => {
        try {
            const cols = columns.filter((c) => req.body[c] !== undefined);
            if (cols.length === 0) {
                return res.status(400).json({ error: 'Aucun champ valide.' });
            }
            const values = cols.map((c) => req.body[c]);
            const placeholders = cols.map(() => '?').join(', ');
            const sql = `INSERT INTO \`${table}\` (${cols
                .map((c) => `\`${c}\``)
                .join(', ')}) VALUES (${placeholders})`;
            const [result] = await db.query(sql, values);
            const [rows] = await db.query(
                `SELECT * FROM \`${table}\` WHERE id = ?`,
                [result.insertId]
            );
            res.status(201).json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // PUT /:id
    router.put('/:id', async (req, res) => {
        try {
            const cols = columns.filter((c) => req.body[c] !== undefined);
            if (cols.length === 0) {
                return res.status(400).json({ error: 'Aucun champ valide.' });
            }
            const setClause = cols.map((c) => `\`${c}\` = ?`).join(', ');
            const values = cols.map((c) => req.body[c]);
            values.push(req.params.id);
            await db.query(
                `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
                values
            );
            const [rows] = await db.query(
                `SELECT * FROM \`${table}\` WHERE id = ?`,
                [req.params.id]
            );
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // DELETE /:id
    router.delete('/:id', async (req, res) => {
        try {
            await db.query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
            res.status(204).end();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = crudRouter;
