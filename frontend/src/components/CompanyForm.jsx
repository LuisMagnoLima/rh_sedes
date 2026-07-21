/**
 * Arquivo: frontend/src/components/CompanyForm.jsx
 *
 * Responsabilidade:
 * Formulário controlado usado para cadastrar e editar empresas.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { useEffect, useState } from "react";

const initialState = {
  legalName: "",
  tradeName: "",
  cnpj: "",
  phone: "",
  email: "",
  manager: "",
  status: "ATIVA",
  notes: "",
};

export default function CompanyForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialData ? { ...initialState, ...initialData } : initialState);
    setError("");
  }, [initialData]);

  /**
   * Executa a responsabilidade denominada “update field” neste módulo.
   */
  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  /**
   * Executa a responsabilidade denominada “handle submit” neste módulo.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.legalName.trim() ||
      !form.tradeName.trim() ||
      !form.cnpj.trim() ||
      !form.email.trim()
    ) {
      setError("Preencha razão social, nome fantasia, CNPJ e e-mail.");
      return;
    }

    try {
      setError("");
      setSaving(true);
      await onSave(form);
    } catch (requestError) {
      setError(
        requestError.response?.data?.details?.[0]?.message ||
          requestError.response?.data?.message ||
          "Não foi possível salvar a empresa."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="people-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field form-span-2">
          <label>Razão social</label>
          <input
            value={form.legalName}
            onChange={(event) => updateField("legalName", event.target.value)}
            placeholder="Digite a razão social"
          />
        </div>

        <div className="form-field">
          <label>Nome fantasia</label>
          <input
            value={form.tradeName}
            onChange={(event) => updateField("tradeName", event.target.value)}
            placeholder="Digite o nome fantasia"
          />
        </div>

        <div className="form-field">
          <label>CNPJ</label>
          <input
            value={form.cnpj}
            onChange={(event) => updateField("cnpj", event.target.value)}
            placeholder="00.000.000/0000-00"
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
            placeholder="empresa@email.com"
          />
        </div>

        <div className="form-field">
          <label>Responsável</label>
          <input
            value={form.manager}
            onChange={(event) => updateField("manager", event.target.value)}
            placeholder="Nome do responsável"
          />
        </div>

        <div className="form-field">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(event) => updateField("status", event.target.value)}
          >
            <option value="ATIVA">Ativa</option>
            <option value="INATIVA">Inativa</option>
          </select>
        </div>

        <div className="form-field form-span-2">
          <label>Observações</label>
          <textarea
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Informações adicionais sobre a empresa"
            rows="4"
          />
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? "Salvando..." : "Salvar empresa"}
        </button>
      </div>
    </form>
  );
}
