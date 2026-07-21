/**
 * Arquivo: frontend/src/data/mockData.js
 *
 * Responsabilidade:
 * Mantém dados simulados usados durante o desenvolvimento inicial da interface.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export const people = [
  {
    id: 1,
    name: "Ana Beatriz Lima",
    cpf: "123.456.789-00",
    phone: "(98) 99999-1111",
    email: "ana.lima@email.com",
    birthDate: "1996-05-14",
    course: "Sistemas de Informação",
    technologies: ["React", "Node"],
    employmentType: "TERCEIRIZADO",
    company: "Empresa Alfa",
    working: true,
    sector: "",
    vacation: false,
  },
  {
    id: 2,
    name: "Carlos Eduardo Silva",
    cpf: "987.654.321-00",
    phone: "(98) 98888-2222",
    email: "carlos.silva@email.com",
    birthDate: "1993-11-02",
    course: "Análise e Desenvolvimento de Sistemas",
    technologies: ["Java", "Spring"],
    employmentType: "TERCEIRIZADO",
    company: "Empresa Beta",
    working: false,
    sector: "",
    vacation: false,
  },
  {
    id: 3,
    name: "Mariana Costa",
    cpf: "456.789.123-00",
    phone: "(98) 97777-3333",
    email: "mariana.costa@email.com",
    birthDate: "1998-02-20",
    course: "Ciência da Computação",
    technologies: ["Python"],
    employmentType: "SEDES",
    company: "",
    working: null,
    sector: "MLF",
    vacation: true,
  },
  {
    id: 4,
    name: "João Pedro Santos",
    cpf: "741.852.963-00",
    phone: "(98) 96666-4444",
    email: "joao.santos@email.com",
    birthDate: "1995-08-09",
    course: "Engenharia da Computação",
    technologies: ["C++", "Python"],
    employmentType: "SEDES",
    company: "",
    working: null,
    sector: "NUTEC",
    vacation: false,
  },
];

export const filters = {
  courses: [
    "Ciência da Computação",
    "Engenharia da Computação",
    "Sistemas de Informação",
    "Análise e Desenvolvimento de Sistemas",
    "Não sei",
  ],
  companies: ["Empresa Alfa", "Empresa Beta", "Empresa Gama"],
  technologies: ["React", "Vue", "Angular", "C++", "Java", "Node", "Python", "Spring"],
  sectors: ["MLF", "NUTEC"],
};
