/**
 * 👁️ FILE WATCHER - Auto commit pri každej zmene
 * Spustenie: node watch-changes.js
 */

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     👁️ FILE WATCHER - MAGIC WAND MODE                         ║
║     Watching for changes...                                    ║
╚═══════════════════════════════════════════════════════════════╝
`);

const watcher = chokidar.watch('.', {
    ignored: [
        /node_modules/,
        /.git/,
        /latest-post.txt/,
        /\.DS_Store/
    ],
    persistent: true
});

let timeout;
const DEBOUNCE_MS = 5000; // Wait 5 seconds after last change

watcher.on('change', (filePath) => {
    console.log(`\n📝 File changed: ${filePath}`);
    
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
        console.log('\n🔮 Auto-committing changes...\n');
        
        try {
            execSync('node auto-commit.js', {
                cwd: __dirname,
                stdio: 'inherit'
            });
        } catch (error) {
            console.error('❌ Auto-commit failed:', error.message);
        }
    }, DEBOUNCE_MS);
});

console.log('✅ Watching files... Press Ctrl+C to stop.\n');


