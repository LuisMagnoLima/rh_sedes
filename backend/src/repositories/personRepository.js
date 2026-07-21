/**
 * Arquivo: backend/src/repositories/personRepository.js
 *
 * Responsabilidade:
 * Isola as operações do Prisma relacionadas a pessoas, tecnologias, empresas e contratos SEDES.
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

const personInclude = {
  company: true,
  technologies: {
    include: {
      technology: true,
    },
  },
};

/**
 * Executa a responsabilidade denominada “find all” neste módulo.
 */
function findAll(search) {
  const where = search
    ? {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { cpf: { contains: search } },
          { email: { contains: search, mode: "insensitive" } },
          { course: { contains: search, mode: "insensitive" } },
          { sector: { contains: search, mode: "insensitive" } },
          {
            company: {
              tradeName: { contains: search, mode: "insensitive" },
            },
          },
          {
            technologies: {
              some: {
                technology: {
                  name: { contains: search, mode: "insensitive" },
                },
              },
            },
          },
        ],
      }
    : undefined;

  return prisma.person.findMany({
    where,
    include: personInclude,
    orderBy: { fullName: "asc" },
  });
}

/**
 * Executa a responsabilidade denominada “find by id” neste módulo.
 */
function findById(id) {
  return prisma.person.findUnique({
    where: { id },
    include: personInclude,
  });
}

/**
 * Executa a responsabilidade denominada “find company by id” neste módulo.
 */
function findCompanyById(id) {
  return prisma.company.findUnique({ where: { id } });
}

/**
 * Valida os dados e cria um novo registro.
 */
async function create(data) {
  const { technologies, ...personData } = data;

  return prisma.$transaction(async (transaction) => {
    const person = await transaction.person.create({
      data: personData,
    });

    for (const name of technologies) {
      const technology = await transaction.technology.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await transaction.personTechnology.create({
        data: {
          personId: person.id,
          technologyId: technology.id,
        },
      });
    }

    return transaction.person.findUnique({
      where: { id: person.id },
      include: personInclude,
    });
  });
}

/**
 * Valida os dados e atualiza um registro existente.
 */
async function update(id, data) {
  const { technologies, ...personData } = data;

  return prisma.$transaction(async (transaction) => {
    await transaction.person.update({
      where: { id },
      data: personData,
    });

    await transaction.personTechnology.deleteMany({
      where: { personId: id },
    });

    for (const name of technologies) {
      const technology = await transaction.technology.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await transaction.personTechnology.create({
        data: {
          personId: id,
          technologyId: technology.id,
        },
      });
    }

    return transaction.person.findUnique({
      where: { id },
      include: personInclude,
    });
  });
}

/**
 * Confirma a existência e remove o registro.
 */
function remove(id) {
  return prisma.$transaction(async (transaction) => {
    await transaction.personTechnology.deleteMany({
      where: { personId: id },
    });

    return transaction.person.delete({
      where: { id },
    });
  });
}

/**
 * Reativa o contrato SEDES e sincroniza o estado local.
 */
function reactivateSedesContract(id) {
  return prisma.person.update({
    where: { id },
    data: {
      sedesContractActive: true,
    },
    include: personInclude,
  });
}

/**
 * Remove logicamente o contrato SEDES e sincroniza o estado local.
 */
function removeSedesContract(id) {
  return prisma.person.update({
    where: { id },
    data: {
      sedesContractActive: false,
    },
    include: personInclude,
  });
}

module.exports = {
  findAll,
  findById,
  findCompanyById,
  create,
  update,
  remove,
  removeSedesContract,
  reactivateSedesContract,
};
