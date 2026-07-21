/**
 * Arquivo: backend/src/middlewares/authorizeAdmin.js
 *
 * Responsabilidade:
 * Impede que usuários sem o papel ADMIN executem operações administrativas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

/**
 * Executa a responsabilidade denominada “authorize admin” neste módulo.
 */
function authorizeAdmin(request, response, next) {
  if (request.user?.role !== "ADMIN") {
    return response.status(403).json({
      message: "Apenas administradores podem realizar esta ação.",
    });
  }

  return next();
}

module.exports = authorizeAdmin;
