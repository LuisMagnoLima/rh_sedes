/**
 * Arquivo: frontend/src/components/EmptyState.jsx
 *
 * Responsabilidade:
 * Apresenta uma mensagem padronizada quando não existem registros para exibir.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */


import { SearchX } from "lucide-react";

export default function EmptyState({ message = "Nenhum registro encontrado." }) {
  return (
    <div className="empty-state">
      <SearchX size={30} />
      <strong>{message}</strong>
      <span>Tente ajustar os filtros aplicados.</span>
    </div>
  );
}
