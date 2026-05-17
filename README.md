# Ahmed Yehia — Portfolio

Dark & Futuristic MERN Stack Developer Portfolio built with React + Vite.

## 🚀 Run Locally

```bash
npm install
npm run dev
```

## 🌐 Deploy for FREE on Vercel (Recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → select your repo
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy** — done! You'll get a live URL instantly.

## 🌐 Deploy for FREE on GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Add to `vite.config.js`:
```js
base: '/your-repo-name/'
```

Then run:
```bash
npm run deploy
```

## 📁 Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    └── App.jsx       ← All portfolio content lives here
```

## ✏️ Customization

All content is in `src/App.jsx` at the top of the file:
- `SKILLS` — your tech stack
- `PROJECTS` — your key projects
- `EXPERIENCE` — your work history
- `ACHIEVEMENTS` — your highlights
