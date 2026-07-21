import { useEffect, useState } from "react";
import { filters } from "../data/mockData";

const initialState = {
  name: "",
  cpf: "",
  phone: "",
  email: "",
  birthDate: "",
  course: "",
  technologies: [],
  employmentType: "BANCO_TALENTOS",
  companyId: "",
  company: "",
  working: false,
  sector: "",
};

export default function PeopleForm({
  initialData,
  companies = [],
  onSave,
  onCancel,
  onCreateCompany,
  canCreateCompany = false,
}) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialState,
        ...initialData,
        employmentType:
          initialData.employmentType === "TERCEIRIZADO"
            ? "BANCO_TALENTOS"
            : initialData.employmentType,
        working: Boolean(initialData.working),
        companyId: initialData.companyId || "",
        technologies: initialData.technologies || [],
      });
    } else {
      setForm(initialState);
    }
    setError("");
  }, [initialData]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleTechnology(technology) {
    setForm((current) => ({
      ...current,
      technologies: current.technologies.includes(technology)
        ? current.technologies.filter((item) => item !== technology)
        : [...current.technologies, technology],
    }));
  }

  function handleEmploymentChange(value) {
    setForm((current) => ({
      ...current,
      employmentType: value,
      // Banco de Talentos pode permanecer com ou sem setor.
      // Contratado SEDES terá o setor validado como obrigatório no envio.
    }));
  }

  function handleWorkingChange(value) {
    const isWorking = value === "SIM";

    setForm((current) => ({
      ...current,
      working: isWorking,
      companyId: isWorking ? current.companyId : "",
      company: isWorking ? current.company : "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.cpf.trim() || !form.email.trim() || !form.course) {
      setError("Preencha nome, CPF, e-mail e curso.");
      return;
    }

    if (form.working && !form.companyId) {
      setError("Selecione a empresa onde a pessoa trabalha.");
      return;
    }

    if (form.employmentType === "SEDES" && !form.sector) {
      setError("Contratados da SEDES devem ser direcionados para MLF ou NUTEC.");
      return;
    }

    try {
      setError("");
      setSaving(true);
      await onSave({
        ...form,
        companyId: form.working ? form.companyId : "",
      });
    } catch (requestError) {
      const apiMessage =
        requestError.response?.data?.details?.[0]?.message ||
        requestError.response?.data?.message ||
        "Não foi possível salvar o cadastro.";
      setError(apiMessage);
    } finally {
      setSaving(false);
    }
  }

  const activeCompanies = companies.filter(
    (company) => company.status === "ATIVA" || company.id === Number(form.companyId)
  );
  const sortedCompanies = [...activeCompanies].sort((a, b) =>
    a.tradeName.localeCompare(b.tradeName, "pt-BR")
  );

  return (
    <form className="people-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field form-span-2">
          <label>Nome completo</label>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Digite o nome completo"
          />
        </div>

        <div className="form-field">
          <label>CPF</label>
          <input
            value={form.cpf}
            onChange={(event) => updateField("cpf", event.target.value)}
            placeholder="000.000.000-00"
          />
        </div>

        <div className="form-field">
          <label>Telefone</label>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="(98) 99999-9999"
          />
        </div>

        <div className="form-field">
          <label>E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="email@exemplo.com"
          />
        </div>

        <div className="form-field">
          <label>Data de nascimento</label>
          <input
            type="date"
            value={form.birthDate}
            onChange={(event) => updateField("birthDate", event.target.value)}
          />
        </div>

        <div className="form-field form-span-2">
          <label>Curso</label>
          <select
            value={form.course}
            onChange={(event) => updateField("course", event.target.value)}
          >
            <option value="">Selecione</option>
            {filters.courses.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="form-field form-span-2">
          <label>Tecnologias</label>
          <div className="checkbox-grid">
            {filters.technologies.map((technology) => (
              <label className="checkbox-option" key={technology}>
                <input
                  type="checkbox"
                  checked={form.technologies.includes(technology)}
                  onChange={() => toggleTechnology(technology)}
                />
                <span>{technology}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-field form-span-2">
          <label>Tipo de vínculo</label>
          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="employmentType"
                checked={form.employmentType === "BANCO_TALENTOS"}
                onChange={() => handleEmploymentChange("BANCO_TALENTOS")}
              />
              Banco de Talentos
            </label>

            <label>
              <input
                type="radio"
                name="employmentType"
                checked={form.employmentType === "SEDES"}
                onChange={() => handleEmploymentChange("SEDES")}
              />
              Contratado SEDES
            </label>
          </div>
        </div>

        <div className="form-field form-span-2">
          <label>Está trabalhando atualmente?</label>
          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="working"
                checked={form.working === true}
                onChange={() => handleWorkingChange("SIM")}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="working"
                checked={form.working === false}
                onChange={() => handleWorkingChange("NAO")}
              />
              Não
            </label>
          </div>
        </div>

        {form.working && (
          <div className="form-field form-span-2">
            <div className="field-label-row">
              <label>Empresa onde trabalha</label>
              {canCreateCompany && onCreateCompany && (
                <button
                  type="button"
                  className="inline-create-button"
                  onClick={() => onCreateCompany((company) => {
                    updateField("companyId", company.id);
                    updateField("company", company.tradeName);
                  })}
                >
                  + Adicionar empresa
                </button>
              )}
            </div>
            <select
              value={form.companyId || ""}
              onChange={(event) => {
                const companyId = Number(event.target.value);
                const selectedCompany = companies.find((company) => company.id === companyId);
                updateField("companyId", companyId || "");
                updateField("company", selectedCompany?.tradeName || "");
              }}
            >
              <option value="">Selecione</option>
              {sortedCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.tradeName}
                  {company.status === "INATIVA" ? " (Inativa)" : ""}
                </option>
              ))}
            </select>
            {companies.filter((company) => company.status === "ATIVA").length === 0 && (
              <small className="field-hint">
                {canCreateCompany
                  ? "Nenhuma empresa ativa cadastrada. Use o botão Adicionar empresa."
                  : "Nenhuma empresa ativa cadastrada. Solicite o cadastro a um administrador."}
              </small>
            )}
          </div>
        )}

        <div className="form-field form-span-2">
          <label>
            Setor {form.employmentType === "BANCO_TALENTOS" ? "(opcional)" : "(obrigatório)"}
          </label>

          <div className="sector-button-group" role="group" aria-label="Selecione o setor">
            <button
              type="button"
              className={`sector-option-button ${form.sector === "MLF" ? "active" : ""}`}
              onClick={() => updateField("sector", form.sector === "MLF" ? "" : "MLF")}
              aria-pressed={form.sector === "MLF"}
            >
              <strong>MLF</strong>
              <span>{form.sector === "MLF" ? "Selecionado" : "Direcionar para este setor"}</span>
            </button>

            <button
              type="button"
              className={`sector-option-button ${form.sector === "NUTEC" ? "active" : ""}`}
              onClick={() => updateField("sector", form.sector === "NUTEC" ? "" : "NUTEC")}
              aria-pressed={form.sector === "NUTEC"}
            >
              <strong>NUTEC</strong>
              <span>{form.sector === "NUTEC" ? "Selecionado" : "Direcionar para este setor"}</span>
            </button>
          </div>
          {form.employmentType === "BANCO_TALENTOS" && (
            <small className="field-hint">
              No Banco de Talentos, a pessoa pode permanecer sem setor.
            </small>
          )}
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
