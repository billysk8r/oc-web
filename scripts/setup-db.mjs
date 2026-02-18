import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const VARS_FILE = '.dev.vars';
const DEFAULT_DB_NAME = 'oc-db';

async function setup() {
    console.log('🔍 Checking D1 database configuration...');

    // 1. Get existing databases from Wrangler
    let dbs = [];
    try {
        const output = execSync('npx wrangler d1 list --json', { encoding: 'utf-8' });
        dbs = JSON.parse(output);
    } catch (error) {
        console.error('❌ Failed to list D1 databases:', error.message);
        process.exit(1);
    }

    let targetDb = dbs.find(db => db.name === DEFAULT_DB_NAME) || dbs[0];

    // 2. If no database exists, create one
    if (!targetDb) {
        console.log(`✨ No databases found. Creating ${DEFAULT_DB_NAME}...`);
        try {
            execSync(`npx wrangler d1 create ${DEFAULT_DB_NAME}`, { stdio: 'inherit' });
            const output = execSync('npx wrangler d1 list --json', { encoding: 'utf-8' });
            dbs = JSON.parse(output);
            targetDb = dbs.find(db => db.name === DEFAULT_DB_NAME);
        } catch (error) {
            console.error('❌ Failed to create D1 database:', error.message);
            process.exit(1);
        }
    }

    if (!targetDb) {
        console.error('❌ Could not resolve a database.');
        process.exit(1);
    }

    console.log(`✅ Using database: ${targetDb.name} (${targetDb.uuid})`);

    // 3. Update .dev.vars (Only persistent change)
    let varsContent = '';
    if (fs.existsSync(VARS_FILE)) {
        varsContent = fs.readFileSync(VARS_FILE, 'utf-8');
    }

    const newVars = {
        DB_NAME: targetDb.name,
        DB_ID: targetDb.uuid
    };

    let updatedContent = varsContent;
    for (const [key, value] of Object.entries(newVars)) {
        const regex = new RegExp(`^${key}=.*`, 'm');
        if (regex.test(updatedContent)) {
            updatedContent = updatedContent.replace(regex, `${key}="${value}"`);
        } else {
            updatedContent += `\n${key}="${value}"`;
        }
    }

    if (updatedContent !== varsContent) {
        fs.writeFileSync(VARS_FILE, updatedContent.trim() + '\n');
        console.log(`📝 Updated ${VARS_FILE}`);
    } else {
        console.log(`✔ ${VARS_FILE} is already up to date.`);
    }

    // 4. Apply migrations to remote
    // We avoid touching or reading wrangler.jsonc by creating a temporary minimal config
    console.log('🚀 Applying migrations to remote database...');
    const tempConfigPath = path.join(os.tmpdir(), `wrangler-setup-${Date.now()}.json`);
    const migrationsDir = path.resolve(process.cwd(), 'migrations');

    const minimalConfig = {
        d1_databases: [
            {
                binding: 'DATABASE',
                database_name: targetDb.name,
                database_id: targetDb.uuid,
                migrations_dir: migrationsDir
            }
        ]
    };

    try {
        fs.writeFileSync(tempConfigPath, JSON.stringify(minimalConfig));
        execSync(`npx wrangler d1 migrations apply DATABASE --remote --config ${tempConfigPath}`, {
            stdio: 'inherit'
        });
        console.log('✅ Migrations applied successfully.');
    } catch (error) {
        console.error('⚠ Failed to apply migrations. You may need to run this manually.');
    } finally {
        if (fs.existsSync(tempConfigPath)) {
            fs.unlinkSync(tempConfigPath);
        }
    }
}

setup();
