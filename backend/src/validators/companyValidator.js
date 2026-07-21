/**
 * Arquivo: backend/src/validators/companyValidator.js
 *
 * Responsabilidade:
 * Valida e normaliza os dados recebidos nos cadastros de empresas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const { z } = require("zod");

const companySchema = z.object({
  legalName: z.string().trim().min(3, "Razão social deve ter pelo menos 3 caracteres."),
  tradeName: z.string().trim().min(2, "Nome fantasia deve ter pelo menos 2 caracteres."),
  cnpj: z.string().trim().min(14, "Informe um CNPJ válido."),
  phone: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Informe um e-mail válido."),
  manager: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["ATIVA", "INATIVA"]),
  notes: z.string().trim().max(2000, "Observações devem ter no máximo 2000 caracteres.").optional().or(z.literal("")),
});

/**
 * Confere se a empresa vinculada existe e pode receber novos terceirizados.
 */
function validateCompany(payload) {
  return companySchema.parse(payload);
}

module.exports = { validateCompany };
