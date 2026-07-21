/**
 * Arquivo: backend/src/middlewares/authenticate.js
 *
 * Responsabilidade:
 * Valida o token JWT enviado no cabeçalho Authorization e disponibiliza os dados do usuário autenticado na requisição.
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

/**
 * Executa a responsabilidade denominada “authenticate” neste módulo.
 */
function authenticate(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return response.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "rh-sedes-demo-secret"
    );

    request.user = {
      id: payload.sub,
      name: payload.name,
      username: payload.username,
      role: payload.role,
    };

    return next();
  } catch {
    return response.status(401).json({
      message: "Sessão inválida ou expirada.",
    });
  }
}

module.exports = authenticate;
