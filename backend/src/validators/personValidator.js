const { z } = require("zod");

const personSchema = z
  .object({
    name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres."),
    cpf: z.string().trim().min(11, "Informe um CPF válido."),
    phone: z.string().trim().optional().or(z.literal("")),
    email: z.string().trim().email("Informe um e-mail válido."),
    birthDate: z.string().trim().optional().or(z.literal("")),
    course: z.string().trim().min(2, "Informe o curso."),
    technologies: z.array(z.string().trim().min(1)).default([]),
    // TERCEIRIZADO permanece aceito apenas para compatibilidade com cadastros antigos.
    employmentType: z.enum([
      "BANCO_TALENTOS",
      "TERCEIRIZADO",
      "SEDES",
      "CONTRATADO_SEDES",
    ]),
    companyId: z.union([z.number().int().positive(), z.string().trim(), z.null()]).optional(),
    working: z.boolean().nullable().optional(),
    sector: z.union([z.enum(["MLF", "NUTEC"]), z.literal(""), z.null()]).optional(),
    vacation: z.boolean().default(false),
    vacationStart: z.string().trim().optional().or(z.literal("")),
    vacationEnd: z.string().trim().optional().or(z.literal("")),
    active: z.boolean().default(true),
    sedesContractActive: z.boolean().default(true),
  })
  .superRefine((data, context) => {
    const isSedes = ["SEDES", "CONTRATADO_SEDES"].includes(data.employmentType);

    if (data.working === true && !data.companyId) {
      context.addIssue({
        code: "custom",
        path: ["companyId"],
        message: "Selecione a empresa onde a pessoa trabalha.",
      });
    }

    if (data.vacation && (!data.vacationStart || !data.vacationEnd)) {
      context.addIssue({
        code: "custom",
        path: ["vacationStart"],
        message: "Informe o período completo das férias.",
      });
    }

    if (data.vacation && data.vacationStart && data.vacationEnd && data.vacationEnd < data.vacationStart) {
      context.addIssue({
        code: "custom",
        path: ["vacationEnd"],
        message: "A data final das férias não pode ser anterior à data inicial.",
      });
    }

    if (isSedes && !data.sector) {
      context.addIssue({
        code: "custom",
        path: ["sector"],
        message: "Contratados da SEDES devem ser direcionados para MLF ou NUTEC.",
      });
    }
  });

function validatePerson(payload) {
  const parsed = personSchema.parse(payload);
  const isSedes = ["SEDES", "CONTRATADO_SEDES"].includes(parsed.employmentType);
  const isWorking = parsed.working === true;
  const companyId =
    parsed.companyId === null || parsed.companyId === "" || parsed.companyId === undefined
      ? null
      : Number(parsed.companyId);

  return {
    fullName: parsed.name,
    cpf: parsed.cpf,
    phone: parsed.phone || null,
    email: parsed.email,
    birthDate: parsed.birthDate ? new Date(`${parsed.birthDate}T00:00:00.000Z`) : null,
    course: parsed.course,
    // O enum antigo do banco é reaproveitado para evitar uma migração destrutiva.
    type: isSedes ? "CONTRATADO_SEDES" : "TERCEIRIZADO",
    companyId: isWorking ? companyId : null,
    working: isWorking,
    sector: parsed.sector || null,
    vacation: parsed.vacation,
    vacationStart: parsed.vacation && parsed.vacationStart
      ? new Date(`${parsed.vacationStart}T00:00:00.000Z`)
      : null,
    vacationEnd: parsed.vacation && parsed.vacationEnd
      ? new Date(`${parsed.vacationEnd}T00:00:00.000Z`)
      : null,
    active: parsed.active,
    sedesContractActive: isSedes ? parsed.sedesContractActive : true,
    technologies: [...new Set(parsed.technologies.map((item) => item.trim()).filter(Boolean))],
  };
}

module.exports = { validatePerson };
