/**
 * Arquivo: frontend/src/pages/PeoplePage.jsx
 *
 * Responsabilidade:
 * Página de listagem, pesquisa e edição das pessoas cadastradas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Menu,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import PeopleForm from "../components/PeopleForm";
import Modal from "../components/Modal";
import VacationControl from "../components/VacationControl";
import Sidebar from "../components/Sidebar";
import { useCompanies } from "../contexts/CompaniesContext";
import { usePeople } from "../contexts/PeopleContext";

export default function PeoplePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { companies } = useCompanies();
  const {
    people,
    updatePerson,
    removePerson,
    loadingPeople,
    peopleError,
  } = usePeople();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("rh_sedes_theme") || "light");

  const isAdmin = sessionStorage.getItem("rh_sedes_role") === "ADMIN";


  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return people;

    return people.filter((person) =>
      [
        person.name,
        person.cpf,
        person.email,
        person.company,
        person.sector,
        person.course,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [people, search]);

  useEffect(() => {
    const editPersonId = location.state?.editPersonId;

    if (!editPersonId || loadingPeople) {
      return;
    }

    const personToEdit = people.find(
      (person) => String(person.id) === String(editPersonId)
    );

    if (personToEdit) {
      setSelected(personToEdit);
      setMode("edit");
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, loadingPeople, navigate, people]);

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
    navigate("/pessoas/novo");
  }

  /**
   * Executa a responsabilidade denominada “open view” neste módulo.
   */
  function openView(person) {
    navigate(`/pessoas/${person.id}`);
  }

  /**
   * Executa a responsabilidade denominada “open edit” neste módulo.
   */
  function openEdit(person) {
    setSelected(person);
    setMode("edit");
  }

  /**
   * Executa a responsabilidade denominada “save person” neste módulo.
   */
  async function savePerson(data) {
    if (mode === "edit") {
      await updatePerson(selected.id, data);
    }

    setMode("");
    setSelected(null);
  }

  /**
   * Executa a responsabilidade denominada “delete person” neste módulo.
   */
  async function deletePerson(person) {
    if (!isAdmin) return;

    const confirmed = window.confirm(`Excluir o cadastro de ${person.name}?`);
    if (!confirmed) return;

    await removePerson(person.id);
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
              <h1>Pessoas</h1>
              <p>Visualização e gerenciamento dos cadastros</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAdmin && (
              <button className="button button-primary" onClick={openCreate}>
                <Plus size={18} />
                <span>Novo cadastro</span>
              </button>
            )}

            <div className="user-avatar" title={isAdmin ? "Administrador" : "Usuário"}>
              {isAdmin ? "AD" : "US"}
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          {peopleError && <p className="form-error">{peopleError}</p>}
          {loadingPeople && <p>Carregando cadastros...</p>}

          <section className="people-summary-card">
            <div>
              <UserRound size={26} />
              <div>
                <strong>Cadastros de pessoas</strong>
                <span>Consulte a ficha completa pelo botão visualizar.</span>
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
                  placeholder="Pesquisar por nome, CPF, empresa, setor ou curso"
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="people-management-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Vínculo</th>
                    <th>Empresa</th>
                    <th>Setor</th>
                    <th>Status</th>
                    <th>Curso</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((person) => (
                    <tr key={person.id}>
                      <td>
                        <div className="person-cell">
                          <div className="person-avatar">
                            {person.name
                              .split(" ")
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <span>{person.name}</span>
                        </div>
                      </td>

                      <td>
                        {person.employmentType === "BANCO_TALENTOS"
                          ? "Banco de Talentos"
                          : selected.sedesContractActive === false
                            ? "Ex-contratado SEDES"
                            : "Contratado SEDES"}
                      </td>

                      <td>{person.company || "—"}</td>
                      <td>{person.sector || "—"}</td>

                      <td>
                        {person.employmentType === "BANCO_TALENTOS"
                          ? person.working
                            ? "Trabalhando"
                            : "Não trabalhando"
                          : selected.sedesContractActive === false
                            ? "Contrato removido"
                            : "Não se aplica"}
                      </td>

                      <td>{person.course}</td>

                      <td>
                        <div className="actions">
                          <button onClick={() => openView(person)} title="Visualizar ficha">
                            <Eye size={17} />
                          </button>

                          {isAdmin && (
                            <button onClick={() => openEdit(person)} title="Editar">
                              <Pencil size={17} />
                            </button>
                          )}

                          {isAdmin && (
                            <button
                              className="danger-action"
                              onClick={() => deletePerson(person)}
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
                        Nenhuma pessoa encontrada.
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
          title={mode === "create" ? "Cadastrar pessoa" : "Editar pessoa"}
          onClose={() => setMode("")}
        >
          {mode === "edit" && selected && isAdmin && (
            <div className="edit-person-vacation-header">
              <strong>{selected.name}</strong>
              <VacationControl person={selected} onUpdated={setSelected} />
            </div>
          )}
          <PeopleForm
            initialData={selected}
            companies={companies}
            onSave={savePerson}
            onCancel={() => setMode("")}
          />
        </Modal>
      )}

      {mode === "view" && selected && (
        <Modal title="Ficha cadastral" onClose={() => setMode("")}>
          <section className="registration-sheet">
            <div className="registration-sheet-header">
              <div className="registration-avatar">
                {selected.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <h3>{selected.name}</h3>
                {isAdmin && (
                  <VacationControl person={selected} onUpdated={setSelected} />
                )}
                <p>
                  {selected.employmentType === "BANCO_TALENTOS"
                    ? "Banco de Talentos"
                    : "Contratado SEDES"}
                </p>
              </div>
            </div>

            <h4>Dados pessoais</h4>
            <div className="details-grid">
              <div><strong>CPF</strong><span>{selected.cpf}</span></div>
              <div><strong>Data de nascimento</strong><span>{selected.birthDate || "—"}</span></div>
              <div><strong>Telefone</strong><span>{selected.phone || "—"}</span></div>
              <div><strong>E-mail</strong><span>{selected.email}</span></div>
            </div>

            <h4>Formação e tecnologias</h4>
            <div className="details-grid">
              <div className="form-span-2"><strong>Curso</strong><span>{selected.course}</span></div>
              <div className="form-span-2">
                <strong>Tecnologias</strong>
                <span>{selected.technologies.join(", ") || "Nenhuma"}</span>
              </div>
            </div>

            <h4>Dados profissionais</h4>
            <div className="details-grid">
              <div>
                <strong>Tipo de vínculo</strong>
                <span>
                  {selected.employmentType === "BANCO_TALENTOS"
                    ? "Banco de Talentos"
                    : "Contratado SEDES"}
                </span>
              </div>
              <div><strong>Empresa</strong><span>{selected.company || "Não se aplica"}</span></div>
              <div><strong>Setor</strong><span>{selected.sector || "Não se aplica"}</span></div>
              <div>
                <strong>Está trabalhando?</strong>
                <span>
                  {selected.employmentType === "BANCO_TALENTOS"
                    ? selected.working
                      ? "Sim"
                      : "Não"
                    : selected.sedesContractActive === false
                            ? "Contrato removido"
                            : "Não se aplica"}
                </span>
              </div>
              <div>
                <strong>Férias</strong>
                <span>
                  {selected.vacation && selected.vacationStart && selected.vacationEnd
                    ? `${selected.vacationStart.split("-").reverse().join("/")} até ${selected.vacationEnd.split("-").reverse().join("/")}`
                    : "Não"}
                </span>
              </div>
            </div>

            {isAdmin && (
              <div className="registration-admin-actions">
                <button className="button button-secondary" onClick={() => openEdit(selected)}>
                  <Pencil size={17} />
                  Editar cadastro
                </button>
                <button className="button button-danger" onClick={() => deletePerson(selected)}>
                  <Trash2 size={17} />
                  Excluir cadastro
                </button>
              </div>
            )}
          </section>
        </Modal>
      )}
    </div>
  );
}
