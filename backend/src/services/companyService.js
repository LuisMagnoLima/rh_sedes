/**
 * Arquivo: backend/src/services/companyService.js
 *
 * Responsabilidade:
 * Aplica validações e regras de negócio antes de acessar o repositório de empresas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const companyRepository = require("../repositories/companyRepository");
const AppError = require("../utils/AppError");
const { validateCompany } = require("../validators/companyValidator");

/**
 * Converte o identificador recebido pela rota em número inteiro válido.
 */
function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Identificador de empresa inválido.", 400);
  }

  return id;
}

/**
 * Busca e devolve a lista de registros.
 */
async function list(search) {
  return companyRepository.findAll(search?.trim());
}

/**
 * Busca um registro específico e gera erro quando ele não existe.
 */
async function getById(rawId) {
  const id = parseId(rawId);
  const company = await companyRepository.findById(id);

  if (!company) {
    throw new AppError("Empresa não encontrada.", 404);
  }

  return company;
}

/**
 * Valida os dados e cria um novo registro.
 */
async function create(payload) {
  const data = validateCompany(payload);
  return companyRepository.create(data);
}

/**
 * Valida os dados e atualiza um registro existente.
 */
async function update(rawId, payload) {
  const id = parseId(rawId);
  await getById(id);
  const data = validateCompany(payload);
  return companyRepository.update(id, data);
}

/**
 * Confirma a existência e remove o registro.
 */
async function remove(rawId) {
  const id = parseId(rawId);
  await getById(id);
  return companyRepository.remove(id);
}

module.exports = { list, getById, create, update, remove };
