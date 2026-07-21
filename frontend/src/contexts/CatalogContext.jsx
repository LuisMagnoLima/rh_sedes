import { createContext, useContext, useMemo, useState } from "react";
import { filters } from "../data/mockData";

const CatalogContext = createContext(null);
const TECHNOLOGIES_KEY = "rh_sedes_technologies";
const COURSES_KEY = "rh_sedes_courses";

function readList(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {
    // Se o navegador tiver um valor inválido, utiliza a lista padrão.
  }
  return fallback;
}

function normalizeList(values) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
}

export function CatalogProvider({ children }) {
  const [technologies, setTechnologies] = useState(() =>
    normalizeList(readList(TECHNOLOGIES_KEY, filters.technologies))
  );
  const [courses, setCourses] = useState(() =>
    normalizeList(readList(COURSES_KEY, filters.courses))
  );

  function saveTechnologies(next) {
    const normalized = normalizeList(next);
    setTechnologies(normalized);
    localStorage.setItem(TECHNOLOGIES_KEY, JSON.stringify(normalized));
  }

  function saveCourses(next) {
    const normalized = normalizeList(next);
    setCourses(normalized);
    localStorage.setItem(COURSES_KEY, JSON.stringify(normalized));
  }

  function addTechnology(name) {
    const value = name.trim();
    if (!value) throw new Error("Digite o nome da tecnologia.");
    if (technologies.some((item) => item.localeCompare(value, "pt-BR", { sensitivity: "base" }) === 0)) {
      throw new Error("Essa tecnologia já está cadastrada.");
    }
    saveTechnologies([...technologies, value]);
  }

  function removeTechnology(name) {
    saveTechnologies(technologies.filter((item) => item !== name));
  }

  function addCourse(name) {
    const value = name.trim();
    if (!value) throw new Error("Digite o nome do curso.");
    if (courses.some((item) => item.localeCompare(value, "pt-BR", { sensitivity: "base" }) === 0)) {
      throw new Error("Esse curso já está cadastrado.");
    }
    saveCourses([...courses, value]);
  }

  function removeCourse(name) {
    saveCourses(courses.filter((item) => item !== name));
  }

  const value = useMemo(
    () => ({ technologies, courses, addTechnology, removeTechnology, addCourse, removeCourse }),
    [technologies, courses]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog deve ser utilizado dentro de CatalogProvider.");
  return context;
}
