# Code2Cloud AI Website Builder

AI-driven website builder that generates, edits, deploys, and manages websites from natural language prompts. Built for production with authentication, billing, credits, and a modern UI.

## Tech Stack
- Frontend: React, Vite, TailwindCSS, Redux, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Stripe
- AI: OpenRouter
- Email Support: Nodemailer + SMTP

## Features
- AI prompt to website generation (HTML/CSS/JS)
- Real-time editing via prompt updates
- Instant deployment with live URLs
- Full source code download
- JWT authentication with secure cookies
- Stripe billing and credit top-ups
- Credit usage tracking (generate, update, deploy)
- Transaction history for credits
- Support form with email + screenshot upload
- Floating AI chatbot for quick guidance

## Screenshots
Add images in `docs/screenshots/` and update the paths below.

- Home: `docs/screenshots/home.png`
- Pricing: `docs/screenshots/pricing.png`
- Dashboard: `docs/screenshots/dashboard.png`
- Editor: `docs/screenshots/editor.png`
- Support: `docs/screenshots/support.png`

## Project Structure
- `client/` Frontend app
- `server/` Backend API

## Local Setup

### Backend
1. Copy `server/.env.example` to `server/.env` and fill values.
2. Install dependencies:
   `cd server`
   `npm install`
3. Start server:
   `npm run dev`

### Frontend
1. Create `client/.env`:
   `VITE_API_BASE_URL=http://localhost:8000`
2. Install dependencies:
   `cd client`
   `npm install`
3. Start client:
   `npm run dev`

## Environment Variables

### Backend (`server/.env`)
- `MONGODB_URL`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV`
- `CLIENT_URL` (frontend URL for CORS)
- `FRONTEND_URL` (used in deploy URLs)
- `OPENROUTER_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SUPPORT_EMAIL_TO`

### Frontend (`client/.env`)
- `VITE_API_BASE_URL` (backend base URL)

## Credit Usage Rules
- Generate new website: 50 credits
- Update existing website: 25 credits
- Deploy website: 10 credits

## API Highlights
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/user/me`
- `POST /api/website/generate`
- `POST /api/website/update/:id`
- `GET /api/website/get-all`
- `GET /api/website/get-by-id/:id`
- `GET /api/website/deploy/:id`
- `POST /api/billing` (Stripe checkout)
- `GET /api/billing/history`
- `POST /api/support` (email + screenshot)

## Deployment (Render)

### 1) Create MongoDB and Stripe
- Create a MongoDB Atlas cluster and copy the connection string.
- Create Stripe account and get secret key + webhook secret.

### 2) Deploy Backend (Render Web Service)
1. New Web Service -> connect GitHub repo.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `npm run dev`
5. Add environment variables from `server/.env.example`.
6. Set `NODE_ENV=production`.
7. Set `CLIENT_URL` to your frontend Render URL.
8. Set `FRONTEND_URL` to your frontend Render URL.
9. Add Stripe webhook to:
   `https://YOUR_BACKEND_URL/api/stripe/webhook`

### 3) Deploy Frontend (Render Static Site)
1. New Static Site -> same repo.
2. Root Directory: `client`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Environment:
   `VITE_API_BASE_URL=https://YOUR_BACKEND_URL`

### 4) CORS and Cookies
- Backend sets `sameSite=none` and `secure=true` in production.
- Ensure frontend and backend are on HTTPS.

### 5) Verify
- Register/login
- Purchase credits
- Generate website
- Deploy and open live URL
- Check transaction history
- Submit support form

## Notes
- Do not commit `.env` files.
- Add your screenshots to `docs/screenshots/` and update paths in README.
