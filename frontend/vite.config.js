/**
 * Arquivo: frontend/vite.config.js
 *
 * Responsabilidade:
 * Configura o Vite e o plugin responsável por compilar componentes React.
 *
 * Organização:
 * - As importações carregam dependências externas e módulos internos.
 * - As funções encapsulam uma responsabilidade específica.
 * - As exportações tornam somente a interface necessária disponível aos demais módulos.
 *
 * Observação: os comentários foram adicionados para fins didáticos sem alterar
 * o comportamento original do sistema.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins:[react()], server:{port:5173} });
