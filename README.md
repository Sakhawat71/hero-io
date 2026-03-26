# 🦸‍♂️ HERO.IO — We Build Productive Apps

A modern React app store showcase built with Vite + React Router + Recharts.

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework |
| **Vite** | Lightning-fast build tool |
| **React Router v6** | Client-side routing |
| **Recharts** | Ratings bar chart |
| **react-hot-toast** | Install/uninstall toasts |
| **CSS Modules** | Scoped component styles |

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

> **Deployment note:** When deploying to Netlify/Vercel/Cloudflare, configure your host to redirect all routes to `index.html` so React Router handles navigation. See `netlify.toml` / `vercel.json` included in this project.

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx / .module.css
│   ├── Footer.jsx / .module.css
│   ├── AppCard.jsx / .module.css
│   ├── Layout.jsx / .module.css
│   └── UI.jsx / UI.module.css       ← Shared UI helpers
├── data/
│   ├── apps.js                      ← 16 app objects
│   └── storage.js                   ← localStorage utils
├── pages/
│   ├── Home.jsx / .module.css
│   ├── Apps.jsx / .module.css
│   ├── AppDetails.jsx / .module.css
│   ├── Installation.jsx / .module.css
│   └── NotFound.jsx / .module.css
├── App.jsx                          ← Router setup
├── main.jsx                         ← Entry point
└── index.css                        ← Global styles + CSS vars
```

## ✅ Features Implemented

### Basic Requirements
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Meaningful app name & description
- ✅ Error-free production build

### Main Requirements
- ✅ **Header** — Logo, nav with active route, GitHub Contribute button
- ✅ **Footer** — Custom footer with quick links and social icons
- ✅ **16 App data objects** with full structure
- ✅ **Home Page** — Hero banner, App Store/Play Store buttons, Stats section, 8 trending apps, Show All button
- ✅ **All Apps Page** — Search (live, case-insensitive), "No App Found" message, app count
- ✅ **App Details** — Image, stats, Install button (→ Installed when clicked), Recharts bar chart, description
- ✅ **Error Pages** — Custom 404 page + App Not Found page

### Challenge Requirements
- ✅ **localStorage** — Install persists across sessions; button shows "Installed" if already saved
- ✅ **My Installation Page** — All installed apps with Uninstall button + toast
- ✅ **Sort by Downloads** — High→Low, Low→High dropdown
- ✅ **Loading Animation** — Skeleton cards on search, spinner on details page load
- ✅ **Deployment ready** — `netlify.toml` + `vercel.json` included

## 🌐 Deployment

### live link : [https://hero-io-eta.vercel.app/](https://hero-io-eta.vercel.app/)
