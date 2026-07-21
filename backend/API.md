# API RH SEDES

Base URL:

```text
http://localhost:3333/api
```

## Saúde da API

```http
GET /health
```

## Empresas

```http
GET /companies
GET /companies?search=alfa
GET /companies/:id
POST /companies
PUT /companies/:id
DELETE /companies/:id
```

Corpo de criação/edição:

```json
{
  "legalName": "Empresa Alfa Serviços Ltda.",
  "tradeName": "Empresa Alfa",
  "cnpj": "12.345.678/0001-90",
  "phone": "(98) 98888-1111",
  "email": "contato@empresaalfa.com.br",
  "manager": "Carlos Almeida",
  "status": "ATIVA",
  "notes": "Observações opcionais"
}
```
