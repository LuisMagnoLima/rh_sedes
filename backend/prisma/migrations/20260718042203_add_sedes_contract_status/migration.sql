-- Arquivo: backend/prisma/migrations/20260718042203_add_sedes_contract_status/migration.sql
-- Comandos SQL gerados ou mantidos para criar/evoluir a estrutura PostgreSQL.

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "sedesContractActive" BOOLEAN NOT NULL DEFAULT true;
