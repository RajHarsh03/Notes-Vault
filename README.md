# NotesVault 🔐

> Your personal vault for code snippets & notes — fast, beautiful, real-time.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **Create & Edit** | Write notes with title, content, tags, and accent color |
| 🏷️ **Tags** | Add tags to organize notes, filter by tag in library |
| 🎨 **Color Accents** | 6 accent colors per note — amber, violet, teal, rose, blue, green |
| 📊 **Live Stats** | Real-time character and line count while typing |
| 🔍 **Search** | Instant search across title, content, and tags |
| 👁️ **Note Viewer** | macOS-style modal to view full note content |
| 📋 **Copy** | One-click copy note content to clipboard |
| 🔔 **Toasts** | Success, error, and info notifications |
| ⌨️ **Shortcuts** | `Ctrl + Enter` to save note |
| 🔄 **Real-time Sync** | Firebase Firestore — changes sync instantly |
| 📱 **Responsive** | Works on mobile, tablet, and desktop |

---

## 🖥️ Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool with HMR
- **Tailwind CSS v4** — Utility-first styling
- **Firebase Firestore** — Real-time NoSQL database
- **JetBrains Mono + Outfit** — Typography

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd Notes-Vault

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Scripts

```bash
npm run dev      # Development server with HMR
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

## 📁 Project Structure

```
Notes-Vault/
├── src/
│   ├── components/
│   │   ├── NoteForm.jsx      # Create / edit note form
│   │   ├── NotesList.jsx     # Library grid with search & filters
│   │   ├── NoteCard.jsx      # Individual note card
│   │   ├── NoteModal.jsx     # Full note viewer (macOS modal)
│   │   └── Toast.jsx         # Notification toasts
│   ├── hooks/
│   │   └── useToast.js       # Toast state management hook
│   ├── config/
│   │   └── firebase.js       # Firebase initialization
│   ├── App.jsx               # Root layout & state
│   ├── main.jsx              # React entry point
│   └── index.css             # Aurora theme & animations
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🔥 Firebase Setup

The app uses Firestore to store notes. To use your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project
2. Enable **Firestore Database** in test mode
3. Replace the config in `src/config/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

> ⚠️ For production, move this config to environment variables (`.env` file).

---

## 🎨 Design

**Aurora Theme** — dark navy base with warm amber, cool teal, and violet accents.

- Glass-morphism panels with `backdrop-filter: blur`
- Ambient background orbs for depth
- Staggered card entrance animations
- Sliding nav underline indicator
- Animated gradient logo text
- macOS-style note viewer modal
- Custom scrollbars

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Save note |
| `Escape` | Close note modal |

---

## 📄 License

ISC — NotesVault Cosmic Edition © 2026
