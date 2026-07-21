import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { usePeople } from "../contexts/PeopleContext";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function VacationControl({ person, onUpdated }) {
  const { updatePerson } = usePeople();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(person.vacationStart || todayIso());
  const [endDate, setEndDate] = useState(person.vacationEnd || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setStartDate(person.vacationStart || todayIso());
    setEndDate(person.vacationEnd || "");
  }, [person.vacationStart, person.vacationEnd]);

  async function saveVacation() {
    if (!startDate || !endDate) {
      setError("Preencha a data inicial e a data final das férias.");
      return;
    }

    if (endDate < startDate) {
      setError("A data final não pode ser anterior à data inicial.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const updated = await updatePerson(person.id, {
        ...person,
        vacation: true,
        vacationStart: startDate,
        vacationEnd: endDate,
      });
      onUpdated?.(updated);
      setOpen(false);
    } catch (requestError) {
      setError(
        requestError.response?.data?.details?.[0]?.message ||
          requestError.response?.data?.message ||
          "Não foi possível registrar as férias."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeVacation() {
    try {
      setSaving(true);
      setError("");
      const updated = await updatePerson(person.id, {
        ...person,
        vacation: false,
        vacationStart: "",
        vacationEnd: "",
      });
      onUpdated?.(updated);
      setOpen(false);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Não foi possível remover as férias."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="vacation-control">
      <button
        type="button"
        className={`button ${person.vacation ? "button-secondary" : "button-primary"}`}
        onClick={() => setOpen((current) => !current)}
      >
        <CalendarDays size={17} />
        {person.vacation ? "Alterar férias" : "Está de férias"}
      </button>

      {person.vacation && person.vacationStart && person.vacationEnd && (
        <span className="vacation-period">
          De {person.vacationStart.split("-").reverse().join("/")} até {person.vacationEnd.split("-").reverse().join("/")}
        </span>
      )}

      {open && (
        <div className="vacation-date-panel">
          <div className="vacation-date-panel-header">
            <strong>Período de férias</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar">
              <X size={17} />
            </button>
          </div>

          <div className="vacation-date-grid">
            <label>
              <span>De</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
            <label>
              <span>Até</span>
              <input
                type="date"
                min={startDate}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="vacation-date-actions">
            {person.vacation && (
              <button
                type="button"
                className="button button-secondary"
                onClick={removeVacation}
                disabled={saving}
              >
                Remover férias
              </button>
            )}
            <button
              type="button"
              className="button button-primary"
              onClick={saveVacation}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar período"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
