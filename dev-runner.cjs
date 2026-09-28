#!/usr/bin/env node
const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  env: process.env,
});

const cleanup = () => {
  if (child && !child.killed) {
    child.kill('SIGTERM');
  }
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

child.on('exit', (code) => {
  process.exit(code || 0);
});
