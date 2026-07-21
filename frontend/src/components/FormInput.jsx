/**
 * Arquivo: frontend/src/components/FormInput.jsx
 *
 * Responsabilidade:
 * Campo de entrada reutilizável com rótulo e mensagem de erro.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export default function FormInput({ label, value, onChange, placeholder }) {
  return (
    <div className="filter-field filter-field-wide">
      <label>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
