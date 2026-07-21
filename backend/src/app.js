/**
 * Arquivo: backend/src/app.js
 *
 * Responsabilidade:
 * Configura a aplicação Express, os middlewares de segurança, CORS, limite de requisições, rotas e tratamento centralizado de erros.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.disable("x-powered-by");

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(helmet());

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(express.json({ limit: "100kb" }));

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: "Muitas requisições. Tente novamente em alguns minutos.",
    },
  })
);

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use("/api", routes);

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(notFound);

// Registra uma configuração ou rota HTTP por meio do método USE.
app.use(errorHandler);

module.exports = app;
