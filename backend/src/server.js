/**
 * Arquivo: backend/src/server.js
 *
 * Responsabilidade:
 * Carrega as variáveis de ambiente e inicia o servidor HTTP do backend na porta configurada pela hospedagem ou na porta local padrão.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3333;

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor executando na porta ${port}`);
});

/**
 * Executa a responsabilidade denominada “shutdown” neste módulo.
 */
async function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando servidor...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
