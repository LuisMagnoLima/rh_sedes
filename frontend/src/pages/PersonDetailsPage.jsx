/**
 * Arquivo: frontend/src/pages/PersonDetailsPage.jsx
 *
 * Responsabilidade:
 * Página de consulta detalhada e operações administrativas sobre uma pessoa.
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
  Wrench,
  XCircle,
  Trash2,
  UserMinus,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import PageTopbar from "../components/PageTopbar";
import { usePeople } from "../contexts/PeopleContext";
import VacationControl from "../components/VacationControl";

/**
 * Executa a responsabilidade denominada “format date” neste módulo.
 */
function formatDate(value) {
  if (!value) return "Não informado";

  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Executa a responsabilidade denominada “initials” neste módulo.
 */
function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function PersonDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getPersonById, loadingPeople, removePerson, removeSedesContract, reactivateSedesContract } = usePeople();
  const person = getPersonById(id);

  const [theme, setTheme] = useState(
    localStorage.getItem("rh_sedes_theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const isAdmin = sessionStorage.getItem("rh_sedes_role") === "ADMIN";

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
   * Executa a responsabilidade denominada “handle delete person” neste módulo.
   */
  async function handleDeletePerson() {
    const confirmed = window.confirm(
      `Excluir definitivamente o cadastro de ${person.name}? Esta ação apaga a pessoa do sistema e não pode ser desfeita.`
    );

    if (!confirmed) return;

    try {
      setActionError("");
      setActionLoading("person");
      await removePerson(person.id);
      navigate("/pessoas", { state: { deleted: true } });
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Não foi possível excluir o cadastro."
      );
    } finally {
      setActionLoading("");
    }
  }

  /**
   * Executa a responsabilidade denominada “handle reactivate sedes contract” neste módulo.
   */
  async function handleReactivateSedesContract() {
    const confirmed = window.confirm(
      `Reativar ${person.name} como contratado da SEDES?`
    );

    if (!confirmed) return;

    try {
      setActionError("");
      setActionLoading("reactivate");
      await reactivateSedesContract(person.id);
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Não foi possível reativar o contrato."
      );
    } finally {
      setActionLoading("");
    }
  }

  /**
   * Executa a responsabilidade denominada “handle remove sedes contract” neste módulo.
   */
  async function handleRemoveSedesContract() {
    const confirmed = window.confirm(
      `Remover ${person.name} dos contratados da SEDES? O cadastro da pessoa continuará no sistema.`
    );

    if (!confirmed) return;

    try {
      setActionError("");
      setActionLoading("contract");
      await removeSedesContract(person.id);
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Não foi possível remover o contrato SEDES."
      );
    } finally {
      setActionLoading("");
    }
  }

  if (loadingPeople) {
    return (
      <div className={`dashboard-shell ${theme}`}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={logout}
        />
        <div className="dashboard-main">
          <PageTopbar
            title="Visualizar cadastro"
            subtitle="Carregando ficha cadastral"
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <main className="dashboard-content">
            <p>Carregando cadastro...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!person && !loadingPeople) {
    return (
      <div className={`dashboard-shell ${theme}`}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={logout}
        />

        <div className="dashboard-main">
          <PageTopbar
            title="Cadastro não encontrado"
            subtitle="O registro solicitado não está disponível"
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSidebar={() => setSidebarOpen(true)}
            actions={
              <button
                className="button button-secondary"
                onClick={() => navigate("/pessoas")}
              >
                <ArrowLeft size={18} />
                Voltar para pessoas
              </button>
            }
          />

          <main className="dashboard-content">
            <section className="empty-details-card">
              <UserRound size={42} />
              <h2>Cadastro inexistente</h2>
              <p>Verifique o endereço ou retorne para a lista de pessoas.</p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  const talentPool = person.employmentType === "BANCO_TALENTOS";

  return (
    <div className={`dashboard-shell ${theme}`}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
      />

      <div className="dashboard-main">
        <PageTopbar
          title="Visualizar cadastro"
          subtitle="Ficha completa da pessoa selecionada"
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
          actions={
            <>
              <button
                className="button button-secondary"
                onClick={() => navigate("/pessoas")}
              >
                <ArrowLeft size={18} />
                Voltar
              </button>

              {isAdmin && (
                <button
                  className="button button-primary"
                  onClick={() =>
                    navigate("/pessoas", {
                      state: { editPersonId: person.id },
                    })
                  }
                >
                  <Pencil size={18} />
                  Editar
                </button>
              )}
            </>
          }
        />

        <main className="dashboard-content">
          {location.state?.created && (
            <div className="success-banner">
              <CheckCircle2 size={20} />
              Cadastro criado com sucesso.
            </div>
          )}

          <section className="person-profile-card">
            <div className="person-profile-avatar">
              {initials(person.name)}
            </div>

            <div className="person-profile-heading">
              <span className="record-label">Ficha cadastral</span>
              <h2>{person.name}</h2>
              {isAdmin && <VacationControl person={person} />}
              <p>{person.email || "E-mail não informado"}</p>
            </div>

            <div className="profile-status-stack">
              <span className={`status-badge ${talentPool && person.working ? "working" : "not-working"}`}>
                {talentPool
                  ? person.working
                    ? "Trabalhando"
                    : "Não trabalhando"
                  : person.sedesContractActive === false
                    ? "Ex-contratado SEDES"
                    : "Contratado SEDES"}
              </span>

              {person.vacation && (
                <span className="vacation-badge">
                  <CalendarDays size={15} />
                  Em férias
                </span>
              )}
            </div>
          </section>

          <section className="details-section-card">
            <div className="details-section-header">
              <UserRound size={21} />
              <div>
                <h3>Informações pessoais</h3>
                <p>Dados principais de identificação e contato.</p>
              </div>
            </div>

            <div className="details-grid details-grid-page">
              <div>
                <strong>Nome completo</strong>
                <span>{person.name}</span>
              </div>
              <div>
                <strong>CPF</strong>
                <span>{person.cpf}</span>
              </div>
              <div>
                <strong>Data de nascimento</strong>
                <span>{formatDate(person.birthDate)}</span>
              </div>
              <div>
                <strong>Telefone</strong>
                <span className="detail-with-icon">
                  <Phone size={16} />
                  {person.phone || "Não informado"}
                </span>
              </div>
              <div className="detail-span-2">
                <strong>E-mail</strong>
                <span className="detail-with-icon">
                  <Mail size={16} />
                  {person.email || "Não informado"}
                </span>
              </div>
            </div>
          </section>

          <section className="details-section-card">
            <div className="details-section-header">
              <GraduationCap size={21} />
              <div>
                <h3>Formação e tecnologias</h3>
                <p>Curso informado e conhecimentos técnicos.</p>
              </div>
            </div>

            <div className="details-grid details-grid-page">
              <div className="detail-span-2">
                <strong>Curso</strong>
                <span>{person.course || "Não informado"}</span>
              </div>

              <div className="detail-span-2">
                <strong>Tecnologias</strong>
                <div className="tag-list details-tag-list">
                  {person.technologies?.length ? (
                    person.technologies.map((technology) => (
                      <span className="tag" key={technology}>
                        <Wrench size={13} />
                        {technology}
                      </span>
                    ))
                  ) : (
                    <span>Nenhuma tecnologia informada</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="details-section-card">
            <div className="details-section-header">
              {talentPool ? <BriefcaseBusiness size={21} /> : <ShieldCheck size={21} />}
              <div>
                <h3>Vínculo profissional</h3>
                <p>Informações relacionadas à atuação da pessoa.</p>
              </div>
            </div>

            <div className="details-grid details-grid-page">
              <div>
                <strong>Tipo de vínculo</strong>
                <span>
                  {talentPool ? "Banco de Talentos" : person.sedesContractActive === false
                    ? "Ex-contratado SEDES"
                    : "Contratado SEDES"}
                </span>
              </div>

              {talentPool ? (
                <>
                  <div>
                    <strong>Empresa</strong>
                    <span className="detail-with-icon">
                      <Building2 size={16} />
                      {person.company || "Não informada"}
                    </span>
                  </div>

                  <div>
                    <strong>Situação</strong>
                    <span className="detail-with-icon">
                      {person.working ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {person.working ? "Trabalhando" : "Não trabalhando"}
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  <strong>Setor</strong>
                  <span className="detail-with-icon">
                    <MapPin size={16} />
                    {person.sector || "Não informado"}
                  </span>
                </div>
              )}

              <div>
                <strong>Férias</strong>
                <span>
                  {person.vacation && person.vacationStart && person.vacationEnd
                    ? `${formatDate(person.vacationStart)} até ${formatDate(person.vacationEnd)}`
                    : "Não"}
                </span>
              </div>
            </div>
          </section>

          {isAdmin && (
            <section className="details-section-card danger-zone-card">
              <div className="details-section-header">
                <Trash2 size={21} />
                <div>
                  <h3>Exclusão de cadastro</h3>
                  <p>Estas ações são visíveis apenas para administradores.</p>
                </div>
              </div>

              {actionError && <p className="form-error">{actionError}</p>}

              <div className="admin-delete-actions">
                {person.employmentType === "SEDES" &&
                  person.sedesContractActive !== false && (
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={handleRemoveSedesContract}
                      disabled={Boolean(actionLoading)}
                    >
                      <UserMinus size={18} />
                      {actionLoading === "contract"
                        ? "Removendo contrato..."
                        : "Excluir contratado"}
                    </button>
                  )}

                {person.employmentType === "SEDES" &&
                  person.sedesContractActive === false && (
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={handleReactivateSedesContract}
                      disabled={Boolean(actionLoading)}
                    >
                      <UserMinus size={18} />
                      {actionLoading === "reactivate"
                        ? "Reativando..."
                        : "Reativar contratado"}
                    </button>
                  )}

                <button
                  type="button"
                  className="button button-danger"
                  onClick={handleDeletePerson}
                  disabled={Boolean(actionLoading)}
                >
                  <Trash2 size={18} />
                  {actionLoading === "person"
                    ? "Excluindo pessoa..."
                    : "Excluir pessoa"}
                </button>
              </div>

              <div className="delete-action-explanation">
                <p>
                  <strong>Excluir contratado:</strong> remove apenas o vínculo com
                  a SEDES. A pessoa continua cadastrada no sistema.
                </p>
                <p>
                  <strong>Excluir pessoa:</strong> apaga definitivamente todo o
                  cadastro da pessoa.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
