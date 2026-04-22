# Deploy to Vercel - Quick Guide

## 🚀 Frontend Deployment (Vercel)

### Option 1: Using Vercel Dashboard (Easiest)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select GitHub repository: `Hmoham404/ATS`
   - Click "Import"

3. **Configure**
   - **Root Directory:** `frontend`
   - **Build Command:** Leave empty
   - **Output Directory:** `.`
   - **Environment Variables:**
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-api.com/api`

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your live URL!

---

### Option 2: Using Vercel CLI

```bash
# Navigate to frontend
cd frontend

# Deploy with npx
npx vercel

# Or install globally first
npm install -g vercel
vercel
```

Then follow the prompts:
- Link to existing project or create new
- Select root directory: `frontend`
- Deploy!

---

## 🔙 Backend Deployment (Render.com)

### Step 1: Prepare Backend for Production

Update `backend/.env`:
```env
PORT=10000
OPENROUTER_API_KEY=sk-or-v1-your_key
CORS_ORIGIN=https://your-frontend.vercel.app
NODE_ENV=production
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create new Web Service

### Step 3: Configure Render Service

1. **Select Repository:** `Hmoham404/ATS`
2. **Build Command:** `npm install && npm install --prefix backend`
3. **Start Command:** `cd backend && npm start`
4. **Root Directory:** Leave as default
5. **Environment Variables:**
   ```
   PORT=10000
   OPENROUTER_API_KEY=sk-or-v1-xxxxx
   CORS_ORIGIN=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

### Step 4: Deploy
- Click "Deploy"
- Render builds and deploys automatically
- Get your backend URL (e.g., `https://ats-backend.onrender.com`)

---

## 🔗 Connect Frontend & Backend

After both are deployed:

1. **Get Backend URL from Render**
   - Example: `https://ats-backend.onrender.com`

2. **Update Vercel Environment**
   - Go to Vercel Project Settings
   - Environment Variables
   - Update `VITE_API_URL` to your Render backend URL

3. **Update CORS in Backend**
   - Set `CORS_ORIGIN` to your Vercel frontend URL
   - Redeploy backend on Render

---

## ✅ Test Production

1. Open your Vercel frontend URL
2. Upload a CV
3. Should get analysis from OpenRouter API
4. Check browser console for errors

---

## 🎯 Final URLs

**Frontend:** `https://your-project.vercel.app`  
**Backend:** `https://your-backend.onrender.com`  
**API Endpoint:** `https://your-backend.onrender.com/api/analyze`

---

## 📝 Troubleshooting Production

### CORS Errors in Frontend
- Check `CORS_ORIGIN` in backend `.env`
- Must match exact Vercel frontend URL
- Redeploy backend after changes

### API Not Responding
- Check Render backend logs
- Verify OpenRouter API key is valid
- Check network tab in browser DevTools

### File Upload Fails
- Verify `NODE_ENV=production`
- Check upload directory permissions
- Check file size limits

### Slow Performance
- Enable Vercel Analytics
- Check OpenRouter API response time
- Monitor Render resource usage

---

## 💡 Cost Estimate

- **Vercel (Frontend):** FREE (generous free tier)
- **Render (Backend):** ~$7/month (hobby tier)
- **OpenRouter API:** Free credits + pay-as-you-go ($0-10/month for typical usage)
- **Total:** ~$7-17/month

---

## 🔐 Security Checklist

✅ Never commit `.env` files  
✅ API keys only in Render environment variables  
✅ HTTPS everywhere (automatic with Vercel/Render)  
✅ CORS properly configured  
✅ File upload validation enabled  
✅ File size limits enforced (10MB max)  

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **OpenRouter Docs:** https://openrouter.ai/docs
- **GitHub Issues:** Open an issue in the repo

---

**Your app is now live! 🎉**
