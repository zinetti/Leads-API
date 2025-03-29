# 📌 API com Node.js, TypeScript e Prisma

Este projeto é uma API construída com **Node.js**, **TypeScript** e **Prisma**, utilizando **Express** para gerenciamento de rotas e **Zod** para validação de dados.

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Prisma (com PostgreSQL)
- Express
- Cors
- Zod

---

## 📦 Configuração do Ambiente

### 1️⃣ Clonar o repositório

```sh
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```
### 2️⃣ Instalar dependências
```sh
npm install @prisma/client express cors zod
npm install --save-dev @types/node @types/express @types/cors typescript tsx prisma
```
### 3️⃣ Inicializar TypeScript
```sh
npx tsc --init
```
**Após esse comando, configure a saída dos arquivos compilados alterando a propriedade outDir no arquivo tsconfig.json:**
```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### 4️⃣ Configurar o Prisma
```sh
npx prisma init --datasource-provider postgresql
```
Isso criará o diretório prisma/ com um arquivo schema.prisma
Defina sua conexão com o banco de dados no arquivo **.env**:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```

### 5️⃣ Criar e aplicar migrações
```sh
npx prisma migrate dev --name init
```

### 🏃 Executando o Projeto
#### Em modo de desenvolvimento:
```sh
npm run dev
```
#### Para compilar e rodar em produção:
```sh
npm run build
npm start
```
### 🛠 Scripts no package.json
No seu package.json, adicione os seguintes scripts para facilitar o desenvolvimento:
```json
{
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:generate": "npx prisma generate",
    "prisma:studio": "npx prisma studio"
  }
}
```















