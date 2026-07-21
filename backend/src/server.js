require("dotenv").config();

const app = require("./app");
const prisma = require("./config/prisma");
const ensureDatabaseCompatibility = require("./config/ensureDatabaseCompatibility");

const port = process.env.PORT || 3333;
let server;

async function startServer() {
  try {
    await ensureDatabaseCompatibility();

    server = app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor executando na porta ${port}`);
    });
  } catch (error) {
    console.error("Não foi possível preparar o banco de dados:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando servidor...`);

  if (!server) {
    await prisma.$disconnect();
    process.exit(0);
  }

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
