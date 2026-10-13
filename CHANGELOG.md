# Changelog

## [3.0.0] — 2026-08-23

### Visual redesign — matched to OceanDox / BWRB house style

**Design system**
- Replaced the dark brass-instrument theme with a clean light SaaS look: white cards on `#f4f6f8` background, teal `#0f9488` primary accent, teal hairline under the header
- Dark mode reworked to muted navy (not pitch black), matching OceanDox's own dark toggle
- Removed Fraunces serif display font — Inter used throughout, JetBrains Mono reserved for numeric readouts only
- Status pills restyled to rounded chip badges (VERIFIED/PENDING style)
- New teal droplet app icon replacing the brass gauge-dial icon
- Hold gauge dials restyled to the teal palette (element retained, recoloured)

**PDF export — rebuilt to match BWRB report format**
- Switched from landscape to **portrait A4**, matching BWRB reports
- Teal masthead band with circular logo mark, replacing the previous brass/navy header
- Bordered grid tables with full vertical and horizontal rule lines between every cell
- Status badge positioned top-right of each voyage-log entry header band
- Colour-coded decision badges (green/red/amber) as rounded rectangles within the grid
- Sub-header info bar (C/O, position, outside conditions) styled as a light teal-tinted strip

**Functional carryover (unchanged from v2.0.0)**
- Magnus/Sprung dew point calculator, 10 holds
- Multi-voyage log with weather conditions
- Condensation Risk Indicator, DP Delta Trend Chart
- Excel / Text export logic unchanged (colours updated to match new palette)
- Offline Dew Point Table, Cargo Reference, Ventilation Guide, Knowledge Base
- 15-question Crew Training Quiz
- Service Worker offline support (cache bumped to v3.0.0), localStorage persistence
- Horizontal scroll lock so tables don't trigger tab swipe

## [2.0.0] — 2026-06-26
Instrument-panel redesign (brass/verdigris/signal palette). Superseded by v3.0.0.

## [1.0.0] — 2026-06-06
Initial release.
