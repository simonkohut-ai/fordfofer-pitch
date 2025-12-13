# 🤖 FORDFOFER FULL AUTOMATION SYSTEM

## Cieľ: Zero práca, 24/7 marketing

---

## ARCHITEKTÚRA

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATION PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ⏰ CRON (každé 4 hodiny)                                      │
│            │                                                    │
│            ▼                                                    │
│   🤖 AI GENERATOR (OpenAI/Claude)                              │
│            │                                                    │
│            ▼                                                    │
│   📝 CONTENT CREATED                                           │
│            │                                                    │
│            ▼                                                    │
│   📅 BUFFER API                                                │
│            │                                                    │
│            ▼                                                    │
│   📱 POSTED TO: Instagram, TikTok, LinkedIn, Twitter           │
│                                                                 │
│   💰 PEOPLE SEE → CLICK LINK → PAY VIA SKRILL → YOU EARN      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## MOŽNOSŤ 1: ZAPIER (Najjednoduchšie - $20/mes)

### Setup:

1. **Vytvor účet:** https://zapier.com
2. **Vytvor Zap:**
   - Trigger: Schedule (every 4 hours)
   - Action 1: OpenAI → Generate text
   - Action 2: Buffer → Create post

### Zapier Template:

```
TRIGGER: Schedule by Zapier
├── Every: 4 hours
│
ACTION 1: OpenAI - Chat
├── Model: gpt-4
├── Prompt: [PROMPT NIŽŠIE]
│
ACTION 2: Buffer - Create Update
├── Profile: [Your Instagram]
├── Text: {{OpenAI Response}}
├── Schedule: Now
```

---

## MOŽNOSŤ 2: MAKE.COM (Lacnejšie - $9/mes)

### Setup:

1. **Vytvor účet:** https://make.com
2. **Vytvor Scenario:**
   - Scheduler → OpenAI → Buffer

---

## MOŽNOSŤ 3: VLASTNÝ SCRIPT (Zadarmo)

### Potrebuješ:
- Node.js na PC (alebo server)
- OpenAI API key ($5 kredit)
- Buffer Access Token

### Inštalácia:

```bash
cd fordfofer-pitch/automation
npm init -y
npm install openai node-fetch node-cron
```

---

## 🔑 API KEYS POTREBNÉ:

### 1. OpenAI API Key
- Choď na: https://platform.openai.com/api-keys
- Vytvor nový key
- Cena: ~$0.01 za post

### 2. Buffer Access Token
- Choď na: https://buffer.com/developers/apps
- Vytvor app → Get token

---

## 📝 MASTER PROMPT PRE AI:

```
Si marketingový manager pre FordFofer - $1.2B AI trading systém.

KONTEXT:
- FordFofer je AI autonómny kapitálový systém
- Ponúkame early investor prístup za €50 (lifetime)
- AI agenti pracujú 24/7, zero ľudská chyba
- Skrill platby: gcapovic.biz@proton.me
- Website: fordfofer.vercel.app

ÚLOHA:
Vygeneruj 1 Instagram post.

PRAVIDLÁ:
- Max 150 slov
- Emoji na začiatku
- Brutálne sebavedomý tón
- Urgencia a exkluzivita
- CTA: "Link v bio" alebo website
- 5-7 hashtagov na konci
- Mix SK/EN je OK

TÉMY (rotuj náhodne):
1. AI pracuje 24/7
2. €50 early access
3. Zero ľudská chyba
4. Limitované miesta
5. $1.2B kapacita
6. Urgencia - cena rastie
7. Posledná šanca

FORMÁT:
Len samotný post text, nič iné.
```

---

## 🚀 DEPLOYMENT OPTIONS:

### A) Lokálne (tvoj PC musí bežať)
```bash
node auto-marketing.js
```

### B) Cloud - Zadarmo (odporúčané)
- **Railway.app** - zadarmo tier
- **Render.com** - zadarmo tier
- **Vercel Cron** - zadarmo

### C) Zapier/Make (platené ale najjednoduchšie)
- Zero setup
- Zero maintenance
- Funguje 24/7

---

## ⏰ ODPORÚČANÝ SCHEDULE:

| Čas | Platforma | Obsah |
|-----|-----------|-------|
| 08:00 | Instagram | AI generated |
| 12:00 | LinkedIn | AI generated |
| 16:00 | Twitter | AI generated |
| 20:00 | Instagram | AI generated |
| 00:00 | TikTok | AI generated |

= 5 postov denne = 150 postov mesačne = AUTOMATICKY

---

## 💰 NÁKLADY:

| Služba | Cena/mesiac |
|--------|-------------|
| OpenAI API | ~$3 (150 postov) |
| Zapier | $20 (alebo Make $9) |
| Buffer | Free tier |
| **SPOLU** | **$12-23/mesiac** |

---

## ✅ QUICK START (10 minút):

1. Vytvor Zapier účet
2. Pripoj OpenAI (potrebuješ API key)
3. Pripoj Buffer (už máš)
4. Nastav schedule (every 4 hours)
5. HOTOVO - automaticky postuje navždy

---



