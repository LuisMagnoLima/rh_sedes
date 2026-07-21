-- Arquivo: backend/prisma/migrations/20260718033231_init/migration.sql
-- Comandos SQL gerados ou mantidos para criar/evoluir a estrutura PostgreSQL.

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ATIVA', 'INATIVA');

-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('TERCEIRIZADO', 'CONTRATADO_SEDES');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "legalName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "manager" TEXT,
    "status" "CompanyStatus" NOT NULL DEFAULT 'ATIVA',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "type" "PersonType" NOT NULL,
    "working" BOOLEAN,
    "sector" TEXT,
    "companyId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE INDEX "Company_tradeName_idx" ON "Company"("tradeName");

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "Company"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Person_cpf_key" ON "Person"("cpf");

-- CreateIndex
CREATE INDEX "Person_fullName_idx" ON "Person"("fullName");

-- CreateIndex
CREATE INDEX "Person_type_idx" ON "Person"("type");

-- CreateIndex
CREATE INDEX "Person_companyId_idx" ON "Person"("companyId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
