/**
 * Arquivo: backend/src/routes/index.js
 *
 * Responsabilidade:
 * Agrupa todas as rotas da API sob seus respectivos prefixos.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const { Router } = require("express");
const authRoutes = require("./authRoutes");
const companyRoutes = require("./companyRoutes");
const personRoutes = require("./personRoutes");

const routes = Router();

// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "Bem-vindo à API do RH SEDES",
    health: "/api/health",
  });
});

// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "RH SEDES API funcionando",
  });
});

// Registra uma configuração ou rota HTTP por meio do método USE.
routes.use("/auth", authRoutes);
// Registra uma configuração ou rota HTTP por meio do método USE.
routes.use("/companies", companyRoutes);
// Registra uma configuração ou rota HTTP por meio do método USE.
routes.use("/people", personRoutes);

module.exports = routes;
