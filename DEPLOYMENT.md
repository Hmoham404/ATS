# AI CV Checker - Deployment Guide

## Deploy Frontend to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Set build settings:
   - Build Command: (leave empty)
   - Output Directory: .

---

## Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Select GitHub repo
5. Configure:
   - **Build Command:** npm install
   - **Start Command:** npm start
   - **Environment Variables:**
     ```
     PORT=10000
     OPENROUTER_API_KEY=sk-or-v1-xxxxx
     CORS_ORIGIN=https://your-frontend.vercel.app
     ```

---

## Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create project
railway init

# Deploy
railway up
```

---

## Environment Variables for Production

### Frontend
```
VITE_API_URL=https://your-backend.com/api
```

### Backend
```
PORT=10000
OPENROUTER_API_KEY=sk-or-v1-xxxxx
CORS_ORIGIN=https://your-frontend.com
NODE_ENV=production
```

---

## Custom Domain

### Vercel
1. Domain Settings
2. Add custom domain
3. Update DNS records

### Render
1. Custom Domains
2. Add domain
3. Point DNS

---

## Cost Estimation

- **Frontend Hosting (Vercel):** Free (generous free tier)
- **Backend Hosting (Render):** ~$7/month (hobby tier)
- **API Costs (OpenRouter):** Free credits + pay-as-you-go
- **Total:** $7/month + API usage

---

## Performance Tips

- Enable gzip compression
- Set appropriate cache headers
- Use CDN for static files
- Monitor API rate limits
- Set up error tracking

---

## Security Checklist

- ✅ Use HTTPS everywhere
- ✅ Validate file uploads
- ✅ Implement rate limiting
- ✅ Use environment variables for secrets
- ✅ Add CORS restrictions
- ✅ Sanitize file names
- ✅ Monitor for suspicious activity

---

## Monitoring & Logging

### Render
- Built-in logs and metrics
- Check in Render dashboard

### Vercel
- Built-in analytics
- Check in Vercel dashboard

### OpenRouter
- Monitor API usage
- Check billing in dashboard

---

Ready to deploy! 🚀
