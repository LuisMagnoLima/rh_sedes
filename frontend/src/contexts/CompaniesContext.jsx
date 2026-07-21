/**
 * Arquivo: frontend/src/contexts/CompaniesContext.jsx
 *
 * Responsabilidade:
 * Centraliza o estado e as operações de consulta, criação, edição e exclusão de empresas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CompaniesContext = createContext(null);

/**
 * Executa a responsabilidade denominada “companies provider” neste módulo.
 */
export function CompaniesProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState("");

  /**
   * Busca novamente as empresas na API e atualiza o estado compartilhado.
   */
  async function loadCompanies() {
    try {
      setLoadingCompanies(true);
      setCompaniesError("");
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      setCompaniesError(
        error.response?.data?.message || "Não foi possível carregar as empresas."
      );
    } finally {
      setLoadingCompanies(false);
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  /**
   * Envia uma empresa à API e sincroniza o estado local.
   */
  async function createCompany(data) {
    const response = await api.post("/companies", data);
    setCompanies((current) =>
      [...current, response.data].sort((a, b) =>
        a.tradeName.localeCompare(b.tradeName)
      )
    );
    return response.data;
  }

  /**
   * Atualiza uma empresa na API e sincroniza o estado local.
   */
  async function updateCompany(id, data) {
    const response = await api.put(`/companies/${id}`, data);
    setCompanies((current) =>
      current
        .map((company) => (company.id === id ? response.data : company))
        .sort((a, b) => a.tradeName.localeCompare(b.tradeName))
    );
    return response.data;
  }

  /**
   * Exclui uma empresa na API e sincroniza o estado local.
   */
  async function removeCompany(id) {
    await api.delete(`/companies/${id}`);
    setCompanies((current) => current.filter((company) => company.id !== id));
  }

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        loadingCompanies,
        companiesError,
        loadCompanies,
        createCompany,
        updateCompany,
        removeCompany,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

/**
 * Disponibiliza o contexto de empresas e impede seu uso fora do provedor.
 */
export function useCompanies() {
  const context = useContext(CompaniesContext);

  if (!context) {
    throw new Error("useCompanies deve ser usado dentro de CompaniesProvider.");
  }

  return context;
}
