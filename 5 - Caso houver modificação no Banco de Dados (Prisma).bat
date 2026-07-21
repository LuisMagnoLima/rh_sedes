@echo off
cd backend
npx prisma generate
npx prisma migrate dev
pause