/**
 * Arquivo: frontend/src/App.jsx
 *
 * Responsabilidade:
 * Define as rotas do React, controla a sessão local e organiza os provedores de contexto da aplicação.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PeoplePage from "./pages/PeoplePage";
import CompaniesPage from "./pages/CompaniesPage";
import NewPersonPage from "./pages/NewPersonPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import { CompaniesProvider } from "./contexts/CompaniesContext";
import { PeopleProvider } from "./contexts/PeopleContext";
import "./styles/global.css";

/**
 * Executa a responsabilidade denominada “protected route” neste módulo.
 */
function ProtectedRoute({ children }) {
  const logged = sessionStorage.getItem("rh_sedes_logged") === "true";
  const token = sessionStorage.getItem("rh_sedes_token");

  if (!logged || !token) {
    return <Navigate to="/" replace />;
  }

  return (
    <CompaniesProvider>
      <PeopleProvider>{children}</PeopleProvider>
    </CompaniesProvider>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <main className="app-splash" aria-label="Carregando RH SEDES">
        <img src="/logo_sedes.png" alt="SEDES" />
        <div className="splash-loader" />
        <p>Carregando o Sistema de Gestão de Pessoas...</p>
      </main>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pessoas"
        element={
          <ProtectedRoute>
            <PeoplePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pessoas/novo"
        element={
          <ProtectedRoute>
            <NewPersonPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pessoas/:id"
        element={
          <ProtectedRoute>
            <PersonDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresas"
        element={
          <ProtectedRoute>
            <CompaniesPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
