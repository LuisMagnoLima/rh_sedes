

## Critério adotado

- JavaScript e JSX receberam cabeçalhos de responsabilidade e comentários nas funções e registros de rotas/middlewares.
- Prisma e SQL receberam comentários compatíveis com suas sintaxes.
- CSS recebeu documentação por arquivo/seção, evitando comentários repetitivos em cada propriedade.
- JSON e arquivos de lock foram preservados, pois comentários tornariam esses formatos inválidos.
- `node_modules`, `.git`, `dist`, `build` e caches não fazem parte desta cópia comentada.
- O `index.html` recebido estava vazio; isso foi documentado sem inventar código funcional.

## `backend/package.json`
Arquivos JSON não aceitam comentários. O arquivo original foi preservado para não quebrar npm.
- `name`: nome técnico do pacote.
- `version`: versão atual.
- `scripts`: comandos de desenvolvimento, build e execução.
- `dependencies`: bibliotecas necessárias em produção.
- `devDependencies`: ferramentas usadas apenas durante o desenvolvimento.

Scripts encontrados:
- `dev` executa `nodemon src/server.js`.
- `start` executa `node src/server.js`.
- `build` executa `prisma generate`.
- `prisma:generate` executa `prisma generate`.
- `prisma:migrate` executa `prisma migrate dev`.
- `prisma:studio` executa `prisma studio`.
- `prisma:seed` executa `node prisma/seed.js`.

## `frontend/package.json`
Arquivos JSON não aceitam comentários. O arquivo original foi preservado para não quebrar npm.
- `name`: nome técnico do pacote.
- `version`: versão atual.
- `scripts`: comandos de desenvolvimento, build e execução.
- `dependencies`: bibliotecas necessárias em produção.
- `devDependencies`: ferramentas usadas apenas durante o desenvolvimento.

Scripts encontrados:
- `dev` executa `vite`.
- `build` executa `vite build`.
- `preview` executa `vite preview`.

## Arquivos incluídos

- `.gitignore`
- `README.md`
- `backend/.env`
- `backend/API.md`
- `backend/create_database.sql`
- `backend/package-lock.json`
- `backend/package.json`
- `backend/prisma/migrations/20260718033231_init/migration.sql`
- `backend/prisma/migrations/20260718040029_complete_person_fields/migration.sql`
- `backend/prisma/migrations/20260718042203_add_sedes_contract_status/migration.sql`
- `backend/prisma/migrations/20260718101032_add_users_and_contract_status/migration.sql`
- `backend/prisma/migrations/migration_lock.toml`
- `backend/prisma/schema.prisma`
- `backend/prisma/seed.js`
- `backend/src/app.js`
- `backend/src/config/prisma.js`
- `backend/src/controllers/.gitkeep`
- `backend/src/controllers/authController.js`
- `backend/src/controllers/companyController.js`
- `backend/src/controllers/personController.js`
- `backend/src/middlewares/.gitkeep`
- `backend/src/middlewares/authenticate.js`
- `backend/src/middlewares/authorizeAdmin.js`
- `backend/src/middlewares/errorHandler.js`
- `backend/src/middlewares/notFound.js`
- `backend/src/repositories/authRepository.js`
- `backend/src/repositories/companyRepository.js`
- `backend/src/repositories/personRepository.js`
- `backend/src/routes/.gitkeep`
- `backend/src/routes/authRoutes.js`
- `backend/src/routes/companyRoutes.js`
- `backend/src/routes/index.js`
- `backend/src/routes/personRoutes.js`
- `backend/src/server.js`
- `backend/src/services/.gitkeep`
- `backend/src/services/authService.js`
- `backend/src/services/companyService.js`
- `backend/src/services/personService.js`
- `backend/src/utils/.gitkeep`
- `backend/src/utils/AppError.js`
- `backend/src/validators/companyValidator.js`
- `backend/src/validators/personValidator.js`
- `frontend/.env`
- `frontend/index.html`
- `frontend/package-lock.json`
- `frontend/package.json`
- `frontend/public/.gitkeep`
- `frontend/src/App.jsx`
- `frontend/src/assets/.gitkeep`
- `frontend/src/components/.gitkeep`
- `frontend/src/components/Button.jsx`
- `frontend/src/components/CompanyForm.jsx`
- `frontend/src/components/EmptyState.jsx`
- `frontend/src/components/FormInput.jsx`
- `frontend/src/components/FormSelect.jsx`
- `frontend/src/components/Header.jsx`
- `frontend/src/components/Modal.jsx`
- `frontend/src/components/PageTopbar.jsx`
- `frontend/src/components/PeopleForm.jsx`
- `frontend/src/components/PeopleTable.jsx`
- `frontend/src/components/Sidebar.jsx`
- `frontend/src/components/StatCard.jsx`
- `frontend/src/contexts/CompaniesContext.jsx`
- `frontend/src/contexts/PeopleContext.jsx`
- `frontend/src/data/companies.js`
- `frontend/src/data/mockData.js`
- `frontend/src/layouts/.gitkeep`
- `frontend/src/main.jsx`
- `frontend/src/pages/.gitkeep`
- `frontend/src/pages/CompaniesPage.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/NewPersonPage.jsx`
- `frontend/src/pages/PeoplePage.jsx`
- `frontend/src/pages/PersonDetailsPage.jsx`
- `frontend/src/services/api.js`
- `frontend/src/styles/global.css`
- `frontend/vite.config.js`
- `requirements.txt`
