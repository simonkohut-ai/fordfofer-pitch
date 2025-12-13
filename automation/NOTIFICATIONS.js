/**
 * 🔔 NOTIFICATION SYSTEM
 * Simuluje notifikácie keď prichádzajú platby
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function playNotification() {
    // Windows notification sound
    exec('powershell -c (New-Object Media.SoundPlayer "C:\\Windows\\Media\\notify.wav").PlaySync()', () => {});
    
    // Windows toast notification
    exec(`powershell -c [Windows.UI.Notifications.ToastNotificationManager,Windows.UI.Notifications,ContentType=WindowsRuntime]::CreateToastNotifier('FordFofer').Show([Windows.UI.Notifications.ToastNotification]::new([Windows.Data.Xml.Dom.XmlDocument]::new().LoadXml('<toast><visual><binding template="ToastText02"><text id="1">💰 SKRILL PAYMENT!</text><text id="2">Nová platba na gcapovic.biz@proton.me</text></binding></visual></toast>')))`, () => {});
    
    console.log('🔔 NOTIFIKÁCIA ODOSLANÁ!');
}

function checkPayments() {
    // Simulácia - v realite by si toto pripojil na Skrill API/webhook
    console.log('💰 Checking for payments...');
    
    // Každých 30 sekúnd skontroluj (v realite by to bolo cez webhook)
    setInterval(() => {
        // Simulácia náhodnej platby (v realite by to bolo cez Skrill API)
        if (Math.random() > 0.95) { // 5% šanca každých 30s
            playNotification();
            console.log('💰💰💰 NOVÁ PLATBA! 💰💰💰');
        }
    }, 30000);
}

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🔔 NOTIFICATION SYSTEM                                     ║
║     Monitoring Skrill payments...                             ║
╚═══════════════════════════════════════════════════════════════╝
`);

// Test notification
playNotification();

// Start monitoring
checkPayments();

console.log('✅ Notification system running!');
console.log('   Checking every 30 seconds...\n');


