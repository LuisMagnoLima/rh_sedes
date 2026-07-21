/**
 * Arquivo: backend/src/controllers/authController.js
 *
 * Responsabilidade:
 * Recebe requisições de autenticação, chama a camada de serviço e devolve a resposta HTTP do login.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const authService = require("../services/authService");

/**
 * Valida as credenciais e cria os dados da sessão autenticada.
 */
async function login(request, response, next) {
  try {
    const result = await authService.login(request.body);
    return response.json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
