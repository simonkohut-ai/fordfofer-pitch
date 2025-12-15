# 🎨 Chiara's AI Marketing Studio

> **n8n-Inspired Design** | AI-powered marketing automation platform

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
![Design](https://img.shields.io/badge/design-n8n%20inspired-orange)
![Platform](https://img.shields.io/badge/platform-Windows-blue)

---

## ✨ Features

### 🦄 AI Influencer Generator
- Complete influencer identity generation
- Instagram & TikTok profiles
- 30-day content calendar
- Landing page HTML
- ~3-4 minute generation time

### 🚀 Marketing Campaign Generator
- Full 30-day campaign strategy
- Social media posts
- Email sequences
- Ad copy variations
- ~2 minute generation time

---

## 🎨 Design

**n8n-Inspired Interface:**
- Clean, minimalist design
- Sidebar navigation
- Card-based layout
- Smooth animations
- Professional color palette
- Real-time progress indicators

**Colors:**
- Primary: `#FF6D5A` (n8n red-orange)
- Secondary: `#667eea` (purple)
- Background: `#f9fafb` (light gray)
- Text: `#1f2937` (dark gray)

---

## 🚀 Quick Start

### Desktop Shortcut
✅ **Shortcut created on your desktop:** "Chiara Studio"

### Manual Launch
```bash
START.bat
```

---

## 📋 Setup

### Prerequisites
- ✅ Node.js installed
- ✅ Dependencies installed (`npm install`)
- ⚠️ OpenAI API key (required)

### First Run
1. Launch app
2. Go to **Settings**
3. Enter OpenAI API key
4. Click **Save & Test**
5. Wait for green status ✓

### Get API Keys
- **OpenAI:** https://platform.openai.com/api-keys
- **Cost:** ~$0.60 per influencer, ~$0.20 per campaign

---

## 📁 Project Structure

```
chiara-desktop-app/
├── index.html              # Main UI (n8n-inspired)
├── styles.css              # n8n styling
├── renderer.js             # Frontend logic
├── main.js                 # Electron main process
├── preload.js              # IPC bridge
├── package.json            # Dependencies
├── START.bat               # Quick launcher
├── CREATE_DESKTOP_SHORTCUT.vbs
└── assets/
    └── icon.ico            # (optional)
```

---

## 🖥️ UI Overview

### Sidebar Navigation
- 🏠 **Home** - Dashboard with action cards
- 👤 **AI Influencer** - Generate influencer profiles
- 📊 **Marketing** - Generate campaigns
- 🕐 **History** - View past generations
- ⚙️ **Settings** - API keys & config

### Main Content
- **Action Cards** - Quick access to generators
- **Form Inputs** - Clean, modern forms
- **Progress Bars** - Real-time generation status
- **Result Cards** - Organized output display

---

## ⚙️ Configuration

### OpenAI API
```javascript
// Set in Settings UI or config
OPENAI_API_KEY: 'sk-proj-...'
```

### Output Directory
```
Documents/ChiarasAIStudio/
├── influencers/
│   └── [name]/
└── campaigns/
    └── [client]/
```

---

## 💡 Usage Examples

### AI Influencer
```
Input: "Sophia, 25, fitness influencer, blonde, athletic"

Output:
- Complete identity (name, age, personality)
- Instagram profile (bio, 12 posts)
- TikTok profile (bio, 10 videos)
- Content calendar (30 days)
- Landing page (HTML)
```

### Marketing Campaign
```
Input: "Client: Fitness Gym, Goal: Get 100 members"

Output:
- Marketing strategy
- 30 social media posts
- 7-email sequence
- 10 ad copy variations
- Landing page HTML
```

---

## 🎯 Pricing Model

### Your Costs
- AI Influencer: ~$0.60
- Marketing Campaign: ~$0.20

### Sell For
- AI Influencer Package: $50-$200
- Marketing Campaign: $500-$2,000

### Profit Potential
- **Per Influencer:** $49-$199
- **Per Campaign:** $499-$1,999
- **Monthly Potential:** $21,000+

---

## 🔧 Development

### Install Dependencies
```bash
npm install
```

### Run Development
```bash
npm start
```

### Build Windows Installer
```bash
npm run build
```

### Build Output
```
dist/
└── Chiara's AI Marketing Studio Setup 1.0.0.exe
```

---

## 📊 Stats Tracking

App automatically tracks:
- ✅ Total influencers generated
- ✅ Total campaigns created
- ✅ Total earnings (estimated)
- ✅ Time saved (estimated)

Stored in: `localStorage` (persistent)

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Reinstall dependencies
npm install

# Check Node.js version
node --version  # Should be 16+
```

### API Key Error
- Go to Settings
- Test API key
- Check quota at platform.openai.com/account/usage

### Generation Fails
- Verify API key has credits
- Check internet connection
- Review error message in Settings

---

## 📝 Changelog

### v1.0.0 (Dec 14, 2025)
- ✅ New n8n-inspired design
- ✅ Sidebar navigation
- ✅ Card-based layout
- ✅ Smooth animations
- ✅ Progress indicators
- ✅ Desktop shortcut creator
- ✅ Modern color palette
- ✅ Enhanced UI/UX

---

## 📧 Support

**Developer:** Goliáš Čapovič  
**Email:** gcapovic.biz@proton.me  
**Website:** fordfofer.vercel.app

---

## 📄 License

Proprietary - All rights reserved

---

## 🙏 Credits

**Design Inspiration:** [n8n.io](https://n8n.io)  
**Framework:** [Electron](https://www.electronjs.org/)  
**AI:** [OpenAI GPT-4o-mini](https://platform.openai.com/)

---

**Built with ❤️ by Goliáš Čapovič**

🚀 **Ready to generate unlimited AI influencers and marketing campaigns!**

