import { mkdir, cp } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');
const outputDir = join(repoRoot, '.vercel', 'output');
const staticDir = join(outputDir, 'static');
const dashboardOutput = join(staticDir, 'dashboard');

async function copyRecursive(src, dest) {
  const { readdir, stat } = await import('fs/promises');
  const entries = await readdir(src, { withFileTypes: true });
  
  await mkdir(dest, { recursive: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    // Skip api/ directory (serverless functions)
    if (entry.isDirectory() && entry.name === 'api') {
      continue;
    }
    
    // Skip node_modules
    if (entry.name === 'node_modules') {
      continue;
    }
    
    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      const { copyFile } = await import('fs/promises');
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('Building Vercel static output...');
  
  // Create output directories
  await mkdir(outputDir, { recursive: true });
  await mkdir(staticDir, { recursive: true });
  await mkdir(dashboardOutput, { recursive: true });
  
  // Copy dashboard folder (excluding api/)
  const dashboardSrc = join(repoRoot, 'dashboard');
  if (existsSync(dashboardSrc)) {
    console.log(`Copying dashboard/ to .vercel/output/static/dashboard/ (excluding api/)...`);
    await copyRecursive(dashboardSrc, dashboardOutput);
    console.log('✅ Dashboard files copied');
  } else {
    console.error('❌ dashboard/ directory not found');
    process.exit(1);
  }
  
  // Create Vercel config.json
  const config = {
    version: 3,
    routes: [],
    outputDirectory: 'static'
  };
  
  const configPath = join(outputDir, 'config.json');
  const { writeFile } = await import('fs/promises');
  await writeFile(configPath, JSON.stringify(config, null, 2));
  console.log('✅ Created .vercel/output/config.json');
  
  // Verify critical files exist
  const criticalFiles = [
    'dashboard/index.html',
    'dashboard/prelaunch.html',
    'dashboard/pricing.html',
    'dashboard/thank-you.html'
  ];
  
  for (const file of criticalFiles) {
    const filePath = join(staticDir, file);
    if (existsSync(filePath)) {
      console.log(`✅ ${file} exists in output`);
    } else {
      console.error(`❌ ${file} MISSING in output`);
      process.exit(1);
    }
  }
  
  console.log('\n✅ Build complete. All dashboard HTML files are in .vercel/output/static/');
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});

