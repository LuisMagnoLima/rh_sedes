@echo off
start cmd /k "cd backend && npm run dev"
timeout /t 3 >nul
start cmd /k "cd frontend && npm run dev"
exit