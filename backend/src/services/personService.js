/**
 * Arquivo: backend/src/services/personService.js
 *
 * Responsabilidade:
 * Aplica as regras de negócio de pessoas, vínculo com empresas, tecnologias e contratos SEDES.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const personRepository = require("../repositories/personRepository");
const AppError = require("../utils/AppError");
const { validatePerson } = require("../validators/personValidator");

/**
 * Converte o identificador recebido pela rota em número inteiro válido.
 */
function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Identificador de pessoa inválido.", 400);
  }

  return id;
}

/**
 * Transforma o registro retornado pelo Prisma no formato consumido pelo frontend.
 */
function serialize(person) {
  return {
    id: person.id,
    name: person.fullName,
    cpf: person.cpf,
    phone: person.phone || "",
    email: person.email,
    birthDate: person.birthDate
      ? person.birthDate.toISOString().slice(0, 10)
      : "",
    course: person.course,
    technologies: person.technologies.map(
      (item) => item.technology.name
    ),
    employmentType:
      person.type === "BANCO_TALENTOS" ? "BANCO_TALENTOS" : "SEDES",
    companyId: person.companyId,
    company: person.company?.tradeName || "",
    working: person.working,
    sector: person.sector || "",
    vacation: person.vacation,
    vacationStart: person.vacationStart
      ? person.vacationStart.toISOString().slice(0, 10)
      : "",
    vacationEnd: person.vacationEnd
      ? person.vacationEnd.toISOString().slice(0, 10)
      : "",
    active: person.active,
    sedesContractActive: person.sedesContractActive,
    createdAt: person.createdAt,
    updatedAt: person.updatedAt,
  };
}

/**
 * Confere se a empresa informada existe quando a pessoa está trabalhando.
 */
async function validateCompany(data, currentCompanyId = null) {
  if (!data.working || !data.companyId) {
    return;
  }

  const company = await personRepository.findCompanyById(data.companyId);

  if (!company) {
    throw new AppError("Empresa não encontrada.", 404);
  }

  if (company.status !== "ATIVA" && company.id !== currentCompanyId) {
    throw new AppError("Não é possível vincular o cadastro a uma empresa inativa.", 400);
  }
}

/**
 * Busca e devolve a lista de registros.
 */
async function list(search) {
  const people = await personRepository.findAll(search?.trim());
  return people.map(serialize);
}

/**
 * Busca um registro específico e gera erro quando ele não existe.
 */
async function getById(rawId) {
  const id = parseId(rawId);
  const person = await personRepository.findById(id);

  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  return serialize(person);
}

/**
 * Valida os dados e cria um novo registro.
 */
async function create(payload) {
  const data = validatePerson(payload);
  await validateCompany(data);
  const person = await personRepository.create(data);
  return serialize(person);
}

/**
 * Valida os dados e atualiza um registro existente.
 */
async function update(rawId, payload) {
  const id = parseId(rawId);
  const currentPerson = await getById(id);

  const data = validatePerson(payload);
  await validateCompany(data, currentPerson.companyId);

  const person = await personRepository.update(id, data);
  return serialize(person);
}

/**
 * Confirma a existência e remove o registro.
 */
async function remove(rawId) {
  const id = parseId(rawId);
  await getById(id);
  await personRepository.remove(id);
}

/**
 * Reativa o contrato SEDES e sincroniza o estado local.
 */
async function reactivateSedesContract(rawId) {
  const id = parseId(rawId);
  const person = await personRepository.findById(id);

  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  if (person.type !== "CONTRATADO_SEDES") {
    throw new AppError(
      "A reativação só pode ser feita para contratados da SEDES.",
      400
    );
  }

  if (person.sedesContractActive) {
    throw new AppError("O contrato SEDES já está ativo.", 400);
  }

  const updatedPerson = await personRepository.reactivateSedesContract(id);
  return serialize(updatedPerson);
}

/**
 * Remove logicamente o contrato SEDES e sincroniza o estado local.
 */
async function removeSedesContract(rawId) {
  const id = parseId(rawId);
  const person = await personRepository.findById(id);

  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  if (person.type !== "CONTRATADO_SEDES") {
    throw new AppError(
      "A remoção de contrato SEDES só pode ser feita em contratados da SEDES.",
      400
    );
  }

  if (!person.sedesContractActive) {
    throw new AppError("O contrato SEDES desta pessoa já está removido.", 400);
  }

  const updatedPerson = await personRepository.removeSedesContract(id);
  return serialize(updatedPerson);
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  removeSedesContract,
  reactivateSedesContract,
};
