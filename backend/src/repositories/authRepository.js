/**
 * Arquivo: backend/src/repositories/authRepository.js
 *
 * Responsabilidade:
 * Isola as consultas ao banco relacionadas aos usuários usados na autenticação.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const prisma = require("../config/prisma");

/**
 * Executa a responsabilidade denominada “find by username” neste módulo.
 */
function findByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
  });
}

module.exports = { findByUsername };
