// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Etudiants from './pages/etudiants/Etudiants';
import Inscriptions from './pages/etudiants/Inscriptions';
import Ecoles from './pages/Ressources/Ecoles';
import Filieres from './pages/Ressources/Filieres';
import Specialites from './pages/Ressources/Specialites';
import Parcours from './pages/Ressources/Parcours';
import Niveaux from './pages/Ressources/Niveaux';
import Cycles from './pages/Ressources/Cycles';
import Pays from './pages/Ressources/Pays';
import AnneesAcademiques from './pages/Ressources/AnneesAcademiques';
import Decisions from './pages/Ressources/Decisions';
import Civilites from './pages/Ressources/Civilites';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes protégées — layout avec sidebar */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard"                     element={<Dashboard />} />
              <Route path="/etudiants"                     element={<Etudiants />} />
              <Route path="/inscriptions"                  element={<Inscriptions />} />
              <Route path="/ressources/ecoles"             element={<Ecoles />} />
              <Route path="/ressources/filieres"           element={<Filieres />} />
              <Route path="/ressources/specialites"        element={<Specialites />} />
              <Route path="/ressources/parcours"           element={<Parcours />} />
              <Route path="/ressources/niveaux"            element={<Niveaux />} />
              <Route path="/ressources/cycles"             element={<Cycles />} />
              <Route path="/ressources/pays"               element={<Pays />} />
              <Route path="/ressources/annees-academiques" element={<AnneesAcademiques />} />
              <Route path="/ressources/decisions"          element={<Decisions />} />
              <Route path="/ressources/civilites"          element={<Civilites />} />
            </Route>
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
