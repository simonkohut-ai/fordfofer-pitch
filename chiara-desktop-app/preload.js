const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Set API key
    setApiKey: (apiKey) => ipcRenderer.invoke('set-api-key', apiKey),
    
    // Generate influencer
    generateInfluencer: (prompt) => ipcRenderer.invoke('generate-influencer', prompt),
    
    // Generate campaign
    generateCampaign: (brief) => ipcRenderer.invoke('generate-campaign', brief),
    
    // Open output folder
    openOutputFolder: (path) => ipcRenderer.invoke('open-output-folder', path),
    
    // Progress listener
    onGenerationProgress: (callback) => {
        ipcRenderer.on('generation-progress', callback);
    }
});

