/**
 * Arquivo: backend/src/routes/companyRoutes.js
 *
 * Responsabilidade:
 * Define as rotas de consulta e manutenção de empresas, aplicando autorização administrativa nas alterações.
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
const companyController = require("../controllers/companyController");
const authenticate = require("../middlewares/authenticate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

const routes = Router();

// Registra uma configuração ou rota HTTP por meio do método USE.
routes.use(authenticate);
// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/", companyController.index);
// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/:id", companyController.show);
// Registra uma configuração ou rota HTTP por meio do método POST.
routes.post("/", authorizeAdmin, companyController.store);
// Registra uma configuração ou rota HTTP por meio do método PUT.
routes.put("/:id", authorizeAdmin, companyController.update);
// Registra uma configuração ou rota HTTP por meio do método DELETE.
routes.delete("/:id", authorizeAdmin, companyController.destroy);

module.exports = routes;
