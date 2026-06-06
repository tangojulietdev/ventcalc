# Changelog

## [1.0.0] — 2026-06-06

### Initial Release

**Calculator**
- Dry & wet bulb entry for 10 cargo holds
- Magnus/Sprung dew point & RH formula
- Instant Ventilate / No Vent / Caution decision per hold
- DP Delta display with colour coding
- Condensation Risk Indicator (Low / Moderate / High / Critical)
- Weather conditions block (Beaufort, visibility, precipitation, suspension reason)

**Voyage Log**
- Named voyage creation, switching, deletion
- Timestamped log entries with full hold snapshot
- DP Delta Trend Chart per hold
- Per-hold risk analysis sub-page

**Exports**
- PDF — landscape A4, solid colour-coded badges, outside air panel, auto page breaks
- Excel (.xlsx) — Summary sheet + Hold Detail sheet, colour-coded decisions
- Plain Text — fixed-width columns for email / GMDSS

**Reference**
- Offline Psychrometric Dew Point Table
- Cargo Quick Reference (8 cargo types)
- Ventilation Guide with procedures
- Knowledge Base with 4 P&I case studies and 6 references
- 15-question Crew Training Quiz with explanations

**App**
- Dark / Light theme toggle
- Swipe navigation (mobile)
- PWA — installable on Android and iOS
- Full offline support via standalone Service Worker (sw.js)
- localStorage persistence — no server, no account required
- Horizontal scroll lock (table scroll does not trigger swipe nav)
