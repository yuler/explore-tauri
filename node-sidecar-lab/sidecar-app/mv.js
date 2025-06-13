import { execSync } from 'child_process';
import fs from 'fs';

const ext = process.platform === 'win32' ? '.exe' : '';

const rustInfo = execSync('rustc -vV');
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
}

// Copy the binary with architecture suffix
fs.copyFileSync(
  `app${ext}`,
  `../src-tauri/binaries/app-${targetTriple}${ext}`
);
