# NotesVault - React Edition

A modern, visually stunning note-taking application built with React, featuring the "Aurora" design theme with warm amber, cool teal, and violet accents.

## Features

- 📝 Create, edit, and delete notes
- 🎨 Beautiful glass-morphism UI with gradient accents
- 🔄 Real-time synchronization with Firebase
- 📱 Fully responsive design
- ⚡ Fast and smooth animations
- 🌙 Dark theme optimized for readability

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Firebase Firestore** - Real-time database
- **Custom CSS** - Advanced animations and effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Notes-Vault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
Notes-Vault/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Top navigation bar
│   │   ├── NoteForm.jsx        # Note creation/editing form
│   │   ├── NoteCard.jsx        # Individual note card
│   │   ├── NotesList.jsx       # Notes grid view
│   │   └── NoteModal.jsx       # Full note viewer modal
│   ├── config/
│   │   └── firebase.js         # Firebase configuration
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies

```

## Firebase Setup

The app uses Firebase Firestore for data storage. The Firebase configuration is included, but for production use, you should:

1. Create your own Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Update the config in `src/config/firebase.js`

## Design Features

- **Glass-morphism effects** with backdrop blur
- **Staggered card animations** for smooth loading
- **Gradient text effects** with animated hue rotation
- **Custom button states** (loading, success, error)
- **macOS-style modal** window with colored dots
- **Ambient background orbs** for visual depth

## License

ISC

## Credits

NotesVault Cosmic Edition © 2026
