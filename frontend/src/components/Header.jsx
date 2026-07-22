/**
 * Arquivo: frontend/src/components/Header.jsx
 *
 * Responsabilidade:
 * Cabeçalho público usado principalmente na tela de autenticação.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { Moon, Sun, Plus, Menu } from "lucide-react";
import Button from "./Button";

export default function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  onNewRegistration,
}) {
  return (
    <header className="topbar">
      <div className="topbar-title-group">
        <button className="mobile-menu-button" onClick={onToggleSidebar} aria-label="Abrir menu">
          <Menu size={21} />
        </button>

        <img src="/VERTICAL 1-8.png" alt="SEDES" className="topbar-logo" />

        <div>
          <h1>Dashboard</h1>
          <p>Visão geral dos pessoas do Banco de Talentos e contratados</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="icon-button" onClick={onToggleTheme} aria-label="Alternar tema">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Button onClick={onNewRegistration}>
          <Plus size={18} />
          <span>Novo Cadastro</span>
        </Button>

        <div className="user-avatar" title="Administrador">
          AD
        </div>
      </div>
    </header>
  );
}
