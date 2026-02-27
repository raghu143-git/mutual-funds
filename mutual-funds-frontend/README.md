# Mutual Funds Frontend (Demo)

This is a Next.js demo frontend for a realtime mutual funds explorer. It includes:

- Landing, Login (mock), Dashboard, Funds list, Fund detail
- Mock API routes under `/api` including a simple SSE `/api/realtime` endpoint
- Tailwind CSS for styling

Quick start:

```bash
cd mutual-funds-frontend
npm install
npm run dev
```

Open http://localhost:3000 (or run with `npx next dev -p 3001` if port 3000 is busy)

Deploy to Vercel: import the project or push to a Git repo and connect to Vercel. The SSE endpoint is a demo and may not work on all hosting platforms (serverless limits).
