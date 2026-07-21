/**
 * Arquivo: backend/prisma/seed.js
 *
 * Responsabilidade:
 * Insere os usuários e dados iniciais necessários para demonstrar o sistema.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Executa a responsabilidade denominada “main” neste módulo.
 */
async function main() {
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      name: "Administrador",
      password: "admin",
      role: "ADMIN",
      active: true,
    },
    create: {
      name: "Administrador",
      username: "admin",
      password: "admin",
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { username: "usuario" },
    update: {
      name: "Usuário de consulta",
      password: "usuario",
      role: "USER",
      active: true,
    },
    create: {
      name: "Usuário de consulta",
      username: "usuario",
      password: "usuario",
      role: "USER",
    },
  });

  console.log("Usuários de demonstração criados.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
