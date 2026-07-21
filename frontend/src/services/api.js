/**
 * Arquivo: frontend/src/services/api.js
 *
 * Responsabilidade:
 * Configura o Axios com a URL da API e inclui automaticamente o token JWT nas requisições.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3333/api"
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("rh_sedes_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("rh_sedes_logged");
      sessionStorage.removeItem("rh_sedes_role");
      sessionStorage.removeItem("rh_sedes_token");
      sessionStorage.removeItem("rh_sedes_user");
    }

    return Promise.reject(error);
  }
);

export default api;
