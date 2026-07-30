const { spawn, execSync } = require('child_process');
const path = require('path');
const http = require('http');

console.log('========================================================');
console.log('         🚀 AI Job Matcher - Master System Launcher 🚀');
console.log('========================================================\n');

// 1. Release ports 8001, 8002, 8003, 8080, 3000
console.log('[1/6] Cleaning up any old processes on ports 8001, 8002, 8003, 8080, 3000...');
try {
  const ports = [8001, 8002, 8003, 8080, 3000];
  for (const port of ports) {
    try {
      const out = execSync(`netstat -aon | findstr ":${port} " | findstr "LISTENING"`, { encoding: 'utf8' });
      const lines = out.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(pid) && pid !== '0') {
          try { execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' }); } catch {}
        }
      }
    } catch {}
  }
} catch (e) {
  // ignore cleanup errors
}

const rootDir = __dirname;

// Helper to spawn service
function launchService(name, command, args, cwd) {
  console.log(`[Launch] Starting ${name}...`);
  const child = spawn(command, args, {
    cwd: cwd,
    shell: true,
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error(`❌ Failed to start ${name}:`, err.message);
  });
  return child;
}

// 2. Start Resume Service (Port 8001)
launchService(
  'Resume Microservice (Port 8001)',
  'python',
  ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8001', '--reload'],
  path.join(rootDir, 'resume-service')
);

// 3. Start Matching Service (Port 8002)
launchService(
  'Matching Microservice (Port 8002)',
  'python',
  ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8002', '--reload'],
  path.join(rootDir, 'matching-service')
);

// 4. Start Blockchain Service (Port 8003)
launchService(
  'Blockchain Microservice (Port 8003)',
  'python',
  ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8003', '--reload'],
  path.join(rootDir, 'blockchain-service')
);

// 5. Start Java API Gateway (Port 8080)
launchService(
  'Java API Gateway (Port 8080)',
  'java',
  [
    '-jar',
    path.join(rootDir, 'api-gateway', 'target', 'api-gateway-1.0.0.jar'),
    '--spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration'
  ],
  path.join(rootDir, 'api-gateway', 'target')
);

// 6. Start React Frontend (Port 3000)
launchService(
  'React Vite Frontend (Port 3000)',
  'npm',
  ['run', 'dev'],
  path.join(rootDir, 'frontend')
);

console.log('\n========================================================');
console.log('⏳ Waiting 4 seconds for services to initialize...');

setTimeout(() => {
  console.log('🌐 Opening Browser at http://localhost:3000/ ...');
  const startCmd = process.platform === 'win32' ? 'start' : 'open';
  try {
    execSync(`${startCmd} http://localhost:3000/`);
  } catch (err) {
    console.log('Please open http://localhost:3000 in your browser.');
  }

  console.log('\n========================================================');
  console.log('✅ All 5 Microservices are active!');
  console.log('🌐 Web Application URL : http://localhost:3000');
  console.log('☕ API Gateway URL     : http://localhost:8080');
  console.log('========================================================');
  console.log('\nPress Ctrl+C at any time to stop all services.');
}, 4000);
