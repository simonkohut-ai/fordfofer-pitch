# MikoRK pohrebníctvo — Showcase Stránka

**URL:** `/showcase/mikork` (SK) | `/showcase/mikork/en` (EN)  
**Status:** ✅ Aktívna  
**Dátum:** 2025-12-17

---

## Prehľad

Verejná showcase stránka pre projekt MikoRK pohrebníctvo. Navrhnutá pre sociálny traffic s optimalizovanými SEO a OpenGraph tagmi. Demonštruje dôstojnú, dôveryhodnú lokálnu webovú stránku pre podniky.

---

## Rozsah Dodávky

### Obsah Stránky
- ✅ Hero sekcia s názvom projektu
- ✅ Prehľad (problém → výsledok)
- ✅ Rozpis dodávok (5 kľúčových komponentov)
- ✅ Porovnanie Pred/Po
- ✅ Blok pripravený na metriky
- ✅ Čo sme sa naučili / znovupoužiteľná šablóna
- ✅ CTA odkazujúci na `/prelaunch`

### SEO & Sociálne Siete
- ✅ Title tag (150-160 znakov)
- ✅ Meta description (150-160 znakov)
- ✅ Canonical URL
- ✅ OpenGraph tagy (og:title, og:description, og:url, og:image)
- ✅ Twitter/X tagy (twitter:card, twitter:title, twitter:description, twitter:image)
- ✅ JSON-LD štruktúrované údaje (Article schema)
- ✅ OG obrázok na `/assets/og/mikork-og.svg` (1200x630)
- ✅ Hreflang alternatívy (sk, en)

### Navigácia & Zjistiteľnosť
- ✅ Odkaz pridaný do footeru domovskej stránky ("Showcase: MikoRK")
- ✅ Trasy pridané do `vercel.json`
- ✅ URL pridané do `sitemap.xml`
- ✅ Prepínač jazykov (SK/EN) na oboch stránkach

---

## Jazykové Verzie

### Slovenčina (SK) — Predvolená
- **URL:** `/showcase/mikork`
- **Canonical:** `https://www.golocapo.com/showcase/mikork`
- **Jazyk:** `lang="sk"`
- **Obsah:** Kompletne preložený do slovenčiny

### Angličtina (EN)
- **URL:** `/showcase/mikork/en`
- **Canonical:** `https://www.golocapo.com/showcase/mikork/en`
- **Jazyk:** `lang="en"`
- **Obsah:** Anglický obsah

---

## Dlhodobá Spolupráca

### Mesačný Plán Starostlivosti

Pre MikoRK pohrebníctvo ponúkame **dlhodobú spoluprácu** v rámci mesačného plánu starostlivosti:

#### Čo Zahŕňa:
- ✅ **Aktualizácie obsahu** — Pravidelné aktualizácie stránok, služieb, informácií
- ✅ **SEO monitoring** — Sledovanie pozícií v Google, optimalizácia lokálneho SEO
- ✅ **Generovanie obsahu** — Vzdelávacie príspevky, sezónne oznámenia (s manuálnym schválením)
- ✅ **Sledovanie konverzií** — Analýza kontaktných formulárov, telefónnych hovorov, dotazov
- ✅ **Vylepšenia konverzií** — Optimalizácia na základe dát, A/B testovanie

#### SLA Podpora:
- **Reakčný čas:** Do 24 hodín na kritické problémy
- **Aktualizácie:** Do 48 hodín na bežné požiadavky
- **Mesačné reporty:** Prehľad výkonnosti, návrhy na zlepšenie
- **Pravidelné check-iny:** Mesačné stretnutia na diskusiu o výsledkoch

#### Etické Pravidlá (Dôležité):
- ✅ **Žiadne automatizované kondolencie** — Vždy osobné
- ✅ **Manuálne schválenie obsahu** — Všetok obsah pred zverejnením
- ✅ **Rešpektujúci tón** — Vždy dôstojný, profesionálny
- ✅ **Súkromie na prvom mieste** — GDPR-kompatibilné, minimálne sledovanie
- ✅ **Ľudský kontakt** — Automatizácia podporuje, nikdy nenahradí ľudí

#### Investícia:
- **Mesačný plán:** €300-600/mesiac (podľa rozsahu)
- **Jednorazové vylepšenia:** Podľa dohody
- **Flexibilita:** Zrušiteľné kedykoľvek, bez záväzkov

---

## Súbory

### Vytvorené
- `showcase/mikork.html` - Slovenská verzia (predvolená)
- `showcase/mikork/en.html` - Anglická verzia
- `assets/og/mikork-og.svg` - OG obrázok (1200x630)
- `docs/showcases/MIKORK_SHOWCASE_README.md` - Tento súbor

### Upravené
- `vercel.json` - Pridané trasy pre SK a EN
- `sitemap.xml` - Pridané URL pre obe verzie
- `dashboard/index.html` - Aktualizovaný footer odkaz

---

## Ako Klonovať pre Ďalšieho Klienta

### 1. Skopírovať Šablónu
```bash
cp showcase/mikork.html showcase/[meno-klienta].html
cp showcase/mikork/en.html showcase/[meno-klienta]/en.html
```

### 2. Aktualizovať Obsah
- Nahradiť "MikoRK pohrebníctvo" názvom klienta
- Aktualizovať sekcie problému/výsledku
- Aktualizovať zoznam dodávok
- Aktualizovať pred/po body
- Aktualizovať CTA text podľa potreby

### 3. Aktualizovať SEO Meta Tagy
- Aktualizovať `<title>` tag
- Aktualizovať `meta name="description"`
- Aktualizovať `og:title`, `og:description`, `og:url`
- Aktualizovať `twitter:title`, `twitter:description`
- Aktualizovať canonical URL
- Aktualizovať JSON-LD štruktúrované údaje

### 4. Vytvoriť OG Obrázok
- Vytvoriť `assets/og/[meno-klienta]-og.svg` (1200x630)
- Aktualizovať `og:image` a `twitter:image` URL

### 5. Aktualizovať Smerovanie
- Pridať pravidlo rewrite do `vercel.json`
- Pridať URL do `sitemap.xml`
- Pridať odkaz do footeru domovskej stránky (voliteľné)

### 6. Overiť
- Skontrolovať, či sa stránka načíta: `curl -I https://www.golocapo.com/showcase/[meno-klienta]`
- Skontrolovať, či sa OG obrázok načíta: `curl -I https://www.golocapo.com/assets/og/[meno-klienta]-og.svg`
- Testovať OG preview: https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/[meno-klienta]

---

## QA Checklist

### Vizuálne
- [ ] Tmavé pozadie (`#0B0B12`) viditeľné
- [ ] Typografia správna (brand font, veľkosti, farby)
- [ ] Rozostupy konzistentné (používa CSS premenné)
- [ ] Tlačidlá správne štýlované (primary, ghost)
- [ ] Karty sa zobrazujú správne
- [ ] Footer sa zobrazuje správne

### Mobilné
- [ ] Responzívny layout funguje
- [ ] Text čitateľný na mobile
- [ ] Tlačidlá prístupné na mobile
- [ ] Navigácia funguje na mobile
- [ ] Obrázky sa správne škálujú

### OG Preview
- [ ] OG obrázok sa načíta (1200x630)
- [ ] Názov sa zobrazuje správne
- [ ] Popis sa zobrazuje správne
- [ ] URL sa zobrazuje správne
- [ ] Brand farby viditeľné
- [ ] Text čitateľný

### SEO
- [ ] Title tag prítomný (150-160 znakov)
- [ ] Meta description prítomná (150-160 znakov)
- [ ] Canonical URL správna
- [ ] OpenGraph tagy prítomné
- [ ] Twitter/X tagy prítomné
- [ ] JSON-LD štruktúrované údaje platné
- [ ] Sitemap obsahuje URL
- [ ] Robots.txt odkazuje na sitemap
- [ ] Hreflang alternatívy správne

### Funkčnosť
- [ ] CTA tlačidlo odkazuje na `/prelaunch`
- [ ] Navigačné odkazy fungujú
- [ ] Footer odkazy fungujú
- [ ] Brand CSS sa načíta správne
- [ ] Prepínač jazykov funguje
- [ ] Žiadne chyby v konzole

---

## Overovacie Príkazy

### Lokálne Overenie
```bash
# Skontrolovať, či sa stránka načíta
curl -I http://localhost:3000/showcase/mikork
curl -I http://localhost:3000/showcase/mikork/en

# Skontrolovať, či sa OG obrázok načíta
curl -I http://localhost:3000/assets/og/mikork-og.svg

# Overiť, či je brand.css referencovaný
curl http://localhost:3000/showcase/mikork | grep "brand.css"
```

### Produkčné Overenie
```bash
# Skontrolovať, či sa stránka načíta (200 OK)
curl -I https://www.golocapo.com/showcase/mikork
curl -I https://www.golocapo.com/showcase/mikork/en

# Skontrolovať, či sa OG obrázok načíta (200 OK, image/svg+xml)
curl -I https://www.golocapo.com/assets/og/mikork-og.svg

# Overiť, či je brand.css referencovaný
curl https://www.golocapo.com/showcase/mikork | grep "brand.css"

# Skontrolovať, či sitemap obsahuje URL
curl https://www.golocapo.com/sitemap.xml | grep "showcase/mikork"
```

### OG Preview Nástroje
- https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/mikork
- https://developers.facebook.com/tools/debug/?q=https://www.golocapo.com/showcase/mikork
- https://cards-dev.twitter.com/validator

---

## Poznámky

- **Tón:** Pokojný, dôveryhodný, dôstojný (žiadna agresívna marketingová komunikácia)
- **Dizajn:** Používa konsolidovaný `brand.css` (žiadne inline štýly okrem minimálnych opráv)
- **Znovupoužiteľnosť:** Šablóna môže byť sklonovaná pre ďalšieho klienta
- **SEO Fokus:** Optimalizované pre sociálny traffic (OG tagy kritické)
- **Dlhodobá Spolupráca:** Mesačný plán starostlivosti dostupný pre MikoRK

---

**Status:** ✅ Produkčne Pripravené
