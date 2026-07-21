/**
 * Arquivo: frontend/src/components/FormSelect.jsx
 *
 * Responsabilidade:
 * Campo de seleção reutilizável com rótulo, opções e mensagem de erro.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export default function FormSelect({ label, value, onChange, options, placeholder = "Todos" }) {
  return (
    <div className="filter-field">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
