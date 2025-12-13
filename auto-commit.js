/**
 * 🔮 MAGIC WAND - Auto commit + push + health check
 * Spustenie: node auto-commit.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(cmd) {
    try {
        const output = execSync(cmd, { 
            cwd: path.join(__dirname),
            encoding: 'utf8',
            stdio: 'inherit'
        });
        return output;
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return null;
    }
}

function healthCheck() {
    console.log('\n🔍 HEALTH CHECK...\n');
    
    // Check live site
    try {
        const https = require('https');
        https.get('https://fordfofer.vercel.app', (res) => {
            if (res.statusCode === 200) {
                console.log('✅ Live site: 200 OK');
            } else {
                console.log(`⚠️ Live site: ${res.statusCode}`);
            }
        });
    } catch (e) {
        console.log('⚠️ Health check skipped');
    }
    
    // Check files
    const files = [
        'landing-page/index.html',
        'landing-page/links.html',
        'automation/UNICORN_AUTO.js',
        'vercel.json'
    ];
    
    files.forEach(file => {
        if (fs.existsSync(path.join(__dirname, file))) {
            console.log(`✅ ${file}`);
        } else {
            console.log(`❌ ${file} MISSING`);
        }
    });
    
    console.log('\n');
}

function autoCommit() {
    console.log('🔮 MAGIC WAND ACTIVATED\n');
    console.log('═'.repeat(50));
    
    // Check for changes
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        
        if (!status.trim()) {
            console.log('✅ No changes to commit\n');
            healthCheck();
            return;
        }
        
        console.log('📝 Changes detected:\n');
        console.log(status);
        console.log('\n');
        
        // Add all
        console.log('📦 Adding files...');
        runCommand('git add -A');
        
        // Commit
        const timestamp = new Date().toLocaleString('sk-SK');
        const commitMsg = `🔮 Auto-commit: ${timestamp}`;
        console.log(`💾 Committing: ${commitMsg}`);
        runCommand(`git commit -m "${commitMsg}"`);
        
        // Push
        console.log('🚀 Pushing to GitHub...');
        runCommand('git push origin main');
        
        // Deploy
        console.log('🌐 Deploying to Vercel...');
        runCommand('npx vercel --prod --yes');
        
        // Health check
        healthCheck();
        
        console.log('✅ MAGIC WAND COMPLETE!\n');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Run
autoCommit();


