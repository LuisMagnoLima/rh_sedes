/**
 * Arquivo: backend/src/controllers/companyController.js
 *
 * Responsabilidade:
 * Converte as requisições HTTP de empresas em chamadas para a camada de serviço e define os códigos de resposta.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const companyService = require("../services/companyService");

/**
 * Executa a responsabilidade denominada “index” neste módulo.
 */
async function index(request, response, next) {
  try {
    const companies = await companyService.list(request.query.search);
    return response.json(companies);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “show” neste módulo.
 */
async function show(request, response, next) {
  try {
    const company = await companyService.getById(request.params.id);
    return response.json(company);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “store” neste módulo.
 */
async function store(request, response, next) {
  try {
    const company = await companyService.create(request.body);
    return response.status(201).json(company);
  } catch (error) {
    return next(error);
  }
}

/**
 * Valida os dados e atualiza um registro existente.
 */
async function update(request, response, next) {
  try {
    const company = await companyService.update(request.params.id, request.body);
    return response.json(company);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “destroy” neste módulo.
 */
async function destroy(request, response, next) {
  try {
    await companyService.remove(request.params.id);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { index, show, store, update, destroy };
