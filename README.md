# Field Guide
### for Urban Forest Schooling

A forest school companion app for caregivers and babies in the city. Turn any Brooklyn moment — a tree pit, a stoop, a puddle — into a sensory development experience grounded in forest school principles.

Built as a use-case prototype for [Playlab](https://playlab.ai), the open-source AI platform for educators.

---

## What it does

Field Guide is a 3-step mobile-first app:

1. **Where are you?** — Choose your urban environment (park, sidewalk, community garden, playground, stoop, near water)
2. **What is your baby doing?** — Select what your 9-month-old is noticing right now (gazing, grabbing, mouthing, crawling, watching, overwhelmed)
3. **Your forest school moment** — An AI-generated card with four sections:
   - 🌿 **Follow their lead** — one action to take right now
   - 🍂 **Let it happen** — one thing to resist doing, and why
   - 🌱 **What's developing** — the sensory or motor capacity being built
   - ✨ **A wonder to sit with** — a poetic question for the caregiver to hold

---

## Forest school principles behind the app

- **Child-led exploration** — the app always starts with what the baby is already doing
- **Sensory and risky play** — guidance encourages touching, tasting, and direct contact with the environment
- **Unstructured time** — the "let it happen" section actively coaches caregivers to step back
- **Place-based learning** — every response is specific to the urban Brooklyn context

---

## Deploy your own

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Vercel account](https://vercel.com) (free)
- [Anthropic API key](https://console.anthropic.com)

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/field-guide.git
cd field-guide

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Add your API key

In the Vercel dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
3. Redeploy

Your API key stays on the server — it is never exposed to the browser.

---

## Project structure

```
field-guide/
├── index.html        # Full frontend — 3-screen app
├── api/
│   └── generate.js   # Vercel serverless function — proxies Anthropic API
└── README.md
```

---

## Local development

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally (reads .env.local for your API key)
vercel dev
```

Create a `.env.local` file:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## About

Built by [Jenn Liu](https://github.com/YOUR_USERNAME) as a Playlab use-case prototype.

Inspired by forest school pedagogy, urban nature education, and the belief that a crack in the pavement with a weed growing through it is enough.

---

*Brooklyn, NY · 2025*
