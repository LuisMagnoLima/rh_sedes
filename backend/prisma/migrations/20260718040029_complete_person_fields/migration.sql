-- Arquivo: backend/prisma/migrations/20260718040029_complete_person_fields/migration.sql
-- Comandos SQL gerados ou mantidos para criar/evoluir a estrutura PostgreSQL.

/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "vacation" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonTechnology" (
    "personId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "PersonTechnology_pkey" PRIMARY KEY ("personId","technologyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE INDEX "PersonTechnology_technologyId_idx" ON "PersonTechnology"("technologyId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE INDEX "Person_sector_idx" ON "Person"("sector");

-- AddForeignKey
ALTER TABLE "PersonTechnology" ADD CONSTRAINT "PersonTechnology_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonTechnology" ADD CONSTRAINT "PersonTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
