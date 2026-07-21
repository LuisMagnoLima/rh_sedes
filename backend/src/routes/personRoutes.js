/**
 * Arquivo: backend/src/routes/personRoutes.js
 *
 * Responsabilidade:
 * Define as rotas de pessoas e as operações de remoção ou reativação de contrato SEDES.
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
const personController = require("../controllers/personController");
const authenticate = require("../middlewares/authenticate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

const routes = Router();

// Registra uma configuração ou rota HTTP por meio do método USE.
routes.use(authenticate);
// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/", personController.index);
// Registra uma configuração ou rota HTTP por meio do método GET.
routes.get("/:id", personController.show);
// Registra uma configuração ou rota HTTP por meio do método POST.
routes.post("/", authorizeAdmin, personController.store);
// Registra uma configuração ou rota HTTP por meio do método PUT.
routes.put("/:id", authorizeAdmin, personController.update);
// Registra uma configuração ou rota HTTP por meio do método PATCH.
routes.patch(
  "/:id/reactivate-sedes-contract",
  authorizeAdmin,
  personController.reactivateSedesContract
);
// Registra uma configuração ou rota HTTP por meio do método PATCH.
routes.patch(
  "/:id/remove-sedes-contract",
  authorizeAdmin,
  personController.removeSedesContract
);
// Registra uma configuração ou rota HTTP por meio do método DELETE.
routes.delete("/:id", authorizeAdmin, personController.destroy);

module.exports = routes;
