/**
 * Arquivo: frontend/src/components/Sidebar.jsx
 *
 * Responsabilidade:
 * Menu lateral de navegação, identificação do usuário e encerramento da sessão.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import {
  LayoutDashboard,
  Users,
  Building2,
  Cpu,
  FileText,
  FolderOpen,
  Settings,
  LogOut,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const activeItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Pessoas", icon: Users, to: "/pessoas" },
  { label: "Empresas", icon: Building2, to: "/empresas" },
];

const illustrativeItems = [
  { label: "Contratados", icon: BriefcaseBusiness },
  { label: "Tecnologias", icon: Cpu },
  { label: "Relatórios", icon: FileText },
  { label: "Cadastros", icon: FolderOpen },
  { label: "Configurações", icon: Settings },
];

export default function Sidebar({ onLogout, open, onClose }) {
  return (
    <>
      <button
        className={`sidebar-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Fechar menu"
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <img
            src="/logo_sedes.png"
            alt="SEDES"
            className="brand-logo"
          />
          <div className="brand-text">
            <strong>RH SEDES</strong>
            <span>Gestão de pessoas</span>
          </div>

          <button className="sidebar-close" onClick={onClose} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        <nav>
          {activeItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}

          {illustrativeItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="nav-item nav-item-illustrative"
              title="Funcionalidade ilustrativa"
              onClick={onClose}
            >
              <Icon size={19} />
              <span>{label}</span>
              <small>Em breve</small>
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={onLogout}>
          <LogOut size={19} />
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}
