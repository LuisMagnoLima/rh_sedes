/**
 * Arquivo: backend/src/routes/authRoutes.js
 *
 * Responsabilidade:
 * Define os endereços HTTP públicos usados na autenticação.
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
const authController = require("../controllers/authController");

const routes = Router();

// Registra uma configuração ou rota HTTP por meio do método POST.
routes.post("/login", authController.login);

module.exports = routes;
