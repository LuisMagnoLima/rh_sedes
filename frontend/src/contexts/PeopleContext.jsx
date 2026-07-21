/**
 * Arquivo: frontend/src/contexts/PeopleContext.jsx
 *
 * Responsabilidade:
 * Centraliza o estado e as operações de pessoas e contratos SEDES.
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

const PeopleContext = createContext(null);

/**
 * Executa a responsabilidade denominada “people provider” neste módulo.
 */
export function PeopleProvider({ children }) {
  const [people, setPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [peopleError, setPeopleError] = useState("");

  /**
   * Busca novamente a lista de pessoas na API e atualiza o estado compartilhado.
   */
  async function loadPeople() {
    try {
      setLoadingPeople(true);
      setPeopleError("");
      const response = await api.get("/people");
      setPeople(response.data);
    } catch (error) {
      setPeopleError(
        error.response?.data?.message || "Não foi possível carregar as pessoas."
      );
    } finally {
      setLoadingPeople(false);
    }
  }

  useEffect(() => {
    loadPeople();
  }, []);

  /**
   * Envia um novo cadastro à API e inclui o resultado no estado local.
   */
  async function createPerson(data) {
    const response = await api.post("/people", data);
    setPeople((current) =>
      [...current, response.data].sort((a, b) => a.name.localeCompare(b.name))
    );
    return response.data;
  }

  /**
   * Envia as alterações à API e substitui o registro no estado local.
   */
  async function updatePerson(id, data) {
    const response = await api.put(`/people/${id}`, data);
    setPeople((current) =>
      current
        .map((person) => (person.id === id ? response.data : person))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return response.data;
  }

  /**
   * Exclui a pessoa na API e remove o registro do estado local.
   */
  async function removePerson(id) {
    await api.delete(`/people/${id}`);
    setPeople((current) => current.filter((person) => person.id !== id));
  }

  /**
   * Reativa o contrato SEDES e sincroniza o estado local.
   */
  async function reactivateSedesContract(id) {
    const response = await api.patch(`/people/${id}/reactivate-sedes-contract`);
    setPeople((current) =>
      current.map((person) =>
        person.id === id ? response.data : person
      )
    );
    return response.data;
  }

  /**
   * Remove logicamente o contrato SEDES e sincroniza o estado local.
   */
  async function removeSedesContract(id) {
    const response = await api.patch(`/people/${id}/remove-sedes-contract`);
    setPeople((current) =>
      current.map((person) =>
        person.id === id ? response.data : person
      )
    );
    return response.data;
  }

  /**
   * Localiza uma pessoa já carregada usando seu identificador.
   */
  function getPersonById(id) {
    return people.find((person) => String(person.id) === String(id));
  }

  return (
    <PeopleContext.Provider
      value={{
        people,
        loadingPeople,
        peopleError,
        loadPeople,
        createPerson,
        updatePerson,
        removePerson,
        removeSedesContract,
        reactivateSedesContract,
        getPersonById,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
}

/**
 * Disponibiliza o contexto de pessoas e impede seu uso fora do provedor.
 */
export function usePeople() {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error("usePeople deve ser usado dentro de PeopleProvider.");
  }

  return context;
}
