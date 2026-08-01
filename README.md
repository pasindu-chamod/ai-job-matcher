<div align="center">

# 🚀 AI Job Matcher

### Enterprise-grade AI hiring platform powered by microservices

*AI resume parsing • TF-IDF job matching • blockchain-verified skill credentials • glassmorphic UI*

<br/>

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![FastAPI](https://img.shields.io/badge/FastAPI-Services-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)

<br/>

[Features](#-key-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Architecture](#%EF%B8%8F-architecture) • [Quick Start](#-quick-start) • [Structure](#-project-structure) • [License](#-license)

</div>

<br/>

## 📖 Overview

> AI Job Matcher connects candidates and employers through a suite of independent microservices — an AI resume parser, a TF-IDF based job matching engine, and a blockchain-backed **skill passport** for verified credentials — all fronted by a secure Spring Boot API gateway and a sleek React + TypeScript client.

<br/>

## 🌟 Key Features

<table>
<tr>
<td width="50%">

**🎨 Animated Landing Page**
Hero banner, live hiring trends, an interactive AI matching simulator, and animated stat counters.

**🌗 Glassmorphic Dark & Light Theme**
Seamless toggle with persistent theme state across sessions.

**📄 AI Resume Parser & ATS Scoring**
High-speed PDF/DOCX parsing that detects experience, technical skills, and ATS optimization tips.

</td>
<td width="50%">

**🎯 TF-IDF Job Match Engine**
Skill-gap analysis comparing candidate resumes against live job postings.

**🔗 Blockchain Skill Passport**
Cryptographically signed SHA-256 hash-chain ledger for verified skill credentials.

**🔔 Real-Time Notifications**
Instant application status updates and verification alerts.

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 18 · TypeScript · Vite · TailwindCSS · Recharts · Lucide Icons |
| **API Gateway** | Java 17 · Spring Boot 3.2 · Spring Security (JWT) · Spring Data JPA |
| **AI Microservices** | Python 3.11 · FastAPI · PyPDF2 · python-docx · scikit-learn (TF-IDF) · uvicorn |
| **Blockchain Service** | FastAPI · SHA-256 hash-chain ledger |
| **Database** | MySQL 8.x / MariaDB (via XAMPP) |

</div>

<br/>

## 🏗️ Architecture

```
                        ┌────────────────────┐
                        │   React Frontend     │  :3000
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │   API Gateway         │  :8080
                        │   (Spring Boot)       │
                        └──────────┬───────────┘
              ┌────────────────────┼────────────────────┐
     ┌────────▼────────┐ ┌─────────▼────────┐ ┌──────────▼─────────┐
     │ Resume Service   │ │ Matching Service │ │ Blockchain Service  │
     │ (FastAPI) :8001  │ │ (FastAPI) :8002  │ │ (FastAPI) :8003     │
     └───────────────────┘ └───────────────────┘ └─────────────────────┘
                                   │
                        ┌──────────▼───────────┐
                        │   MySQL Database       │
                        └────────────────────────┘
```

<br/>

## ⚡ Quick Start

> No Docker required — everything runs natively.

### Prerequisites

- Node.js 18+
- Java 17+ & Maven
- Python 3.11+
- XAMPP (or a standalone MySQL 8.x server)

<details>
<summary><b>1️⃣ Database Setup</b></summary>
<br/>

1. Start **Apache** & **MySQL** in the XAMPP Control Panel.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin`) or MySQL Workbench.
3. Import and run `database/schema_mysql.sql`.

</details>

<details>
<summary><b>2️⃣ Launch All Services (Windows one-click)</b></summary>
<br/>

```cmd
start_all.bat
```

This installs dependencies and starts all 5 microservices in separate windows. Run `stop_all.bat` to shut everything down.

</details>

<details>
<summary><b>3️⃣ Or start each service manually</b></summary>
<br/>

```bash
# Resume Service
cd resume-service && pip install -r requirements.txt && uvicorn app.main:app --port 8001

# Matching Service
cd matching-service && pip install -r requirements.txt && uvicorn app.main:app --port 8002

# Blockchain Service
cd blockchain-service && pip install -r requirements.txt && uvicorn app.main:app --port 8003

# API Gateway
cd api-gateway && mvn spring-boot:run

# Frontend
cd frontend && npm install && npm run dev
```

</details>

<br/>

### 🌐 Access the App

<div align="center">

| Service | URL |
|:---|:---|
| 💻 Frontend | `http://localhost:3000` |
| ☕ API Gateway | `http://localhost:8080` |
| 📄 Resume Service | `http://localhost:8001` |
| 🎯 Matching Service | `http://localhost:8002` |
| 🔗 Blockchain Service | `http://localhost:8003` |

</div>

<br/>

## 🔑 Demo Accounts

<div align="center">

| Role | Email | Password |
|:---|:---|:---|
| 👑 Admin | `admin@jobmatcher.com` | `Admin@123` |
| 🙋 Candidate | `alex@example.com` | `User@123` |

</div>

<br/>

## 📁 Project Structure

```
ai-job-matcher/
├── frontend/            # React + TypeScript + Vite client
├── api-gateway/         # Spring Boot API gateway (auth, routing)
├── resume-service/      # FastAPI — resume parsing & ATS scoring
├── matching-service/    # FastAPI — TF-IDF job matching engine
├── blockchain-service/  # FastAPI — skill credential ledger
├── database/            # MySQL schema
├── start_all.bat        # Start all services (Windows)
├── stop_all.bat         # Stop all services (Windows)
└── run_all.js           # Cross-platform launcher script
```

<br/>

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/my-feature`
3. Commit your changes
4. Push to the branch and open a Pull Request

<br/>

## 📄 License

Licensed under the **[MIT License](LICENSE)** © 2026 Pasindu Chamod.

<br/>

<div align="center">

Made with ❤️ using React, Spring Boot & FastAPI

</div>
