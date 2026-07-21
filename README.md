# RH SEDES — versão comentada

Consulte `DOCUMENTACAO_CODIGO.md` para entender o critério de documentação e as limitações de formatos que não aceitam comentários.

---

# RH SEDES — Sprint 1

## Pré-requisitos
- Node.js 20+
- PostgreSQL
- Banco `rh_sedes` criado

## Backend
```bash
cd backend
copy .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Frontend
Em outro terminal:
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3333
Teste: http://localhost:3333/api/health

A URL do PostgreSQL está sem senha:
```env
DATABASE_URL="postgresql://postgres@localhost:5432/rh_sedes?schema=public"
```


## Sprint 2 — Interface com dados mockados

Incluído:

- Tela de login demonstrativa
- Login `admin/admin`
- Dashboard fiel ao modelo solicitado
- Menu lateral
- Cabeçalho
- Seis cards de resumo
- Filtros automáticos
- Lista de terceirizados
- Lista de contratados da SEDES
- Ações visíveis para administrador
- Tema claro e escuro
- Dados mockados em `frontend/src/data/mockData.js`

Depois de substituir os arquivos, execute novamente:

```bash
cd frontend
npm install
npm run dev
```


## Ajuste da tela de login

A tela de login foi refeita para seguir o modelo institucional enviado:

- fundo turquesa;
- card branco centralizado;
- área reservada para a logo;
- campos grandes;
- controle para mostrar e ocultar senha;
- link visual de recuperação de senha;
- botão com degradê;
- rodapé institucional.

Para adicionar a logo depois:

1. coloque o arquivo em `frontend/public/logo-governo-maranhao.png`;
2. abra `frontend/src/pages/Login.jsx`;
3. substitua o bloco `institutional-logo-placeholder` por:

```jsx
<img
  src="/logo-governo-maranhao.png"
  alt="Governo do Maranhão e SEDES"
/>
```


## Ajuste responsivo do login

O login foi reduzido e adaptado para:

- notebooks com menor altura;
- monitores convencionais;
- tablets;
- celulares;
- redução automática do logo, campos, espaçamentos e rodapé.


## Sprint 3 — Dashboard refinado

Incluído:

- componentes reutilizáveis;
- sidebar responsiva com menu móvel;
- header responsivo;
- cards com ícones;
- filtros automáticos;
- botão para limpar filtros;
- estado vazio quando nenhum registro é encontrado;
- tabelas com ações;
- tema claro e escuro refinado;
- melhorias de hover, sombra e acessibilidade.


## Sprint 4 — Pessoas MVP

Incluído:

- listagem de pessoas;
- pesquisa instantânea;
- cadastro;
- edição;
- visualização;
- exclusão;
- formulário condicional por tipo de vínculo;
- terceirizado com empresa e status Sim/Não;
- contratado SEDES com setor MLF ou NUTEC;
- dados ainda em memória/mock, sem PostgreSQL nesta etapa.


## Ajustes da página Pessoas

- Empresa e Setor agora aparecem em colunas separadas.
- A visualização abre uma ficha cadastral organizada por seções.
- O botão de exclusão aparece somente para usuários com papel `ADMIN`.
- Apenas Dashboard e Pessoas têm navegação ativa.
- Os demais itens do menu lateral são apenas ilustrativos e exibem “Em breve”.


## Sprint 5 — Persistência local

- Os cadastros de Pessoas agora são salvos no `localStorage`.
- Novos registros, edições e exclusões permanecem após atualizar a página.
- O administrador pode restaurar os dados de demonstração.
- O PostgreSQL ainda não foi conectado nesta etapa.


## Ajuste de segurança

- Dados pessoais não são mais salvos no `localStorage`.
- CPF, telefone, e-mail e demais cadastros ficam somente na memória do React.
- Ao atualizar ou fechar a página, alterações ainda não enviadas ao backend são descartadas.
- A sessão de login usa `sessionStorage`, que é apagado ao fechar a aba.
- `sessionStorage` não substitui autenticação real; será removido quando o backend com sessão segura for conectado.
- O armazenamento permanente de dados pessoais deverá ser feito apenas no PostgreSQL, através do backend.


## Sprint 7 — CRUD de Empresas

- Empresas agora é um módulo funcional no menu lateral.
- Cadastro, edição, visualização e exclusão de empresas.
- Pesquisa por nome, CNPJ, responsável e e-mail.
- Status ativa/inativa.
- Exclusão disponível somente para ADMIN.
- Os dados permanecem apenas em memória até a futura integração com o backend.


## Ajuste do menu
- Removidos: Cursos, Setores, Tecnologias e Férias.
- Adicionados (somente demonstração):
  - Contratados
  - Relatórios
  - Cadastros
  - Configurações
- Todos exibem "Em breve" e não possuem funcionalidade nesta fase.


## Correção do menu
- Tecnologias foi restaurado.
- Ordem atual:
  - Dashboard
  - Pessoas
  - Empresas
  - Contratados
  - Tecnologias
  - Relatórios
  - Cadastros
  - Configurações
- Os cinco últimos permanecem apenas demonstrativos, com a indicação "Em breve".


## Sprint 8 — Integração Pessoas ↔ Empresas

- Pessoas e Empresas agora compartilham o mesmo estado em memória.
- O campo Empresa do cadastro de Pessoas usa as empresas cadastradas no módulo Empresas.
- Apenas empresas ativas aparecem para novos vínculos.
- Uma empresa inativa continua aparecendo durante a edição de uma pessoa já vinculada a ela.
- Cadastro, edição e exclusão de empresas refletem imediatamente no formulário de Pessoas.
- Nenhum dado pessoal ou empresarial é persistido no localStorage.


## Correção do tema escuro

Foram adaptados ao tema escuro:
- Modais de cadastro, edição e visualização
- Campos de texto, selects e áreas de observação
- Pesquisa
- Fichas cadastrais
- Opções de checkbox e seleção única
- Avatares de empresas
- Botões de ação
- Mensagens de erro e textos auxiliares
- Barras de rolagem
- Estados de foco, hover e linhas das tabelas


## Sprint 9 — Backend real de Empresas

Foi criada a primeira API conectável ao PostgreSQL:

- Node.js + Express
- Prisma ORM
- PostgreSQL
- CRUD completo de Empresas
- Arquitetura em rotas, controllers, services e repositories
- Validação com Zod
- Helmet, CORS e limite de requisições
- Tratamento centralizado de erros
- Nenhum dado sensível salvo no navegador

### Preparação

1. Crie o banco:

```sql
CREATE DATABASE rh_sedes;
```

2. Entre na pasta `backend`.

3. Copie `.env.example` para `.env` e informe a senha do PostgreSQL.

4. Instale as dependências:

```bash
npm install
```

5. Gere a primeira migração:

```bash
npx prisma migrate dev --name init
```

6. Inicie a API:

```bash
npm run dev
```

7. Teste:

```text
http://localhost:3333/api/health
```

Nesta sprint, a tela de Empresas ainda permanece usando o estado em memória. A próxima integração trocará esse estado pelas chamadas HTTP da API.


## Sprint 10 — Novo cadastro e visualização em páginas

- O botão `Novo Cadastro` da Dashboard abre `/pessoas/novo`.
- O botão `Novo cadastro` da página Pessoas abre a mesma tela.
- O ícone de olho da Dashboard abre `/pessoas/:id`.
- O ícone de olho da página Pessoas abre a ficha completa.
- O novo cadastro é salvo no estado compartilhado e redireciona para a visualização.
- A tela de visualização mostra informações pessoais, formação, tecnologias e vínculo.
- Tema claro e escuro foram aplicados às duas novas telas.


## Ajuste visual — Setores SEDES

A seleção do setor deixou de usar uma lista suspensa. Agora MLF e NUTEC aparecem como botões de escolha.


## Sprint 11 — Backend completo de Pessoas

### Endpoints

- `GET /api/people`
- `GET /api/people/:id`
- `POST /api/people`
- `PUT /api/people/:id`
- `DELETE /api/people/:id`

### Banco de dados

A tabela `Person` agora possui curso e férias. Também foram criadas:

- `Technology`
- `PersonTechnology`

Pessoas terceirizadas são vinculadas à empresa pelo campo `companyId`.

### Comandos para atualizar o banco

Dentro da pasta `backend`:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name complete_person_fields
npm run dev
```

Em outro terminal, dentro da pasta `frontend`:

```bash
npm install
npm run dev
```

A API deve rodar em `http://localhost:3333/api`.
