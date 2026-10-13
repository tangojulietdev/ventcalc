# VentCalc — Marine Cargo Ventilation Log

> Dew point calculations, voyage logs, and ventilation decision support for Chief Officers. Styled to match the OceanDox / BWRB reporting suite. Works fully offline.

[![License: MIT](https://img.shields.io/badge/License-MIT-0f9488.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-1a9d5c.svg)](sw.js)
[![Version](https://img.shields.io/badge/Version-3.0.0-0f9488.svg)](CHANGELOG.md)

---

## Design

VentCalc v3 matches the visual language of the OceanDox Ballast Water Record Book suite — clean white cards on a light gray-blue background, a teal primary accent, pill-shaped status badges, and a teal hairline under the header bar. Dark mode uses a muted navy rather than pure black, consistent with OceanDox's own dark toggle.

- **Teal** `#0f9488` — primary accent, buttons, active states
- **Verdigris green** — ventilate / verified states
- **Signal red** — no-vent / danger states
- **Amber** — caution / pending states
- **Inter** throughout — clean sans-serif, no display serif
- **JetBrains Mono** — reserved for numeric readouts (dew point, RH, delta)

The **hold gauge** — a circular instrument dial showing each hold's DP Delta as a coloured arc — remains the distinctive interaction element, restyled to the teal palette.

---

## The Dew Point Rule

```
Ventilate ONLY when:
  Outside Dew Point ≤ Hold Dew Point

DP Delta = Hold DP − Outside DP
  Positive (+) → VENTILATE
  Negative (−) → NO VENT
  Near zero   → MONITOR
```

---

## Features

| Feature | Detail |
|---|---|
| **Hold gauges** | Each hold as a live dial showing DP delta |
| **Calculator** | 10 holds, Magnus/Sprung formula, instant decision |
| **Voyage Log** | Named voyages, timestamped entries, weather fields |
| **Risk Indicator** | Per-hold LOW / MODERATE / HIGH / CRITICAL with advice |
| **Trend Chart** | DP delta over time, hold selector |
| **PDF Export** | Portrait A4, BWRB-style teal masthead, bordered grid tables, status badges |
| **Excel Export** | Summary + Hold Detail sheets, colour-coded decisions |
| **Text Export** | Fixed-width, email / GMDSS compatible |
| **DP Table** | Offline psychrometric lookup |
| **Cargo Reference** | 8 cargo types with rules and claim risks |
| **Guide** | Procedures and log requirements |
| **Knowledge Base** | P&I case studies and references |
| **Quiz** | 15 questions, scored, with explanations |
| **Light / Dark** | Two themes — clean day mode and muted navy dark mode |
| **Offline** | Full offline support via Service Worker |
| **PWA** | Installable on Android and iOS |

---

## Project Structure

```
ventcalc/
├── index.html              ← Complete single-file app
├── sw.js                    ← Service Worker (offline support)
├── manifest.json            ← PWA manifest
├── icons/
│   ├── icon-72.png  …  icon-512.png   (teal droplet icon, 9 sizes)
│   ├── maskable-512.png    ← Android adaptive icon
│   └── apple-touch-icon.png← iOS home screen
├── README.md
├── CHANGELOG.md
└── LICENSE                  ← MIT
```

---

## Deploying on GitHub Pages

```bash
git init
git add .
git commit -m "VentCalc v3.0.0 — BWRB-style redesign"
git remote add origin https://github.com/YOUR_USERNAME/ventcalc.git
git push -u origin main
```

Then **Settings → Pages → Branch: main → / (root) → Save**. Live at `https://YOUR_USERNAME.github.io/ventcalc` within a minute.

---

## Installing as a PWA

**Android (Chrome):** Open the URL → menu → Add to Home Screen.
**iOS (Safari):** Open the URL → Share → Add to Home Screen.
**Desktop (Chrome/Edge):** Click the install icon in the address bar.

---

## Technical Notes

**Dew point (Magnus/Sprung):**
```
es_wet = 6.112 × exp(17.67 × T_wet / (243.5 + T_wet))
e      = es_wet − 0.799 × (T_dry − T_wet)
DP     = 243.5 × ln(e/6.112) / (17.67 − ln(e/6.112))
```

**PDF layout:** Portrait A4 (210×297mm), teal masthead band, bordered grid tables with vertical rule lines between columns, rounded status badges colour-coded green/red/amber, status indicator top-right of each voyage-log entry header — matching the BWRB report format.

**Dependencies (CDN, loaded on demand):** jsPDF 2.5.1, SheetJS 0.18.5, Google Fonts (Inter, JetBrains Mono). All cached by the Service Worker after first use.

**Browser support:** Chrome 80+, Edge 80+, Safari 14+, Firefox 78+, Chrome Android, Safari iOS 14+.

---

## P&I References

INTERCARGO / Standard Club / DNV — Cargo & Cargo Hold Ventilation Guide (2020) · Gard P&I — Don't Work Up a Sweat · Britannia P&I — Cargo Ventilation Logs (2023, 2025) · West of England P&I — Ventilation & Precautions to Minimise Sweat · Skuld P&I — Carriage of Steel Cargoes

---

## Disclaimer

VentCalc is a decision-support tool. Always apply professional maritime judgement and follow your vessel's SMS procedures. Not a substitute for onboard regulations or P&I club guidance.

---

## Developer

Built by **Tango Juliet**.

## License

MIT — see [LICENSE](LICENSE).
