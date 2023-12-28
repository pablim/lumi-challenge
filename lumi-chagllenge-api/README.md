# Configurar e executar a API

### Postgres 

Criar um banco de dados com o nome **lumi_challenge**

### Backend 

- No arquivo .env modifique o usuário e senha correspondente do seu banco de dados: 

    `DATABASE_URL="postgresql://**user**:**password**@localhost:5432/lumi_challenge?schema=public"`

- Dentro do diretório do backend (lumi-challenge-api) `cd lumi-challenge-api` execute:
    - `npm install` (instala as dependências do projeto)
    - `npm run start` (inicia a API)