﻿# ZooAPI – Gerenciador de Zoológico

Este projeto foi desenvolvido como parte de um desafio técnico para fins de aprendizado e demonstração de habilidades. Trata-se de um sistema de gerenciamento de zoológico, onde é possível cadastrar animais, associar cuidados a eles, visualizar, editar e excluir registros.

---

## Tecnologias Utilizadas

### Backend (API RESTful - .NET 8)
- ASP.NET Core Web API
- Entity Framework Core
- AutoMapper
- Swagger (para testes e documentação da API)

### Frontend (React)
- React com Create React App (CRA)
- React Router DOM (v5) (roteamento)
- Tailwind CSS (estilização)
- Recharts (gráficos e visualizações)

---

## Comunicação entre Backend e Frontend

A aplicação está dividida em dois projetos:
- `ZooAPI`: fornece os endpoints REST para operações com animais e cuidados.
- `zoo-web`: consome os dados da API utilizando.

A comunicação é feita via **requisições HTTP (JSON)** e o frontend consome os dados de forma dinâmica usando **hooks e contexto** quando necessário.

---

## Banco de Dados

- Banco utilizado: **SQL Server**
- A estrutura do banco foi gerada utilizando o **Entity Framework Core com Migrations**
- Para aplicar as migrations:
```bash
dotnet ef database update
```

---

## Como executar o projeto localmente

### Pré-requisitos:
- .NET 8 SDK
- Node.js e NPM/Yarn
- SQL Server instalado (ou instância na nuvem)

### Backend:
```bash
cd test2
dotnet build
dotnet ef database update
dotnet run
```

### Frontend:
```bash
cd zoo-web
npm install
npm start
```

---

## Estrutura de Pastas (resumida)

```
/ZooAPI
  └── Controllers/
  └── Models/
  └── Data/
  └── Program.cs

/zoo-web
  └── src/
      └── pages/
      └── components/
     
```

---

## Bibliotecas externas relevantes

- `AutoMapper`: mapeamento entre entidades e DTOs
- `Swashbuckle`: documentação Swagger da API
- `jsonwebtoken`, `react-router-dom`: bibliotecas essenciais no front
- `tailwindcss`: utilitário CSS de fácil personalização
- `recharts`: geração de gráficos baseados em dados

---

## Autor

**Bruno Gustavo Kuss**  
Estudante de Análise e Desenvolvimento de Sistemas  
[LinkedIn](https://www.linkedin.com/in/bruno.kuss)
