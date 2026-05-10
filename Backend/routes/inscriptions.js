const express = require('express');
const pool = require('../db');

const router = express.Router();
const db = pool.promise();

// GET all with JOINs
router.get('/', async (_req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                i.id,
                i.dateInscription,
                i.etudiants_id,
                i.parcours_id,
                i.annee_academique_id,
                i.decisions_id,
                CONCAT(e.nom, ' ', e.prenoms) as etudiant,
                p.libelle as parcours,
                a.libelle as annee,
                d.libelle as decision
            FROM inscriptions i
            LEFT JOIN etudiants e ON i.etudiants_id = e.id
            LEFT JOIN parcours p ON i.parcours_id = p.id
            LEFT JOIN anneeacademiques a ON i.annee_academique_id = a.id
            LEFT JOIN decisions d ON i.decisions_id = d.id
            ORDER BY i.dateInscription DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// GET by ID with JOINs
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                i.id,
                i.dateInscription,
                i.etudiants_id,
                i.parcours_id,
                i.annee_academique_id,
                i.decisions_id,
                CONCAT(e.nom, ' ', e.prenoms) as etudiant,
                p.libelle as parcours,
                a.libelle as annee,
                d.libelle as decision
            FROM inscriptions i
            LEFT JOIN etudiants e ON i.etudiants_id = e.id
            LEFT JOIN parcours p ON i.parcours_id = p.id
            LEFT JOIN anneeacademiques a ON i.annee_academique_id = a.id
            LEFT JOIN decisions d ON i.decisions_id = d.id
            WHERE i.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { etudiants_id, parcours_id, annee_academique_id, decisions_id, dateInscription } = req.body;
        const [result] = await db.query(
            `INSERT INTO inscriptions (etudiants_id, parcours_id, annee_academique_id, decisions_id, dateInscription) 
             VALUES (?, ?, ?, ?, ?)`,
            [etudiants_id, parcours_id, annee_academique_id, decisions_id, dateInscription]
        );
        const [rows] = await db.query(`
            SELECT 
                i.id,
                i.dateInscription,
                i.etudiants_id,
                i.parcours_id,
                i.annee_academique_id,
                i.decisions_id,
                CONCAT(e.nom, ' ', e.prenoms) as etudiant,
                p.libelle as parcours,
                a.libelle as annee,
                d.libelle as decision
            FROM inscriptions i
            LEFT JOIN etudiants e ON i.etudiants_id = e.id
            LEFT JOIN parcours p ON i.parcours_id = p.id
            LEFT JOIN anneeacademiques a ON i.annee_academique_id = a.id
            LEFT JOIN decisions d ON i.decisions_id = d.id
            WHERE i.id = ?
        `, [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { etudiants_id, parcours_id, annee_academique_id, decisions_id, dateInscription } = req.body;
        await db.query(
            `UPDATE inscriptions SET etudiants_id=?, parcours_id=?, annee_academique_id=?, decisions_id=?, dateInscription=? WHERE id=?`,
            [etudiants_id, parcours_id, annee_academique_id, decisions_id, dateInscription, req.params.id]
        );
        const [rows] = await db.query(`
            SELECT 
                i.id,
                i.dateInscription,
                i.etudiants_id,
                i.parcours_id,
                i.annee_academique_id,
                i.decisions_id,
                CONCAT(e.nom, ' ', e.prenoms) as etudiant,
                p.libelle as parcours,
                a.libelle as annee,
                d.libelle as decision
            FROM inscriptions i
            LEFT JOIN etudiants e ON i.etudiants_id = e.id
            LEFT JOIN parcours p ON i.parcours_id = p.id
            LEFT JOIN anneeacademiques a ON i.annee_academique_id = a.id
            LEFT JOIN decisions d ON i.decisions_id = d.id
            WHERE i.id = ?
        `, [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM inscriptions WHERE id = ?', [req.params.id]);
        res.json({ message: 'Inscription supprimée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
