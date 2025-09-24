# Contributing to SoftSync

This guide explains how to set up the **SoftSync** project locally for development.

---

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v20+ recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [Git](https://git-scm.com/)  

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/softsync.git
cd softsync
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Transpile Electron process files**
```bash
npm run transpile:electron
```

## Running in Development

**Start both React frontend and Electron backend:**
```bash
npm run dev
```

**Or individually:**
- Frontend only:
```bash
npm run dev:react
```
- Electron only:
```bash
npm run dev:electron
```

## Building the Project

1. **Build React + Electron**
```bash
npm run build
```

2. **Package the app**
- Windows (x64):
```bash
npm run dist:win
```

- macOS (arm64):
```bash
npm run dist:mac
```

- Linux (x64):
```bash
npm run dist:linux
```

### The packaged app will be available in the dist/ folder.