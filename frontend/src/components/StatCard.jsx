/**
 * Arquivo: frontend/src/components/StatCard.jsx
 *
 * Responsabilidade:
 * Cartão reutilizável para apresentar indicadores numéricos do painel.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export default function StatCard({ title, value, subtitle, tone = "blue", icon: Icon }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-card-top">
        <span>{title}</span>
        {Icon ? (
          <div className="stat-card-icon">
            <Icon size={20} />
          </div>
        ) : null}
      </div>
      <strong>{value}</strong>
      <small>{subtitle}</small>
    </article>
  );
}
