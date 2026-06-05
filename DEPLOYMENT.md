Vercel deployment notes

Required environment variables (set for both Production and Preview):
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

Vercel settings:
- Build Command: `npm run build`
- Install Command: `npm ci` (or `npm install`)
- Output Directory: leave default (app uses serverless API under `/api`)
- Node Version: 18 (or set `engines.node` in `package.json`)

Quick deploy steps:
1. Commit and push your branch to the repository connected to Vercel.
2. In Vercel Dashboard → Project → Environment, add the required env vars.
3. Trigger a deploy (push or Redeploy) and watch the build logs for errors.

Debugging tips:
- If build fails, open the Deployment logs and copy the error here.
- If runtime 500s occur, check Server logs in Vercel and ensure env vars present.
- `api/[[...route]].js` expects `dist/server/server.js` to be generated during build.

Files changed:
- package.json: added `engines.node = 18.x` to ensure Vercel uses Node 18.
