import { execSync } from 'child_process';
import fs from 'fs';

const VARS_FILE = '.dev.vars';

function loadVars() {
    if (!fs.existsSync(VARS_FILE)) return {};
    const content = fs.readFileSync(VARS_FILE, 'utf-8');
    const vars = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^([^#\s=]+)\s*=\s*("?)(.*)\2/);
        if (match) {
            vars[match[1]] = match[3];
        }
    });
    return vars;
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: node scripts/with-vars.mjs <command>');
    process.exit(1);
}

const vars = loadVars();
const command = args.join(' ');

console.log(`🚀 Running command with variables from ${VARS_FILE}...`);

try {
    execSync(command, {
        stdio: 'inherit',
        env: { ...process.env, ...vars }
    });
} catch (error) {
    process.exit(1);
}
