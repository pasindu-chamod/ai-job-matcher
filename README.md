# 🚀 AI Job Matcher - Full Stack Microservices Platform

AI Job Matcher is an enterprise-grade AI hiring platform featuring a high-performance **Microservices Architecture**, **Interactive Skill Matching Simulator**, **Blockchain Credential Verification**, **MySQL Database**, **Real-Time Notifications**, and a **Glassmorphic UI Design System**.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, TailwindCSS (Glassmorphism), Recharts, Lucide Icons
- **Backend API Gateway:** Java 17, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA
- **AI Microservices:** Python 3.11, FastAPI, PyPDF2, python-docx, scikit-learn (TF-IDF), uvicorn
- **Blockchain Service:** FastAPI, Cryptographic SHA-256 Hash Chain Ledger
- **Database:** MySQL 8.x / XAMPP MariaDB (`jobmatcher` schema)

---

## ⚡ Quick Start (No Docker Required)

### 1. Database Setup (XAMPP MySQL)
1. Open **XAMPP Control Panel** and start **Apache** & **MySQL**.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin`) or MySQL Workbench.
3. Import & execute the MySQL script: `database/schema_mysql.sql`.

### 2. Launch All 5 Services
Simply double-click `start_all.bat` (or run in terminal):

```cmd
start_all.bat
```

This automatically installs dependencies and starts all 5 microservices in individual windows:
- 📄 **Resume Service (Python FastAPI)**: `http://localhost:8001`
- 🎯 **Matching Service (Python FastAPI)**: `http://localhost:8002`
- 🔗 **Blockchain Service (Python FastAPI)**: `http://localhost:8003`
- ☕ **API Gateway (Spring Boot)**: `http://localhost:8080`
- 💻 **React Frontend (Vite)**: `http://localhost:3000`

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@jobmatcher.com` | `Admin@123` |
| **Candidate** | `alex@example.com` | `User@123` |

---

## 🌟 Key Features

1. **Pre-Login Animated Landing Page**: Hero banner, live industry news & tech hiring trends, interactive AI matching simulator, counter statistics.
2. **Glassmorphic Dark & Light Theme System**: Seamless toggle with persistent theme state.
3. **AI Resume Parser & ATS Scoring**: High-speed PDF/DOCX parser detecting experience, technical skills, and ATS optimization suggestions.
4. **TF-IDF Job Match Engine**: Skill gap analysis comparing candidate resumes against job postings.
5. **Blockchain Skill Passport**: Cryptographically signed SHA-256 skill credentials.
6. **Real-time Notifications**: Application status updates and verification alerts.