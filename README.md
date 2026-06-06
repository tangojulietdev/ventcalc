# VentCalc — Marine Cargo Ventilation Guide

> Professional dew point calculator, voyage log, and ventilation decision tool for maritime Chief Officers.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-blue.svg)](sw.js)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](CHANGELOG.md)

---

## What is VentCalc?

VentCalc is a fully offline Progressive Web App built for Chief Officers managing cargo hold ventilation at sea. It implements the **Dew Point Rule** — the internationally recognised standard for ventilation decisions — and provides a complete, exportable voyage documentation system.

**No server. No database. No internet required after first load.**

All data is stored locally on the device. The app works fully offline via a standalone Service Worker.

---

## The Dew Point Rule

```
Ventilate ONLY when:
  Outside Dew Point ≤ Hold Dew Point

DP Delta = Hold DP − Outside DP
  Positive (+) → VENTILATE   — outside air drier than hold
  Negative (−) → NO VENT     — outside air more humid than hold
  Near zero   →  MONITOR     — no benefit, re-measure in 30 min
```

---

## Features

| Feature | Detail |
|---|---|
| **Calculator** | 10 holds, Magnus/Sprung DP formula, instant decision |
| **Voyage Log** | Named voyages, timestamped entries, weather fields |
| **Risk Indicator** | Per-hold LOW / MOD / HIGH / CRITICAL with advice |
| **Trend Chart** | DP delta over time, hold selector, last N entries |
| **PDF Export** | Landscape A4, solid colour badges, outside air panel |
| **Excel Export** | Summary + Hold Detail sheets, colour-coded decisions |
| **Text Export** | Fixed-width, email / GMDSS compatible |
| **DP Table** | Full offline psychrometric lookup (dry bulb vs depression) |
| **Cargo Ref** | 8 cargo types with ventilation rules and claim risks |
| **Guide** | Surface, forced, dehumidifier procedures + log requirements |
| **Knowledge Base** | 4 P&I case studies, 6 authoritative references |
| **Quiz** | 15 questions with explanations, scored |
| **Dark / Light** | Theme toggle, persists across sessions |
| **Offline** | Full offline support via Service Worker |
| **PWA** | Installable on Android (Play Store via PWABuilder) and iOS |

---

## Project Structure

```
ventcalc/
├── index.html              ← Complete single-file app
├── sw.js                   ← Standalone Service Worker (offline support)
├── manifest.json           ← PWA manifest
├── icons/
│   ├── icon-72.png         ← Android legacy
│   ├── icon-96.png
│   ├── icon-128.png        ← Chrome Web Store
│   ├── icon-144.png        ← Windows tile / Android
│   ├── icon-152.png        ← iPad
│   ├── icon-180.png        ← iPhone
│   ├── icon-192.png        ← Android home screen ★
│   ├── icon-384.png
│   ├── icon-512.png        ← Play Store ★
│   ├── maskable-512.png    ← Android adaptive icon ★
│   └── apple-touch-icon.png← iOS home screen ★
├── README.md
├── CHANGELOG.md
└── LICENSE                 ← MIT
```

---

## Deploying on GitHub Pages

1. Create a new repo on GitHub (e.g. `ventcalc`)
2. Upload all files — or push via git:

```bash
git init
git add .
git commit -m "Initial release v1.0.0"
git remote add origin https://github.com/YOUR_USERNAME/ventcalc.git
git push -u origin main
```

3. Go to **Settings → Pages → Branch: main → / (root) → Save**
4. Live in ~60 seconds at `https://YOUR_USERNAME.github.io/ventcalc`

> The Service Worker will only work when served over HTTPS. GitHub Pages provides this automatically.

---

## Installing as a PWA

**Android (Chrome):**
1. Open the hosted URL in Chrome
2. Tap the three-dot menu → **Add to Home Screen**
3. Or wait for the install banner — tap **Install**

**iOS (Safari):**
1. Open the hosted URL in Safari
2. Tap the Share icon → **Add to Home Screen**

**Desktop (Chrome/Edge):**
1. Open the hosted URL
2. Click the install icon in the address bar

---

## Publishing to Google Play Store

1. Host on GitHub Pages (above)
2. Go to [PWABuilder.com](https://pwabuilder.com)
3. Enter your GitHub Pages URL → **Start**
4. Click **Android → Store Package**
5. Download the APK / AAB
6. Submit to Google Play ($25 one-time developer fee)

---

## Technical Notes

**Dew Point Formula (Magnus/Sprung):**
```
es_wet = 6.112 × exp(17.67 × T_wet / (243.5 + T_wet))
e      = es_wet − 0.799 × (T_dry − T_wet)
RH     = e / es_dry × 100
DP     = 243.5 × ln(e/6.112) / (17.67 − ln(e/6.112))
```

**Service Worker Strategy:**
- App assets (index.html, icons, manifest): **Cache-first**, background refresh
- CDN resources (jsPDF, SheetJS, fonts): **Network-first**, CDN cache fallback
- Cache versioned as `ventcalc-v1.0.0` — old caches auto-deleted on activate

**Dependencies (CDN, loaded on-demand):**
- [jsPDF 2.5.1](https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js) — PDF export
- [SheetJS 0.18.5](https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js) — Excel export
- [Inter font](https://fonts.googleapis.com/css2?family=Inter) — Typography

All dependencies are cached by the Service Worker after first use.

**Browser Support:**
| Browser | Support |
|---|---|
| Chrome 80+ | Full |
| Edge 80+ | Full |
| Safari 14+ | Full |
| Firefox 78+ | Full |
| Chrome Android | Full |
| Safari iOS 14+ | Full (no PWA install prompt — use Share → Add to Home Screen) |

---

## P&I References

- INTERCARGO / Standard Club / DNV — *Cargo & Cargo Hold Ventilation Guide* (2020)
- Gard P&I — *"Don't Work Up a Sweat"*
- Britannia P&I — *Cargo Ventilation Logs* (2023)
- Britannia P&I — *Essential Guide to Cargo Ventilation* (2025)
- West of England P&I — *Ventilation & Precautions to Minimise Sweat*
- Skuld P&I — *Carriage of Steel Cargoes*

---

## Disclaimer

VentCalc is a decision-support tool for maritime professionals. Always apply professional judgement and follow your vessel's SMS procedures. Not a substitute for onboard regulations, Flag State requirements, P&I club guidance, or qualified marine surveyor advice.

---

## Developer

Built by **Tango Juliet** — maritime professional.

---

## License

MIT — free to use, modify and distribute. See [LICENSE](LICENSE).
