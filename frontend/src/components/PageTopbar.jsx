/**
 * Arquivo: frontend/src/components/PageTopbar.jsx
 *
 * Responsabilidade:
 * Barra superior das páginas internas com título, descrição e ações.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

import { Menu, Moon, Sun } from "lucide-react";

export default function PageTopbar({
  title,
  subtitle,
  theme,
  onToggleTheme,
  onOpenSidebar,
  actions,
}) {
  return (
    <header className="topbar">
      <div className="topbar-title-group">
        <button
          className="mobile-menu-button"
          onClick={onOpenSidebar}
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          onClick={onToggleTheme}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {actions}

        <div className="user-avatar" title="Administrador">
          AD
        </div>
      </div>
    </header>
  );
}
