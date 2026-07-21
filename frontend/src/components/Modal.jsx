/**
 * Arquivo: frontend/src/components/Modal.jsx
 *
 * Responsabilidade:
 * Janela modal reutilizável com título, conteúdo e ação de fechamento.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}
