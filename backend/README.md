# Project Seger – Backend

## Requirements
- Node.js (v18+)
- PostgreSQL
- Prisma CLI (`npx prisma`)

## Setup Instructions
1. Install dependencies:
```bash
npm install
```
2. Generate Prisma client:
```bash
npx prisma generate
```
3. Run database migrations:
```bash
npx prisma migrate dev --name init
```
4. (Optional) Seed the database:
```bash
node prisma/seed.js
```
5. Start the server:
```bash
npm run dev
```
The server will run at: [http://localhost:3000](http://localhost:3000)
