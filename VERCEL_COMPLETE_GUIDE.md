# 🚀 Deploy to Vercel (Frontend + Backend)

## ✅ Configuration Complete!

Your project is now ready to deploy **everything on Vercel** - frontend AND backend in one place!

---

## 📋 What Changed:

1. **API Routes** - Created `/api/` folder with serverless functions
2. **Frontend Updated** - Now extracts PDF/DOCX text client-side
3. **Single Domain** - Frontend and API on same Vercel URL
4. **No more Render** - Backend runs as Vercel serverless functions

---

## 🚀 Deploy in 3 Steps:

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure Vercel deployment with API routes"
git push origin main
```

### Step 2: Set Environment Variables on Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add this variable:
```
Key: OPENROUTER_API_KEY
Value: sk-or-v1-your-actual-api-key-here
```

Get your OpenRouter key from: https://openrouter.ai/

### Step 3: Deploy

Vercel auto-deploys when you push to GitHub! 🎉

---

## 🧪 Test Locally First

```bash
# Install all dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Run Vercel locally
npx vercel dev

# Open browser
# Frontend: http://localhost:3000
# API: http://localhost:3000/api/health
```

---

## 📝 API Endpoints

- **GET** `/api/health` - Health check
- **POST** `/api/analyze` - Analyze CV

### Example POST Request:
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cvText: "Your CV text here..."
  })
});
```

---

## 🔐 Security Notes

- API key is now stored securely in Vercel Environment Variables
- Never commit `.env.local` to GitHub
- PDF/DOCX extraction happens on the client (user's browser)
- Only text is sent to the API

---

## 🐛 Troubleshooting

### "API not found" error
- Make sure you've set the `OPENROUTER_API_KEY` in Vercel settings
- Check Vercel deployment logs

### File extraction fails
- Browser must support FileReader API (all modern browsers)
- File size limit: 10MB

### CORS errors
- CORS is now handled in `/api/analyze.js`
- Should work automatically on Vercel

---

## 📚 Next Steps

1. Add more API routes in `/api/` folder as needed
2. Use Vercel's built-in analytics
3. Monitor usage in OpenRouter dashboard

**Happy Deploying!** 🎉
