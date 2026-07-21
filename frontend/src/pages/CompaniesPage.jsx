/**
 * Arquivo: frontend/src/pages/CompaniesPage.jsx
 *
 * Responsabilidade:
 * Página administrativa do CRUD de empresas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Menu,
  Moon,
  Sun,
  Building2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import CompanyForm from "../components/CompanyForm";
import { useCompanies } from "../contexts/CompaniesContext";

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { companies, createCompany, updateCompany, removeCompany } = useCompanies();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("rh_sedes_theme") || "light");

  const isAdmin = sessionStorage.getItem("rh_sedes_role") === "ADMIN";

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return companies;

    return companies.filter((company) =>
      [
        company.legalName,
        company.tradeName,
        company.cnpj,
        company.manager,
        company.email,
        company.status,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [companies, search]);

  /**
   * Executa a responsabilidade denominada “toggle theme” neste módulo.
   */
  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("rh_sedes_theme", nextTheme);
  }

  /**
   * Executa a responsabilidade denominada “logout” neste módulo.
   */
  function logout() {
    sessionStorage.removeItem("rh_sedes_logged");
    sessionStorage.removeItem("rh_sedes_role");
    sessionStorage.removeItem("rh_sedes_token");
    sessionStorage.removeItem("rh_sedes_user");
    navigate("/");
  }

  /**
   * Executa a responsabilidade denominada “open create” neste módulo.
   */
  function openCreate() {
    setSelected(null);
    setMode("create");
  }

  /**
   * Executa a responsabilidade denominada “open view” neste módulo.
   */
  function openView(company) {
    setSelected(company);
    setMode("view");
  }

  /**
   * Executa a responsabilidade denominada “open edit” neste módulo.
   */
  function openEdit(company) {
    setSelected(company);
    setMode("edit");
  }

  /**
   * Executa a responsabilidade denominada “save company” neste módulo.
   */
  function saveCompany(data) {
    if (mode === "edit") {
      updateCompany(selected.id, data);
    } else {
      createCompany(data);
    }

    setMode("");
    setSelected(null);
  }

  /**
   * Executa a responsabilidade denominada “delete company” neste módulo.
   */
  function deleteCompany(company) {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      `Excluir a empresa ${company.tradeName}?`
    );

    if (!confirmed) return;

    removeCompany(company.id);

    if (selected?.id === company.id) {
      setMode("");
      setSelected(null);
    }
  }

  return (
    <div className={`dashboard-shell ${theme}`}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
      />

      <div className="dashboard-main">
        <header className="topbar">
          <div className="topbar-title-group">
            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1>Empresas</h1>
              <p>Gerenciamento das empresas cadastradas</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="button button-primary" onClick={openCreate}>
              <Plus size={18} />
              <span>Nova empresa</span>
            </button>

            <div className="user-avatar" title={isAdmin ? "Administrador" : "Usuário"}>
              {isAdmin ? "AD" : "US"}
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="people-summary-card">
            <div>
              <Building2 size={26} />
              <div>
                <strong>Empresas</strong>
                <br/>
                <span>Consulte, cadastre e edite as empresas vinculadas.</span>
              </div>
            </div>
            <span>{filtered.length} registro(s)</span>
          </section>

          <section className="table-card">
            <div className="people-toolbar">
              <div className="search-box">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar por empresa, CNPJ, responsável ou e-mail"
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="companies-table">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>CNPJ</th>
                    <th>Responsável</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((company) => (
                    <tr key={company.id}>
                      <td>
                        <div className="person-cell">
                          <div className="company-avatar">
                            {company.tradeName
                              .split(" ")
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <strong>{company.tradeName}</strong>
                            <small>{company.legalName}</small>
                          </div>
                        </div>
                      </td>

                      <td>{company.cnpj}</td>
                      <td>{company.manager || "—"}</td>
                      <td>{company.phone || "—"}</td>
                      <td>{company.email}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            company.status === "ATIVA" ? "working" : "not-working"
                          }`}
                        >
                          {company.status === "ATIVA" ? "Ativa" : "Inativa"}
                        </span>
                      </td>

                      <td>
                        <div className="actions">
                          <button onClick={() => openView(company)} title="Visualizar">
                            <Eye size={17} />
                          </button>

                          <button onClick={() => openEdit(company)} title="Editar">
                            <Pencil size={17} />
                          </button>

                          {isAdmin && (
                            <button
                              className="danger-action"
                              onClick={() => deleteCompany(company)}
                              title="Excluir"
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-results">
                        Nenhuma empresa encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {(mode === "create" || mode === "edit") && (
        <Modal
          title={mode === "create" ? "Cadastrar empresa" : "Editar empresa"}
          onClose={() => setMode("")}
        >
          <CompanyForm
            initialData={selected}
            onSave={saveCompany}
            onCancel={() => setMode("")}
          />
        </Modal>
      )}

      {mode === "view" && selected && (
        <Modal title="Ficha da empresa" onClose={() => setMode("")}>
          <section className="registration-sheet">
            <div className="registration-sheet-header">
              <div className="company-avatar company-avatar-large">
                {selected.tradeName
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <h3>{selected.tradeName}</h3>
                <p>{selected.legalName}</p>
              </div>
            </div>

            <h4>Dados cadastrais</h4>
            <div className="details-grid">
              <div><strong>CNPJ</strong><span>{selected.cnpj}</span></div>
              <div>
                <strong>Status</strong>
                <span>{selected.status === "ATIVA" ? "Ativa" : "Inativa"}</span>
              </div>
              <div><strong>Responsável</strong><span>{selected.manager || "—"}</span></div>
              <div><strong>Telefone</strong><span>{selected.phone || "—"}</span></div>
              <div className="form-span-2">
                <strong>E-mail</strong>
                <span>{selected.email}</span>
              </div>
            </div>

            <h4>Observações</h4>
            <div className="company-notes">
              {selected.notes || "Nenhuma observação cadastrada."}
            </div>

            {isAdmin && (
              <div className="registration-admin-actions">
                <button className="button button-secondary" onClick={() => openEdit(selected)}>
                  <Pencil size={17} />
                  Editar empresa
                </button>

                <button className="button button-danger" onClick={() => deleteCompany(selected)}>
                  <Trash2 size={17} />
                  Excluir empresa
                </button>
              </div>
            )}
          </section>
        </Modal>
      )}
    </div>
  );
}
