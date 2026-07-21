import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Cpu, Menu, Moon, Plus, Sun, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useCatalog } from "../contexts/CatalogContext";

export default function TechnologyCoursePage() {
  const navigate = useNavigate();
  const { technologies, courses, addTechnology, removeTechnology, addCourse, removeCourse } = useCatalog();
  const [technology, setTechnology] = useState("");
  const [course, setCourse] = useState("");
  const [technologyError, setTechnologyError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("rh_sedes_theme") || "light");
  const isAdmin = sessionStorage.getItem("rh_sedes_role") === "ADMIN";

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("rh_sedes_theme", nextTheme);
  }

  function logout() {
    sessionStorage.removeItem("rh_sedes_logged");
    sessionStorage.removeItem("rh_sedes_role");
    sessionStorage.removeItem("rh_sedes_token");
    sessionStorage.removeItem("rh_sedes_user");
    navigate("/");
  }

  function handleTechnologySubmit(event) {
    event.preventDefault();
    try {
      addTechnology(technology);
      setTechnology("");
      setTechnologyError("");
    } catch (error) {
      setTechnologyError(error.message);
    }
  }

  function handleCourseSubmit(event) {
    event.preventDefault();
    try {
      addCourse(course);
      setCourse("");
      setCourseError("");
    } catch (error) {
      setCourseError(error.message);
    }
  }

  function confirmRemoveTechnology(name) {
    if (!isAdmin) return;
    if (window.confirm(`Remover a tecnologia "${name}" da lista?`)) removeTechnology(name);
  }

  function confirmRemoveCourse(name) {
    if (!isAdmin) return;
    if (window.confirm(`Remover o curso "${name}" da lista?`)) removeCourse(name);
  }

  return (
    <div className={`dashboard-shell ${theme}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={logout} />

      <div className="dashboard-main">
        <header className="topbar">
          <div className="topbar-title-group">
            <button className="mobile-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
              <Menu size={21} />
            </button>
            <div>
              <h1>Tecnologia/Curso</h1>
              <p>Cadastro das tecnologias e dos cursos disponíveis nos formulários</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="user-avatar" title={isAdmin ? "Administrador" : "Usuário"}>
              {isAdmin ? "AD" : "US"}
            </div>
          </div>
        </header>

        <main className="dashboard-content catalog-page">
          <section className="catalog-card">
            <div className="catalog-card-heading">
              <div className="catalog-icon"><Cpu size={24} /></div>
              <div>
                <h2>Tecnologias</h2>
                <p>Cadastre as tecnologias que poderão ser selecionadas no cadastro de pessoas.</p>
              </div>
            </div>

            <form className="catalog-form" onSubmit={handleTechnologySubmit}>
              <div className="form-field">
                <label htmlFor="technology-name">Nome da tecnologia</label>
                <input
                  id="technology-name"
                  value={technology}
                  onChange={(event) => setTechnology(event.target.value)}
                  placeholder="Ex.: React, Java, Python"
                  disabled={!isAdmin}
                />
              </div>
              <button className="button button-primary" type="submit" disabled={!isAdmin}>
                <Plus size={18} /> Adicionar tecnologia
              </button>
            </form>
            {technologyError && <p className="form-error">{technologyError}</p>}

            <div className="catalog-list" aria-label="Tecnologias cadastradas">
              {technologies.map((item) => (
                <div className="catalog-list-item" key={item}>
                  <span>{item}</span>
                  {isAdmin && (
                    <button type="button" onClick={() => confirmRemoveTechnology(item)} aria-label={`Remover ${item}`}>
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="catalog-card">
            <div className="catalog-card-heading">
              <div className="catalog-icon"><BookOpen size={24} /></div>
              <div>
                <h2>Cursos</h2>
                <p>Cadastre os cursos que aparecerão no campo Curso do cadastro de pessoas.</p>
              </div>
            </div>

            <form className="catalog-form" onSubmit={handleCourseSubmit}>
              <div className="form-field">
                <label htmlFor="course-name">Nome do curso</label>
                <input
                  id="course-name"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  placeholder="Ex.: Sistemas de Informação"
                  disabled={!isAdmin}
                />
              </div>
              <button className="button button-primary" type="submit" disabled={!isAdmin}>
                <Plus size={18} /> Adicionar curso
              </button>
            </form>
            {courseError && <p className="form-error">{courseError}</p>}

            <div className="catalog-list" aria-label="Cursos cadastrados">
              {courses.map((item) => (
                <div className="catalog-list-item" key={item}>
                  <span>{item}</span>
                  {isAdmin && (
                    <button type="button" onClick={() => confirmRemoveCourse(item)} aria-label={`Remover ${item}`}>
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
