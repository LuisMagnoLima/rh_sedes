@echo off
rmdir /s /q backend\node_modules
rmdir /s /q frontend\node_modules
cd backend
call npm install
cd ..
cd frontend
call npm install
cd ..
pause