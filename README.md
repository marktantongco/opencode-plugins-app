# OpenCode Plugins Editorial Web App

<p align="center">
  <img src="https://img.shields.io/badge/Tech-HTML%20%2B%20Tailwind%20%2B%20GSAP-blue?style=for-the-badge" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Status-Active-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/OpenCode-2026-orange?style=for-the-badge" alt="OpenCode 2026">
</p>

An interactive editorial-style web application showcasing the **Top 10 OpenCode Plugins** with beautiful GSAP animations and a modern dark theme. Built with accessibility and performance in mind.

![OpenCode Plugins App Screenshot](https://via.placeholder.com/800x400/0f172a/38bdf8?text=OpenCode+Plugins+Editorial+Layout)

---

## ✨ Features

- **Editorial Layout** — Magazine-style design with typography focus
- **GSAP Animations** — Smooth scroll-triggered animations, staggered reveals, parallax effects
- **Interactive Cards** — Click to expand plugin details with features and install commands
- **Category Filtering** — Filter plugins by category (Token Optimization, Multi-Agent, Reliability, etc.)
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Accessibility** — WCAG 2.1 AA compliant with reduced-motion support
- **Dark Theme** — Professional developer-focused aesthetic

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opencode-plugins-app.git
cd opencode-plugins-app

# Install dependencies
npm install

# Start the server
npm start
```

The app will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
opencode-plugins-app/
├── server.js              # Express backend server
├── package.json           # Dependencies
├── data/
│   └── plugins.json      # Plugin data (10 plugins + ecosystem)
├── public/
│   ├── index.html        # Main HTML with editorial layout
│   ├── css/              # (reserved for custom CSS)
│   └── js/
│       ├── gsap-animations.js  # GSAP animation logic
│       └── app.js              # App logic & data rendering
├── PLUGINS.md            # Markdown reference guide
└── README.md             # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, Tailwind CSS 3.x |
| **Animations** | GSAP 3 (ScrollTrigger, TextPlugin, ScrollToPlugin) |
| **Backend** | Node.js, Express 4.x |
| **Data** | JSON (plugins.json) |
| **Fonts** | Inter (UI), JetBrains Mono (code) |

---

## 🎨 Design System

This project follows the **UI/UX Pro Max** design guidelines:

### Color Palette (Dark Theme)
- Background: `#030712` (dark-950)
- Surface: `#0f172a` (dark-900)
- Surface Elevated: `#1e293b` (dark-800)
- Text Primary: `#f8fafc`
- Text Muted: `#94a3b8`
- Accent: `#38bdf8` (primary-400)
- Accent Secondary: `#8b5cf6` (purple-500)

### Typography
- **Headings:** Inter, 600-800 weight
- **Body:** Inter, 400-500 weight
- **Code:** JetBrains Mono, 400-500 weight
- **Base size:** 16px, line-height 1.5

### Accessibility
- ✅ Color contrast ≥ 4.5:1
- ✅ Focus states visible
- ✅ Keyboard navigation
- ✅ `prefers-reduced-motion` respected
- ✅ Semantic HTML structure

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/plugins` | Returns all plugin data including meta |
| `GET /api/plugins/top` | Returns top 10 plugins |
| `GET /api/plugins/meta` | Returns meta information |
| `GET /` | Serves the frontend |

---

## 🎬 GSAP Animations

### Implemented Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero Title | Split reveal + scale | Page load |
| Hero Subtitle | Fade + slide up | After title |
| Stats Counter | Count-up animation | ScrollTrigger |
| Plugin Cards | Stagger scale + fade | ScrollTrigger |
| Card Hover | Scale + shadow | Hover |
| Section Headers | Clip-path reveal | ScrollTrigger |
| Navbar | Background blur on scroll | ScrollTrigger |
| Ecosystem Cards | Stagger fade | ScrollTrigger |

### Animation Configuration

```javascript
// ScrollTrigger defaults
scrollTrigger: {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse'
}

// Easing
ease: 'power2.out' (default)
ease: 'back.out(1.2)' (cards)
```

---

## 🔧 Configuration

### Add Plugins to OpenCode

Edit your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "opencode-dynamic-context-pruning",
    "opencode-morph-plugin",
    "opencode-model-fallback",
    "claude-code-safety-net",
    "opencode-notify"
  ]
}
```

---

## 📄 Files

| File | Description |
|------|-------------|
| `PLUGINS.md` | Comprehensive markdown reference guide with all plugin details |
| `README.md` | This comprehensive documentation |

---

## 🌐 Ecosystem Links

- [Official OpenCode Docs](https://opencode.ai/docs/)
- [Plugin Ecosystem](https://opencode.ai/docs/ecosystem/)
- [Community Registry](https://opencode.im/plugins)
- [Awesome OpenCode](https://awesomeopencode.com/)
- [OpenCode Cafe](https://opencode.cafe/)

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Check for syntax errors
node -c server.js
```

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Credits

- [OpenCode](https://opencode.ai) — The amazing AI coding agent
- [GSAP](https://greensock.com/gsap/) — Animation platform
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [UI/UX Pro Max](https://skills.sh/oldwinter/skills/ui-ux-pro-max) — Design intelligence

---

<p align="center">
  Made with ❤️ for the OpenCode community
</p>
