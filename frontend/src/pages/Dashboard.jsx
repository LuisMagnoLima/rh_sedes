/**
 * Arquivo: frontend/src/pages/Dashboard.jsx
 *
 * Responsabilidade:
 * Painel inicial com indicadores, filtros e atalhos para os principais registros.
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
  Users,
  UserCheck,
  UserX,
  Cpu,
  Building2,
  Palmtree,
  RotateCcw,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import PeopleTable from "../components/PeopleTable";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import { filters } from "../data/mockData";
import { usePeople } from "../contexts/PeopleContext";
import { useCompanies } from "../contexts/CompaniesContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { people, loadingPeople, peopleError, removePerson } = usePeople();
  const { companies } = useCompanies();
  const isAdmin = sessionStorage.getItem("rh_sedes_role") === "ADMIN";
  const [theme, setTheme] = useState(localStorage.getItem("rh_sedes_theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [technology, setTechnology] = useState("");
  const [sector, setSector] = useState("");

  const filtered = useMemo(() => {
    return people.filter((person) => {
      const byName = person.name.toLowerCase().includes(search.trim().toLowerCase());
      const byCourse = !course || person.course === course;
      const byCompany = !company || person.company === company;
      const personStatus = person.working ? "Trabalhando" : "Não trabalhando";
      const byStatus = !status || personStatus === status;
      const byTechnology = !technology || person.technologies.includes(technology);
      const bySector = !sector || person.sector === sector;

      return byName && byCourse && byCompany && byStatus && byTechnology && bySector;
    });
  }, [people, search, course, company, status, technology, sector]);

  const talentPool = filtered.filter((person) => person.employmentType === "BANCO_TALENTOS");
  const headquarters = filtered.filter((person) => person.employmentType === "SEDES" && person.sedesContractActive !== false);

  const technologyCount = new Set(people.flatMap((person) => person.technologies)).size;

  const activeFilters = [search, course, company, status, technology, sector].filter(Boolean).length;

  /**
   * Executa a responsabilidade denominada “toggle theme” neste módulo.
   */
  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("rh_sedes_theme", nextTheme);
  }

  /**
   * Executa a responsabilidade denominada “clear filters” neste módulo.
   */
  function clearFilters() {
    setSearch("");
    setCourse("");
    setCompany("");
    setStatus("");
    setTechnology("");
    setSector("");
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


  async function handleDeletePerson(person) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o cadastro de ${person.name}?`
    );

    if (!confirmed) return;

    try {
      await removePerson(person.id);
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Não foi possível excluir o cadastro."
      );
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
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setSidebarOpen(true)}
          onNewRegistration={isAdmin ? () => navigate("/pessoas/novo") : undefined}
        />

        <main className="dashboard-content">
          {peopleError && <p className="form-error">{peopleError}</p>}
          {loadingPeople && <p>Carregando dados do dashboard...</p>}

          <section className="stats-grid">
            <StatCard
              title="Total de Pessoas"
              value={people.length}
              subtitle="Cadastros ativos"
              tone="blue"
              icon={Users}
            />
            <StatCard
              title="Trabalhando"
              value={people.filter((person) => person.working).length}
              subtitle="Em atividade"
              tone="green"
              icon={UserCheck}
            />
            <StatCard
              title="Não Trabalhando"
              value={people.filter((person) => !person.working).length}
              subtitle="Fora de atividade"
              tone="orange"
              icon={UserX}
            />
            <StatCard
              title="Tecnologias"
              value={technologyCount}
              subtitle="Tecnologias utilizadas"
              tone="purple"
              icon={Cpu}
            />
            <StatCard
              title="Contratados SEDES"
              value={people.filter((person) => person.employmentType === "SEDES" && person.sedesContractActive !== false).length}
              subtitle="Equipe da sede"
              tone="cyan"
              icon={Building2}
            />
            <StatCard
              title="Em Férias"
              value={people.filter((person) => person.vacation).length}
              subtitle="No período atual"
              tone="pink"
              icon={Palmtree}
            />
          </section>

          <section className="filters-card">
            <div className="filters-header">
              <div>
                <h2>Filtros</h2>
                <p>
                  Os resultados são atualizados automaticamente.
                  {activeFilters > 0 ? ` ${activeFilters} filtro(s) ativo(s).` : ""}
                </p>
              </div>

              {activeFilters > 0 && (
                <Button variant="secondary" onClick={clearFilters}>
                  <RotateCcw size={17} />
                  Limpar filtros
                </Button>
              )}
            </div>

            <div className="filters-grid">
              <FormInput
                label="Pesquisar por nome"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Digite o nome da pessoa"
              />

              <FormSelect
                label="Curso"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                options={filters.courses}
              />

              <FormSelect
                label="Empresa"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                options={companies.map((item) => item.tradeName)}
                placeholder="Todas"
              />

              <FormSelect
                label="Status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                options={["Trabalhando", "Não trabalhando"]}
              />

              <FormSelect
                label="Tecnologia"
                value={technology}
                onChange={(event) => setTechnology(event.target.value)}
                options={filters.technologies}
                placeholder="Todas"
              />

              <FormSelect
                label="Setor"
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                options={filters.sectors}
              />
            </div>
          </section>

          <PeopleTable
            title="Banco de Talentos"
            rows={talentPool}
            onView={(person) => navigate(`/pessoas/${person.id}`)}
            onEdit={
              isAdmin
                ? (person) =>
                    navigate("/pessoas", {
                      state: { editPersonId: person.id },
                    })
                : undefined
            }
            onDelete={isAdmin ? handleDeletePerson : undefined}
          />
          <PeopleTable
            title="Contratados da SEDES"
            rows={headquarters}
            onView={(person) => navigate(`/pessoas/${person.id}`)}
            onEdit={
              isAdmin
                ? (person) =>
                    navigate("/pessoas", {
                      state: { editPersonId: person.id },
                    })
                : undefined
            }
            onDelete={isAdmin ? handleDeletePerson : undefined}
          />
        </main>
      </div>
    </div>
  );
}
