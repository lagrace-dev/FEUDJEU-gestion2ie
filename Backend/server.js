require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const crudRouter = require('./routes/crudRouter');
const etudiantsRoutes = require('./routes/etudiants');
const inscriptionsRoutes = require('./routes/inscriptions');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/pays', crudRouter('pays', ['libelle', 'nationalite', 'code', 'iso']));
app.use('/api/civilites', crudRouter('civilites', ['libelle', 'abreviation']));
app.use('/api/cycles', crudRouter('cycles', ['libelle', 'duree_annees']));
app.use('/api/decisions', crudRouter('decisions', ['libelle', 'description']));
app.use('/api/niveaux', crudRouter('niveaux', ['libelle', 'ordre']));
app.use('/api/filieres', crudRouter('filieres', ['code', 'libelle', 'description']));
app.use('/api/specialites',crudRouter('specialites', ['libelle', 'filieres_id', 'description']));
app.use('/api/parcours',crudRouter('parcours', ['libelle', 'specialites_id', 'niveaux_id', 'cycles_id']));
app.use('/api/annees-academiques',crudRouter('anneeacademiques', ['libelle', 'date_debut', 'date_fin', 'est_active']));
app.use('/api/ecoles',crudRouter('ecoles', ['libelle', 'adresse', 'telephone', 'email']));
app.use('/api/etudiants', etudiantsRoutes);
app.use('/api/inscriptions', inscriptionsRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
