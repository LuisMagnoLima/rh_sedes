/**
 * Arquivo: backend/src/controllers/personController.js
 *
 * Responsabilidade:
 * Converte as requisições HTTP de pessoas e contratos em chamadas para a camada de serviço.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const personService = require("../services/personService");

/**
 * Executa a responsabilidade denominada “index” neste módulo.
 */
async function index(request, response, next) {
  try {
    const people = await personService.list(request.query.search);
    return response.json(people);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “show” neste módulo.
 */
async function show(request, response, next) {
  try {
    const person = await personService.getById(request.params.id);
    return response.json(person);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “store” neste módulo.
 */
async function store(request, response, next) {
  try {
    const person = await personService.create(request.body);
    return response.status(201).json(person);
  } catch (error) {
    return next(error);
  }
}

/**
 * Valida os dados e atualiza um registro existente.
 */
async function update(request, response, next) {
  try {
    const person = await personService.update(request.params.id, request.body);
    return response.json(person);
  } catch (error) {
    return next(error);
  }
}

/**
 * Reativa o contrato SEDES e sincroniza o estado local.
 */
async function reactivateSedesContract(request, response, next) {
  try {
    const person = await personService.reactivateSedesContract(request.params.id);
    return response.json(person);
  } catch (error) {
    return next(error);
  }
}

/**
 * Remove logicamente o contrato SEDES e sincroniza o estado local.
 */
async function removeSedesContract(request, response, next) {
  try {
    const person = await personService.removeSedesContract(request.params.id);
    return response.json(person);
  } catch (error) {
    return next(error);
  }
}

/**
 * Executa a responsabilidade denominada “destroy” neste módulo.
 */
async function destroy(request, response, next) {
  try {
    await personService.remove(request.params.id);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = { index, show, store, update, reactivateSedesContract, removeSedesContract, destroy };
