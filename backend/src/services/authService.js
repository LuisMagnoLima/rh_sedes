/**
 * Arquivo: backend/src/services/authService.js
 *
 * Responsabilidade:
 * Aplica a regra de autenticação, valida credenciais e gera o token JWT.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");
const AppError = require("../utils/AppError");

/**
 * Valida as credenciais e cria os dados da sessão autenticada.
 */
async function login(payload) {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");

  if (!username || !password) {
    throw new AppError("Informe login e senha.", 400);
  }

  const user = await authRepository.findByUsername(username);

  // Senha em texto puro somente para demonstração acadêmica.
  if (!user || !user.active || user.password !== password) {
    throw new AppError("Login ou senha inválidos.", 401);
  }

  const token = jwt.sign(
    {
      name: user.name,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "rh-sedes-demo-secret",
    {
      subject: String(user.id),
      expiresIn: "8h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
  };
}

module.exports = { login };
