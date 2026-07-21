/**
 * Arquivo: backend/src/repositories/companyRepository.js
 *
 * Responsabilidade:
 * Isola as operações do Prisma relacionadas ao cadastro de empresas.
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
 * Executa a responsabilidade denominada “find all” neste módulo.
 */
function findAll(search) {
  const where = search
    ? {
        OR: [
          { legalName: { contains: search, mode: "insensitive" } },
          { tradeName: { contains: search, mode: "insensitive" } },
          { cnpj: { contains: search } },
          { manager: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : undefined;

  return prisma.company.findMany({
    where,
    orderBy: { tradeName: "asc" },
  });
}

/**
 * Executa a responsabilidade denominada “find by id” neste módulo.
 */
function findById(id) {
  return prisma.company.findUnique({ where: { id } });
}

/**
 * Valida os dados e cria um novo registro.
 */
function create(data) {
  return prisma.company.create({ data });
}

/**
 * Valida os dados e atualiza um registro existente.
 */
function update(id, data) {
  return prisma.company.update({
    where: { id },
    data,
  });
}

/**
 * Confirma a existência e remove o registro.
 */
function remove(id) {
  return prisma.company.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
