// Chiara's AI Marketing Studio - Renderer Process
let currentView = 'home';
let stats = {
    totalInfluencers: 0,
    totalCampaigns: 0,
    totalEarnings: 0,
    totalTime: 0
};

// Load stats from localStorage
function loadStats() {
    const saved = localStorage.getItem('chiara-stats');
    if (saved) {
        stats = JSON.parse(saved);
        updateStatsDisplay();
    }
}

function saveStats() {
    localStorage.setItem('chiara-stats', JSON.stringify(stats));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    document.getElementById('total-influencers').textContent = stats.totalInfluencers;
    document.getElementById('total-campaigns').textContent = stats.totalCampaigns;
    document.getElementById('total-earnings').textContent = `$${stats.totalEarnings}`;
    document.getElementById('total-time').textContent = `${stats.totalTime}h`;
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const view = item.dataset.view;
        switchView(view);
    });
});

function switchView(view) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === view) {
            item.classList.add('active');
        }
    });

    // Update views
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });
    document.getElementById(`view-${view}`).classList.add('active');

    currentView = view;
}

// Home - Action Cards
document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
        const action = card.dataset.action;
        switchView(action);
    });
});

// Example buttons
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const example = btn.dataset.example;
        const input = btn.closest('.generator-form').querySelector('input, textarea');
        input.value = example;
    });
});

// AI Influencer Generator
document.getElementById('btn-generate-influencer').addEventListener('click', async () => {
    const prompt = document.getElementById('influencer-prompt').value.trim();
    
    if (!prompt) {
        alert('Prosím zadaj popis influencera!');
        return;
    }

    // Show progress
    document.querySelector('.generator-form').style.display = 'none';
    document.getElementById('influencer-result').style.display = 'none';
    document.getElementById('influencer-progress').style.display = 'block';

    try {
        const result = await window.electronAPI.generateInfluencer(prompt);

        if (result.success) {
            // Update stats
            stats.totalInfluencers++;
            stats.totalEarnings += 150; // Average $150 per influencer
            stats.totalTime += 20; // Saved 20 hours
            saveStats();

            // Show result
            displayInfluencerResult(result);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        alert(`Chyba: ${error.message}\n\nSkontroluj či máš OpenAI API key v nastaveniach a či máš kredity.`);
        document.getElementById('influencer-progress').style.display = 'none';
        document.querySelector('.generator-form').style.display = 'block';
    }
});

function displayInfluencerResult(result) {
    const { influencer, contentCalendar, outputPath } = result;

    const html = `
        <div class="result-header">
            <h3>✅ AI Influencer vytvorený!</h3>
            <p>Kompletný influencer je pripravený na použitie</p>
        </div>

        <div class="result-card">
            <h4>👤 Identita</h4>
            <p><strong>Meno:</strong> ${influencer.name}</p>
            <p><strong>Vek:</strong> ${influencer.age}</p>
            <p><strong>Niche:</strong> ${influencer.niche}</p>
            <p><strong>Instagram:</strong> ${influencer.instagram.username}</p>
            <p><strong>TikTok:</strong> ${influencer.tiktok.username}</p>
        </div>

        <div class="result-card">
            <h4>📝 Bio</h4>
            <p>${influencer.instagram.bio}</p>
        </div>

        <div class="result-card">
            <h4>📅 Content Kalendár</h4>
            <p>Vygenerovaných ${contentCalendar.length} postov pre prvý týždeň</p>
            <p><strong>Príklad postu (Deň 1):</strong></p>
            <p style="margin-top: 8px; font-size: 13px;">${contentCalendar[0].caption}</p>
        </div>

        <div class="result-card">
            <h4>💾 Výstup</h4>
            <p>Všetky súbory uložené v:</p>
            <p style="margin-top: 8px; font-size: 12px; word-break: break-all;">${outputPath}</p>
            <button id="btn-open-influencer-folder" class="btn-secondary" style="margin-top: 12px;">
                Otvoriť priečinok
            </button>
        </div>

        <button id="btn-create-another" class="btn-primary" style="margin-top: 16px;">
            Vytvoriť ďalšieho influencera
        </button>
    `;

    const resultSection = document.getElementById('influencer-result');
    resultSection.innerHTML = html;
    resultSection.style.display = 'block';
    document.getElementById('influencer-progress').style.display = 'none';

    // Event listeners
    document.getElementById('btn-open-influencer-folder').addEventListener('click', () => {
        window.electronAPI.openOutputFolder(outputPath);
    });

    document.getElementById('btn-create-another').addEventListener('click', () => {
        document.getElementById('influencer-prompt').value = '';
        document.querySelector('.generator-form').style.display = 'block';
        resultSection.style.display = 'none';
        resetProgress();
    });
}

// Marketing Campaign Generator
document.getElementById('btn-generate-campaign').addEventListener('click', async () => {
    const brief = document.getElementById('campaign-brief').value.trim();
    
    if (!brief) {
        alert('Prosím zadaj popis klienta a cieľ!');
        return;
    }

    // Show progress
    document.querySelector('#view-marketing .generator-form').style.display = 'none';
    document.getElementById('campaign-result').style.display = 'none';
    document.getElementById('campaign-progress').style.display = 'block';

    try {
        const result = await window.electronAPI.generateCampaign(brief);

        if (result.success) {
            // Update stats
            stats.totalCampaigns++;
            stats.totalEarnings += 1000; // Average $1000 per campaign
            stats.totalTime += 15; // Saved 15 hours
            saveStats();

            // Show result
            displayCampaignResult(result);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        alert(`Chyba: ${error.message}\n\nSkontroluj či máš OpenAI API key v nastaveniach a či máš kredity.`);
        document.getElementById('campaign-progress').style.display = 'none';
        document.querySelector('#view-marketing .generator-form').style.display = 'block';
    }
});

function displayCampaignResult(result) {
    const { client, campaign, outputPath } = result;

    const html = `
        <div class="result-header">
            <h3>✅ Marketing Campaign vytvorený!</h3>
            <p>Kompletný 7-dňový campaign je pripravený</p>
        </div>

        <div class="result-card">
            <h4>🏢 Klient</h4>
            <p><strong>Business:</strong> ${client.business_name}</p>
            <p><strong>Industry:</strong> ${client.industry}</p>
            <p><strong>Cieľ:</strong> ${client.goal}</p>
        </div>

        <div class="result-card">
            <h4>📅 Campaign</h4>
            <p>Vygenerovaných ${campaign.length} postov pre prvý týždeň</p>
            <p><strong>Príklad postu (Deň 1):</strong></p>
            <p style="margin-top: 8px;"><strong>Platform:</strong> ${campaign[0].platform}</p>
            <p style="margin-top: 8px; font-size: 13px;">${campaign[0].caption}</p>
        </div>

        <div class="result-card">
            <h4>💾 Výstup</h4>
            <p>Všetky súbory uložené v:</p>
            <p style="margin-top: 8px; font-size: 12px; word-break: break-all;">${outputPath}</p>
            <button id="btn-open-campaign-folder" class="btn-secondary" style="margin-top: 12px;">
                Otvoriť priečinok
            </button>
        </div>

        <button id="btn-create-another-campaign" class="btn-primary" style="margin-top: 16px;">
            Vytvoriť ďalší campaign
        </button>
    `;

    const resultSection = document.getElementById('campaign-result');
    resultSection.innerHTML = html;
    resultSection.style.display = 'block';
    document.getElementById('campaign-progress').style.display = 'none';

    // Event listeners
    document.getElementById('btn-open-campaign-folder').addEventListener('click', () => {
        window.electronAPI.openOutputFolder(outputPath);
    });

    document.getElementById('btn-create-another-campaign').addEventListener('click', () => {
        document.getElementById('campaign-brief').value = '';
        document.querySelector('#view-marketing .generator-form').style.display = 'block';
        resultSection.style.display = 'none';
        resetCampaignProgress();
    });
}

// Progress listeners
window.electronAPI.onGenerationProgress((event, data) => {
    const { step, progress } = data;
    
    // Update progress bar
    const fillElement = document.getElementById('progress-fill') || document.getElementById('campaign-progress-fill');
    if (fillElement) {
        fillElement.style.width = `${progress}%`;
    }

    // Update status text
    const statusMessages = {
        identity: 'Generujem identitu influencera...',
        content: 'Vytváram content kalendár...',
        analyzing: 'Analyzujem klienta...',
        campaign: 'Generujem campaign posty...',
        saving: 'Ukladám súbory...',
        complete: 'Hotovo! ✓',
        error: 'Chyba pri generovaní'
    };

    const statusElement = document.getElementById('progress-status') || document.getElementById('campaign-progress-status');
    if (statusElement && statusMessages[step]) {
        statusElement.textContent = statusMessages[step];
    }

    // Update step indicators (for influencer)
    if (document.getElementById('progress-fill')) {
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
            if (stepEl.dataset.step === step) {
                stepEl.classList.add('active');
            }
            
            const steps = ['identity', 'content', 'saving', 'complete'];
            const currentIndex = steps.indexOf(step);
            const stepIndex = steps.indexOf(stepEl.dataset.step);
            if (stepIndex < currentIndex) {
                stepEl.classList.add('completed');
            }
        });
    }
});

function resetProgress() {
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('progress-status').textContent = 'Začíname...';
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
}

function resetCampaignProgress() {
    document.getElementById('campaign-progress-fill').style.width = '0%';
    document.getElementById('campaign-progress-status').textContent = 'Začíname...';
}

// Settings
document.getElementById('btn-save-api-key').addEventListener('click', async () => {
    const apiKey = document.getElementById('openai-api-key').value.trim();
    
    if (!apiKey) {
        alert('Prosím zadaj API key!');
        return;
    }

    const statusEl = document.getElementById('api-status');
    statusEl.innerHTML = '<span class="status-dot status-unknown"></span><span>Testujem...</span>';

    const result = await window.electronAPI.setApiKey(apiKey);

    if (result.success) {
        statusEl.innerHTML = '<span class="status-dot status-success"></span><span>✓ API key funguje!</span>';
        localStorage.setItem('chiara-api-key', apiKey);
    } else {
        statusEl.innerHTML = '<span class="status-dot status-error"></span><span>✗ Chyba: ' + result.message + '</span>';
    }
});

document.getElementById('btn-open-output').addEventListener('click', async () => {
    // Request to open the default output folder from main process
    try {
        await window.electronAPI.openOutputFolder('default');
    } catch (error) {
        console.error('Failed to open folder:', error);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();

    // Load saved API key
    const savedKey = localStorage.getItem('chiara-api-key');
    if (savedKey) {
        document.getElementById('openai-api-key').value = savedKey;
        // Auto-test it
        window.electronAPI.setApiKey(savedKey).then(result => {
            const statusEl = document.getElementById('api-status');
            if (result.success) {
                statusEl.innerHTML = '<span class="status-dot status-success"></span><span>✓ API key aktívny</span>';
            } else {
                statusEl.innerHTML = '<span class="status-dot status-error"></span><span>Potrebuje update</span>';
            }
        });
    }
});

