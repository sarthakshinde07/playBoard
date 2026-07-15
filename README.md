# SharedCanva

A collaborative canvas application for creating, editing, and sharing visual content in real time.

> **Status:** Active development  

## ✨ Features

- 🖌️ Interactive shared drawing/editing canvas
- 👥 Multi-user collaboration
- 🔄 Real-time synchronization
- 💾 Persistent project/canvas state (if backend/database is configured)
- 📤 Shareable workspace links (if enabled)

> Update this section with exact implemented features once finalized.

---

## 🧱 Tech Stack

<!-- Replace with actual stack used in this repository -->
- **Frontend:** React / Next.js (TBD)
- **Backend:** Node.js / Express / WebSocket (TBD)
- **Realtime:** Socket.IO / WebSocket provider (TBD)
- **Database:** MongoDB / PostgreSQL / Firebase (TBD)
- **Deployment:** Vercel / Render / Docker / Self-hosted (TBD)

---

## 📁 Project Structure

```text
SharedCanva/
├── client/                 # Frontend application (if separated)
├── server/                 # Backend/realtime services (if separated)
├── public/                 # Static assets
├── src/                    # Source code
├── .env.example            # Environment variable template
├── package.json
└── README.md
```

> Adjust this tree to match your actual folders.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm / yarn / pnpm
- (Optional) Database service if your app requires one

### 1) Clone the repository

```bash
git clone https://github.com/sarthakshinde07/playBoard.git
cd playBoard
```

### 2) Install dependencies

```bash
npm install
```

> If this is a monorepo with separate apps, install dependencies in each package directory.

### 3) Configure environment variables

Create a `.env` file in the project root (or in each app folder) using values from `.env.example`:

```bash
cp .env.example .env
```

Example variables (customize as needed):

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=replace_with_secure_random_value
```

### 4) Run in development

```bash
npm run dev
```

### 5) Build for production

```bash
npm run build
npm start
```

---

## 📜 Available Scripts

Common scripts (verify and edit according to `package.json`):

- `npm run dev` – Start development server
- `npm run build` – Build production assets
- `npm start` – Run production server
- `npm test` – Run tests
- `npm run lint` – Lint the codebase

---

## 🤝 Collaboration Model

SharedCanva is designed for multi-user sessions. Typical flow:

1. User creates or opens a canvas.
2. Session/canvas ID is shared with collaborators.
3. Connected clients receive updates in real time.
4. Changes are persisted according to backend logic.

---

## 🔐 Environment & Security Notes

- Never commit `.env` files or secrets.
- Use strong secrets for auth/session keys.
- Add rate limiting and input validation on backend endpoints.
- Restrict CORS origins in production.

---

## 🧪 Testing

Run test suite:

```bash
npm test
```

For coverage (if configured):

```bash
npm run test:coverage
```

---

## 🚢 Deployment

You can deploy using:

- **Vercel** (frontend-focused)
- **Render/Railway** (full-stack apps)
- **Docker** (containerized deployment)
- **Self-hosted VPS**

General deployment checklist:

- Set production environment variables
- Configure database and migrations
- Enable HTTPS
- Scale realtime service appropriately
- Add monitoring/logging

---

## 🛣️ Roadmap

- [ ] Improve canvas performance for large boards
- [ ] Add role-based access (owner/editor/viewer)
- [ ] Add export/import (PNG, JSON, PDF)
- [ ] Add cursor presence + user avatars
- [ ] Add version history and undo timeline

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`feat/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 📄 License

Add your preferred license here (e.g., MIT):

```text
MIT License
```

---
