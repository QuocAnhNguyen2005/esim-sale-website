// start.mjs — Khởi động Client + Admin đồng thời, không cần cmd.exe
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const viteBin = resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

const colors = { reset: '\x1b[0m', cyan: '\x1b[36m', magenta: '\x1b[35m' };

function startProcess(label, color, args) {
  const proc = spawn(process.execPath, [viteBin, ...args], {
    stdio: 'pipe',
    shell: false,
    cwd: __dirname,
  });

  const prefix = `${color}[${label}]${colors.reset} `;

  proc.stdout.on('data', (data) => {
    data.toString().split('\n').forEach(line => {
      if (line.trim()) console.log(prefix + line);
    });
  });

  proc.stderr.on('data', (data) => {
    data.toString().split('\n').forEach(line => {
      if (line.trim()) console.error(prefix + line);
    });
  });

  proc.on('exit', (code) => {
    console.log(`${prefix}Exited with code ${code}`);
  });

  return proc;
}

console.log('\n🚀 Khởi động GlobaleSIM Dev Server...\n');

startProcess('CLIENT', colors.cyan,   ['--config', 'vite.config.ts']);
startProcess('ADMIN',  colors.magenta, ['--config', 'vite.admin.config.ts']);
