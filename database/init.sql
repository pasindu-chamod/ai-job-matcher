CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    file_url TEXT,
    experience_years INTEGER DEFAULT 0,
    education VARCHAR(500),
    summary TEXT,
    ats_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resume_skills (
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (resume_id, skill)
);

CREATE TABLE IF NOT EXISTS resume_strengths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    strength TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resume_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    suggestion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    company VARCHAR(500) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary VARCHAR(255),
    type VARCHAR(100) DEFAULT 'Full-time',
    is_active BOOLEAN DEFAULT TRUE,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_required_skills (
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (job_id, skill)
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied',
    match_score INTEGER,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Jobs
INSERT INTO jobs (title, company, description, location, salary, type) VALUES
('Senior Software Engineer', 'TechCorp', 'Build scalable cloud applications', 'San Francisco, CA', '$120,000 - $160,000', 'Full-time'),
('Frontend Developer', 'StartupXYZ', 'Create beautiful UIs with React', 'Remote', '$90,000 - $130,000', 'Full-time'),
('ML Engineer', 'AI Innovations', 'Develop ML models', 'New York, NY', '$140,000 - $180,000', 'Full-time'),
('Full Stack Developer', 'WebSolutions', 'Work on frontend and backend', 'Austin, TX', '$100,000 - $140,000', 'Full-time'),
('Python Developer', 'Data Corp', 'Build data pipelines', 'Seattle, WA', '$110,000 - $150,000', 'Full-time'),
('DevOps Engineer', 'CloudTech', 'Manage infrastructure', 'Remote', '$115,000 - $155,000', 'Full-time'),
('React Developer', 'UX Studio', 'Create interactive apps', 'Los Angeles, CA', '$95,000 - $135,000', 'Full-time'),
('Backend Engineer', 'API Masters', 'Design RESTful APIs', 'Boston, MA', '$105,000 - $145,000', 'Full-time');

-- Job Skills
INSERT INTO job_required_skills (job_id, skill) VALUES
((SELECT id FROM jobs WHERE title = 'Senior Software Engineer' LIMIT 1), 'Java'),
((SELECT id FROM jobs WHERE title = 'Senior Software Engineer' LIMIT 1), 'Spring'),
((SELECT id FROM jobs WHERE title = 'Senior Software Engineer' LIMIT 1), 'SQL'),
((SELECT id FROM jobs WHERE title = 'Senior Software Engineer' LIMIT 1), 'Docker'),
((SELECT id FROM jobs WHERE title = 'Senior Software Engineer' LIMIT 1), 'AWS'),
((SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1), 'React'),
((SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1), 'TypeScript'),
((SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1), 'JavaScript'),
((SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1), 'HTML'),
((SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1), 'CSS'),
((SELECT id FROM jobs WHERE title = 'ML Engineer' LIMIT 1), 'Python'),
((SELECT id FROM jobs WHERE title = 'ML Engineer' LIMIT 1), 'TensorFlow'),
((SELECT id FROM jobs WHERE title = 'ML Engineer' LIMIT 1), 'PyTorch'),
((SELECT id FROM jobs WHERE title = 'ML Engineer' LIMIT 1), 'SQL'),
((SELECT id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1), 'React'),
((SELECT id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1), 'Node'),
((SELECT id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1), 'Express'),
((SELECT id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1), 'MongoDB'),
((SELECT id FROM jobs WHERE title = 'Python Developer' LIMIT 1), 'Python'),
((SELECT id FROM jobs WHERE title = 'Python Developer' LIMIT 1), 'Django'),
((SELECT id FROM jobs WHERE title = 'Python Developer' LIMIT 1), 'Flask'),
((SELECT id FROM jobs WHERE title = 'Python Developer' LIMIT 1), 'SQL'),
((SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), 'Docker'),
((SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), 'Kubernetes'),
((SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), 'AWS'),
((SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), 'Linux'),
((SELECT id FROM jobs WHERE title = 'React Developer' LIMIT 1), 'React'),
((SELECT id FROM jobs WHERE title = 'React Developer' LIMIT 1), 'JavaScript'),
((SELECT id FROM jobs WHERE title = 'React Developer' LIMIT 1), 'Redux'),
((SELECT id FROM jobs WHERE title = 'React Developer' LIMIT 1), 'HTML'),
((SELECT id FROM jobs WHERE title = 'Backend Engineer' LIMIT 1), 'Node'),
((SELECT id FROM jobs WHERE title = 'Backend Engineer' LIMIT 1), 'Express'),
((SELECT id FROM jobs WHERE title = 'Backend Engineer' LIMIT 1), 'PostgreSQL'),
((SELECT id FROM jobs WHERE title = 'Backend Engineer' LIMIT 1), 'REST API');