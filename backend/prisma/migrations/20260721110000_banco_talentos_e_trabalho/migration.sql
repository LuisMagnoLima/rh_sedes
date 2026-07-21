-- Renomeia o valor antigo do enum sem perder os cadastros existentes.
ALTER TYPE "PersonType" RENAME VALUE 'TERCEIRIZADO' TO 'BANCO_TALENTOS';

-- A situação de trabalho agora é válida para qualquer tipo de vínculo.
UPDATE "Person" SET "working" = false WHERE "working" IS NULL;
