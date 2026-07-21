const prisma = require("./prisma");

/**
 * Garante que bancos criados por versões anteriores possuam os campos
 * necessários para a versão atual. Os comandos usam IF NOT EXISTS para
 * poderem ser executados várias vezes sem apagar nenhum cadastro.
 */
async function ensureDatabaseCompatibility() {
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        WHERE t.typname = 'PersonType' AND e.enumlabel = 'TERCEIRIZADO'
      ) AND NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        WHERE t.typname = 'PersonType' AND e.enumlabel = 'BANCO_TALENTOS'
      ) THEN
        ALTER TYPE "PersonType" RENAME VALUE 'TERCEIRIZADO' TO 'BANCO_TALENTOS';
      END IF;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Person"
      ADD COLUMN IF NOT EXISTS "working" BOOLEAN,
      ADD COLUMN IF NOT EXISTS "sector" TEXT,
      ADD COLUMN IF NOT EXISTS "vacation" BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS "vacationStart" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "vacationEnd" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true,
      ADD COLUMN IF NOT EXISTS "sedesContractActive" BOOLEAN NOT NULL DEFAULT true;
  `);

  await prisma.$executeRawUnsafe(`
    UPDATE "Person"
    SET "working" = false
    WHERE "working" IS NULL;
  `);
}

module.exports = ensureDatabaseCompatibility;
