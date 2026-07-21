/**
 * Arquivo: backend/src/middlewares/notFound.js
 *
 * Responsabilidade:
 * Cria uma resposta de rota não encontrada quando nenhuma rota anterior atende à requisição.
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
 * Executa a responsabilidade denominada “not found” neste módulo.
 */
function notFound(request, response) {
  return response.status(404).json({
    message: `Rota não encontrada: ${request.method} ${request.originalUrl}`,
  });
}

module.exports = notFound;
