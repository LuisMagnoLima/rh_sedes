/**
 * Arquivo: frontend/src/components/PeopleTable.jsx
 *
 * Responsabilidade:
 * Tabela reutilizável que lista pessoas e disponibiliza ações de visualização e edição.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { Eye, Pencil, Trash2 } from "lucide-react";
import EmptyState from "./EmptyState";

export default function PeopleTable({ title, rows, onView, onEdit, onDelete }) {
  return (
    <section className="table-card">
      <div className="table-card-header">
        <div>
          <h2>{title}</h2>
          <p>{rows.length} registro(s) encontrado(s)</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-scroll">
          <table className="people-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Curso</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Tecnologias</th>
                <th>Setor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((person) => {
                const technologies = person.technologies || [];
                const visibleTechnologies = technologies.slice(0, 3);
                const hiddenTechnologyCount = Math.max(technologies.length - 3, 0);

                return (
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
                      <span className="person-name" title={person.name}>
                        {person.name}
                      </span>
                    </div>
                  </td>

                  <td className="course-cell" title={person.course || ""}>
                    {person.course || "—"}
                  </td>
                  <td className="company-cell" title={person.company || ""}>
                    {person.company || "—"}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        person.working ? "working" : "not-working"
                      }`}
                    >
                      {person.employmentType === "BANCO_TALENTOS"
                        ? person.working
                          ? "Trabalhando"
                          : "Não trabalhando"
                        : person.working
                          ? "Contratado SEDES · Trabalhando"
                          : "Contratado SEDES"}
                    </span>
                  </td>

                  <td>
                    <div
                      className="tag-list compact-tags"
                      title={technologies.join(", ")}
                    >
                      {visibleTechnologies.map((technology) => (
                        <span className="tag" key={technology}>
                          {technology}
                        </span>
                      ))}

                      {hiddenTechnologyCount > 0 && (
                        <span
                          className="tag tag-more"
                          aria-label={`${hiddenTechnologyCount} tecnologia(s) adicional(is)`}
                        >
                          +{hiddenTechnologyCount}
                        </span>
                      )}

                      {technologies.length === 0 && <span className="cell-empty">—</span>}
                    </div>
                  </td>

                  <td>{person.sector || "—"}</td>

                  <td>
                    <div className="actions">
                      <button onClick={() => onView?.(person)} aria-label={`Visualizar ${person.name}`} title="Visualizar">
                        <Eye size={17} />
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(person)}
                          aria-label={`Editar ${person.name}`}
                          title="Editar"
                        >
                          <Pencil size={17} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          className="danger-action"
                          onClick={() => onDelete(person)}
                          aria-label={`Excluir ${person.name}`}
                          title="Excluir"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
