@echo off
cd backend
call npm install
call npx prisma generate
call npx prisma migrate deploy
cd ..
cd frontend
call npm install
cd ..
pause