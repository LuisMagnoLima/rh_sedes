/**
 * Arquivo: backend/src/middlewares/errorHandler.js
 *
 * Responsabilidade:
 * Centraliza a conversão de erros da aplicação, validação e banco de dados em respostas HTTP padronizadas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const { Prisma } = require("@prisma/client");
const { ZodError } = require("zod");

/**
 * Executa a responsabilidade denominada “error handler” neste módulo.
 */
function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Dados inválidos.",
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return response.status(409).json({
        message: "Já existe um registro com um valor único informado.",
        field: error.meta?.target ?? null,
      });
    }

    if (error.code === "P2025") {
      return response.status(404).json({
        message: "Registro não encontrado.",
      });
    }

    if (error.code === "P2003") {
      return response.status(400).json({
        message: "O registro informado possui um relacionamento inválido.",
      });
    }
  }

  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  return response.status(statusCode).json({
    message:
      statusCode === 500
        ? "Erro interno do servidor."
        : error.message,
    details: error.details || undefined,
  });
}

module.exports = errorHandler;
