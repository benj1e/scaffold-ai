# Scafold AI

> Prompt your stack. Skip the setup. Start building.

Scafold AI is a smart project scaffolding tool that lets you generate full-stack app structures with natural language prompts. Whether you’re building with Next.js, Django, FastAPI, or anything in between, Scafold handles the boilerplate so you can jump straight into coding.

---

## 🚀 What It Does

- **Prompt-to-Project**: Describe what you want — Scafold turns it into a real project structure.
- **AI File Generator**: From auth to DB connections, Scafold knows what to write and where to put it.
- **Visual File Tree**: See your project before you accept it.
- **Docker Ready**: Containerize without lifting a finger.
- **Framework Agnostic**: FastAPI, Next.js, Flask, Django, Express — more coming soon.
- **Instant Deployment**: Push to GitHub, deploy to Vercel or Railway, open in Codespaces — all in one click.
- **CLI + Web UI**: Use it from your terminal or browser. Your choice.

---

## 🧱 How It Works

1. **Prompt it**  
   → e.g. “A task manager with login, PostgreSQL DB, and a REST API”

2. **Preview it**  
   → View a clean file structure and optional code snippets

3. **Generate it**  
   → Accept and download, deploy, or open in your cloud IDE

4. **Iterate freely**  
   → Add auth, update DB, scaffold new routes — all through prompt updates

---

## 📦 Features Coming Soon

- AI-powered code reviews
- Test setup & CI workflows
- Integration marketplace (Stripe, Supabase, etc.)
- Version-controlled prompt history

---

## 🧑‍💻 Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind
- **Backend**: FastAPI + Python
- **AI Layer**: OpenAI / Claude (model-flexible)
- **Deployment**: Vercel + Railway
- **Optional**: Docker, GitHub OAuth, Notion API

---

## 🛣 Project Status

This is an active **Build in Public** project.  
Follow our progress on [Twitter/X](https://twitter.com/).

If you're reading this, we’re probably deep in the next feature. Contributions, ideas, and pull requests are welcome.

---

## 📂 Local Setup

```bash
# Clone the repo
git clone https://github.com/yourname/scafold-ai.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
