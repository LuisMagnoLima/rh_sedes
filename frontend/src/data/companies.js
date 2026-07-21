/**
 * Arquivo: frontend/src/data/companies.js
 *
 * Responsabilidade:
 * Mantém dados auxiliares de empresas usados originalmente no desenvolvimento da interface.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export const initialCompanies = [
  {
    id: 1,
    legalName: "Empresa Alfa Serviços Ltda.",
    tradeName: "Empresa Alfa",
    cnpj: "12.345.678/0001-90",
    phone: "(98) 98888-1111",
    email: "contato@empresaalfa.com.br",
    manager: "Carlos Almeida",
    status: "ATIVA",
    notes: "Empresa responsável por serviços administrativos terceirizados.",
  },
  {
    id: 2,
    legalName: "Beta Tecnologia e Apoio Ltda.",
    tradeName: "Empresa Beta",
    cnpj: "98.765.432/0001-10",
    phone: "(98) 97777-2222",
    email: "rh@empresabeta.com.br",
    manager: "Mariana Costa",
    status: "ATIVA",
    notes: "Prestadora de serviços de apoio técnico.",
  },
  {
    id: 3,
    legalName: "Gama Soluções Integradas Ltda.",
    tradeName: "Empresa Gama",
    cnpj: "45.123.987/0001-55",
    phone: "(98) 96666-3333",
    email: "atendimento@empresagama.com.br",
    manager: "Rafael Souza",
    status: "INATIVA",
    notes: "Contrato temporariamente encerrado.",
  },
];
