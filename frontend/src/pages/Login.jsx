/**
 * Arquivo: frontend/src/pages/Login.jsx
 *
 * Responsabilidade:
 * Tela de autenticação que envia as credenciais à API e armazena a sessão retornada.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  /**
   * Executa a responsabilidade denominada “handle submit” neste módulo.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await api.post("/auth/login", {
        username: login,
        password,
      });

      sessionStorage.setItem("rh_sedes_logged", "true");
      sessionStorage.setItem("rh_sedes_role", response.data.user.role);
      sessionStorage.setItem("rh_sedes_token", response.data.token);
      sessionStorage.setItem(
        "rh_sedes_user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Não foi possível entrar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="institutional-login-page">
      <section className="institutional-login-card">
        <div className="institutional-logo-area">
          <img
            src="/VERTICAL 1-8.png"
            alt="Governo do Estado do Maranhão e SEDES"
            className="institutional-logo"
          />
          <div className="institutional-system-title">
            <h1>Sistema de Gestão de Pessoas</h1>
            <p>Secretaria de Estado do Desenvolvimento Social</p>
          </div>
        </div>

        <form className="institutional-login-form" onSubmit={handleSubmit}>
          <label htmlFor="login">Login</label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            placeholder="Digite seu login"
            autoComplete="username"
          />

          <label htmlFor="password">Senha</label>
          <div className="institutional-password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />

            <button
              type="button"
              className="institutional-password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <button type="button" className="institutional-forgot-password">
            Esqueci a senha
          </button>

          {error && <p className="institutional-login-error">{error}</p>}

          <button
            type="submit"
            className="institutional-login-button"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>

      <footer className="institutional-login-footer">
        SEDES © 2026 — Todos os direitos reservados
      </footer>
    </main>
  );
}
