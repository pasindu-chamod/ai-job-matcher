@echo off
title AI Job Matcher - Launcher
echo ========================================================
echo         🚀 AI Job Matcher - Local Launcher 🚀
echo ========================================================
echo.
echo Starting all microservices locally (No Docker required)...
echo.
echo Make sure XAMPP MySQL is running on port 3306!
echo (Run database\schema_mysql.sql in phpMyAdmin or MySQL client if first run)
echo.

:: 1. Start Resume Service (Python Port 8001)
echo Starting Resume Service on port 8001...
start "Python - Resume Service (8001)" cmd /k "cd resume-service && pip install -r requirements.txt && python -m uvicorn app.main:app --port 8001 --reload"

:: 2. Start Matching Service (Python Port 8002)
echo Starting Matching Service on port 8002...
start "Python - Matching Service (8002)" cmd /k "cd matching-service && pip install -r requirements.txt && python -m uvicorn app.main:app --port 8002 --reload"

:: 3. Start Blockchain Service (Python Port 8003)
echo Starting Blockchain Service on port 8003...
start "Python - Blockchain Service (8003)" cmd /k "cd blockchain-service && pip install -r requirements.txt && python -m uvicorn app.main:app --port 8003 --reload"

:: 4. Start Java API Gateway (Spring Boot Port 8080)
echo Starting Java API Gateway on port 8080...
start "Java - API Gateway (8080)" cmd /k "cd api-gateway && mvnw.cmd spring-boot:run"

:: 5. Start React Frontend (Vite Port 3000)
echo Starting Frontend on port 3000...
start "React - Frontend (3000)" cmd /k "cd frontend && npm install && npm run dev"

echo ========================================================
echo All 5 services launched in separate windows!
echo Frontend will be available at: http://localhost:3000
echo API Gateway available at:      http://localhost:8080
echo ========================================================
pause
