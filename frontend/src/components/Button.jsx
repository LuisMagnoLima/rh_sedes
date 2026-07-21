/**
 * Arquivo: frontend/src/components/Button.jsx
 *
 * Responsabilidade:
 * Componente reutilizável de botão com variantes visuais e propriedades HTML.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
