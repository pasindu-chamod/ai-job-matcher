-- MySQL Database Initialization Script for AI Job Matcher
CREATE DATABASE IF NOT EXISTS jobmatcher DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jobmatcher;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Admin Account (Password: Admin@123)
INSERT INTO users (id, full_name, email, password_hash, role)
VALUES (
    'admin-user-id-0000-0000-000000000001',
    'System Admin',
    'admin@jobmatcher.com',
    '$2b$10$ftj2x88i4y8jc8z1waxdQO/L6ZPEYD12o6Rt.L5JHhUK/gxcrMQKG',
    'ADMIN'
) ON DUPLICATE KEY UPDATE id=id;

-- Seed Sample Candidate Account (Password: User@123)
INSERT INTO users (id, full_name, email, password_hash, role)
VALUES (
    'demo-user-id-0000-0000-000000000002',
    'Alex Morgan',
    'alex@example.com',
    '$2b$10$ftj2x88i4y8jc8z1waxdQO/L6ZPEYD12o6Rt.L5JHhUK/gxcrMQKG',
    'USER'
) ON DUPLICATE KEY UPDATE id=id;

-- 2. Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    file_url TEXT,
    experience_years INT DEFAULT 0,
    education VARCHAR(500),
    summary TEXT,
    ats_score INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS resume_skills (
    resume_id VARCHAR(36) NOT NULL,
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (resume_id, skill),
    CONSTRAINT fk_resume_skills FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS resume_strengths (
    id VARCHAR(36) PRIMARY KEY,
    resume_id VARCHAR(36) NOT NULL,
    strength TEXT NOT NULL,
    CONSTRAINT fk_resume_strengths FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS resume_suggestions (
    id VARCHAR(36) PRIMARY KEY,
    resume_id VARCHAR(36) NOT NULL,
    suggestion TEXT NOT NULL,
    CONSTRAINT fk_resume_suggestions FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    company VARCHAR(500) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary VARCHAR(255),
    type VARCHAR(100) DEFAULT 'Full-time',
    is_active BOOLEAN DEFAULT TRUE,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS job_required_skills (
    job_id VARCHAR(36) NOT NULL,
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (job_id, skill),
    CONSTRAINT fk_job_skills FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    job_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) DEFAULT 'APPLIED',
    match_score INT DEFAULT 0,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_app_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Jobs
INSERT INTO jobs (id, title, company, description, location, salary, type) VALUES
('j1', 'Senior Full Stack AI Engineer', 'TechCorp Innovation Lab', 'Architect and build scalable web applications integrated with OpenAI & LLM APIs. Python, React, Docker, Cloud.', 'San Francisco, CA (Hybrid)', '$140,000 - $185,000', 'Full-time'),
('j2', 'Lead Frontend Architect', 'StartupXYZ Tech', 'Create high-performance user interfaces with React 18, TypeScript, TailwindCSS, and state management.', 'Remote', '$110,000 - $150,000', 'Full-time'),
('j3', 'Machine Learning & NLP Specialist', 'AI Innovations Global', 'Train transformer models, develop recommendation engines, and implement TF-IDF / vector search pipelines.', 'New York, NY', '$150,000 - $195,000', 'Full-time'),
('j4', 'Cloud DevOps & Security Specialist', 'CloudTech Platform', 'Manage CI/CD pipelines, Kubernetes clusters, Docker runtime, and AWS cloud security infrastructure.', 'Remote', '$120,000 - $160,000', 'Full-time'),
('j5', 'Backend Microservices Developer', 'WebSolutions Enterprise', 'Design high-throughput Java Spring Boot APIs, Redis cache systems, and MySQL databases.', 'Austin, TX', '$115,000 - $155,000', 'Full-time'),
('j6', 'Python Data Engineer', 'Data Corp Analytics', 'Build robust data ingestion pipelines, SQL data warehouses, and ETL flows for machine learning models.', 'Seattle, WA', '$125,000 - $165,000', 'Full-time')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Job Skills
INSERT IGNORE INTO job_required_skills (job_id, skill) VALUES
('j1', 'Python'), ('j1', 'React'), ('j1', 'Java'), ('j1', 'Spring'), ('j1', 'SQL'), ('j1', 'Docker'),
('j2', 'React'), ('j2', 'TypeScript'), ('j2', 'JavaScript'), ('j2', 'HTML'), ('j2', 'CSS'), ('j2', 'Tailwind'),
('j3', 'Python'), ('j3', 'TensorFlow'), ('j3', 'PyTorch'), ('j3', 'Machine Learning'), ('j3', 'SQL'),
('j4', 'Docker'), ('j4', 'Kubernetes'), ('j4', 'AWS'), ('j4', 'Linux'), ('j4', 'Git'),
('j5', 'Java'), ('j5', 'Spring'), ('j5', 'SQL'), ('j5', 'MySQL'), ('j5', 'Redis'), ('j5', 'REST API'),
('j6', 'Python'), ('j6', 'Django'), ('j6', 'Flask'), ('j6', 'SQL'), ('j6', 'PostgreSQL');
