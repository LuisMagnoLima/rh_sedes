/**
 * Arquivo: frontend/src/pages/NewPersonPage.jsx
 *
 * Responsabilidade:
 * Página dedicada ao cadastro de uma nova pessoa.
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
import { ArrowLeft, Building2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PageTopbar from "../components/PageTopbar";
import PeopleForm from "../components/PeopleForm";
import CompanyForm from "../components/CompanyForm";
import Modal from "../components/Modal";
import { useCompanies } from "../contexts/CompaniesContext";
import { usePeople } from "../contexts/PeopleContext";

export default function NewPersonPage() {
  const navigate = useNavigate();
  const { companies, createCompany } = useCompanies();
  const { createPerson } = usePeople();

  const [theme, setTheme] = useState(
    localStorage.getItem("rh_sedes_theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [onCompanyCreated, setOnCompanyCreated] = useState(null);
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
   * Executa a responsabilidade denominada “save person” neste módulo.
   */
  async function savePerson(data) {
    const person = await createPerson(data);
    navigate(`/pessoas/${person.id}`, {
      state: { created: true },
    });
  }


  function openCompanyModal(callback) {
    if (!isAdmin) return;
    setOnCompanyCreated(() => callback);
    setCompanyModalOpen(true);
  }

  function closeCompanyModal() {
    setCompanyModalOpen(false);
    setOnCompanyCreated(null);
  }

  async function saveCompanyFromPersonForm(data) {
    const company = await createCompany({ ...data, status: "ATIVA" });
    onCompanyCreated?.(company);
    closeCompanyModal();
  }

  return (
    <div className={`dashboard-shell ${theme}`}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
      />

      <div className="dashboard-main">
        <PageTopbar
          title="Novo cadastro"
          subtitle="Preencha os dados para cadastrar uma nova pessoa"
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
          actions={
            <button
              className="button button-secondary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
          }
        />

        <main className="dashboard-content">
          <section className="page-intro-card">
            <div className="page-intro-icon">
              <UserPlus size={28} />
            </div>
            <div>
              <h2>Dados do novo cadastro</h2>
              <p>
                Os campos mudam conforme o tipo de vínculo selecionado.
              </p>
            </div>
          </section>

          <section className="form-page-card">
            <PeopleForm
              companies={companies}
              onSave={savePerson}
              onCancel={() => navigate(-1)}
              canCreateCompany={isAdmin}
              onCreateCompany={openCompanyModal}
            />
          </section>
        </main>
      </div>

      {companyModalOpen && (
        <Modal title="Adicionar nova empresa" onClose={closeCompanyModal}>
          <div className="inline-company-modal-intro">
            <Building2 size={22} />
            <div>
              <strong>Cadastro rápido de empresa</strong>
              <span>
                A empresa será cadastrada como ativa e selecionada automaticamente no cadastro da pessoa.
              </span>
            </div>
          </div>

          <CompanyForm
            onSave={saveCompanyFromPersonForm}
            onCancel={closeCompanyModal}
          />
        </Modal>
      )}
    </div>
  );
}
