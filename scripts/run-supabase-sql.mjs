import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Load .env.local first, fallback to .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF || 'ohpuurdgpeimbgjdrdze';

const targetSqlFile = process.argv[2];

if (!targetSqlFile) {
  console.error('Usage: node scripts/run-supabase-sql.mjs <path-to-sql-file>');
  process.exit(1);
}

if (!token) {
  console.error('Error: SUPABASE_ACCESS_TOKEN not found in .env or .env.local');
  process.exit(1);
}

async function runSql() {
  const resolvedPath = path.resolve(targetSqlFile);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: SQL file not found at ${resolvedPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(resolvedPath, 'utf8');
  console.log(`Executing ${path.basename(resolvedPath)} on Supabase project [${projectRef}]...`);

  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  const responseText = await res.text();
  if (res.ok) {
    console.log(`✅ Success (Status ${res.status}): SQL executed successfully!`);
  } else {
    console.error(`❌ Failed (Status ${res.status}):`, responseText);
    process.exit(1);
  }
}

runSql().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
