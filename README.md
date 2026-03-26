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

## 🌐 Deployment

### live link : [https://hero-io-eta.vercel.app/](https://hero-io-eta.vercel.app/)
