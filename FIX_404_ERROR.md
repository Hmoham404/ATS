# Fix 404 Error on Vercel - Quick Guide

## ❌ Problem
Getting `404: NOT_FOUND` error after deploying to Vercel

## ✅ Solution

The issue is that your frontend needs proper configuration to serve a single-page application (SPA).

---

## 🔧 Fixed Configuration

I've updated:

1. **frontend/package.json** ✅
   - Tells Vercel how to serve the frontend

2. **frontend/vercel.json** ✅
   - Routes all requests to index.html (SPA routing)
   - Proper caching headers
   - Security headers

3. **frontend/script.js** ✅
   - API URL is now dynamic
   - Uses localhost in development
   - Uses backend URL in production

---

## 🚀 Redeploy to Vercel

### Step 1: Clear Vercel Cache
1. Go to your Vercel project dashboard
2. Go to **Settings → Git**
3. Click **Purge Everything** (or **Clear Deployments**)

### Step 2: Redeploy
1. Go to **Deployments**
2. Find the latest deployment
3. Click **3 dots → Redeploy**

OR

1. Make a dummy commit and push:
   ```bash
   git commit --allow-empty -m "Redeploy to Vercel"
   git push origin main
   ```

Vercel will automatically rebuild and deploy.

---

## 🔗 Connect Backend API

After redeploying, your frontend needs to know the backend URL.

### Option 1: Set in Vercel Environment Variables

1. Go to Vercel Project → **Settings → Environment Variables**
2. Create new variable:
   ```
   Key: API_URL
   Value: https://your-backend.onrender.com/api
   ```
3. Redeploy (or it will auto-redeploy)

### Option 2: Inline in Code (Already Done ✅)

The code now automatically detects:
- **Development:** Uses `http://localhost:5000/api`
- **Production:** Uses `https://ats-backend.onrender.com/api`

You can override by setting `window.API_URL` before the app loads.

---

## ✨ What Changed

### Before (Failed)
```javascript
const API_URL = 'http://localhost:5000/api'; // Always hardcoded
```

### After (Works in Production) ✅
```javascript
const API_URL = (() => {
  if (window.location.hostname !== 'localhost') {
    return window.API_URL || 'https://ats-backend.onrender.com/api';
  }
  return 'http://localhost:5000/api';
})();
```

---

## 🎯 Complete Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Backend `.env` has correct CORS_ORIGIN
- [ ] Frontend redeployed on Vercel
- [ ] Vercel can access Render backend (no CORS errors)
- [ ] Can upload CV and get analysis
- [ ] Results display correctly

---

## 🔍 Verify Deployment

1. **Open your Vercel URL** (e.g., `https://ats-abc123.vercel.app`)
2. Should see the full page (not 404)
3. Click "Try Demo" → should work
4. Upload a CV → should call the backend

---

## 📊 Check API Connection

Open browser console (F12) and look for:

✅ Good:
```
🔗 API URL: https://ats-backend.onrender.com/api
```

❌ Bad:
```
🔗 API URL: http://localhost:5000/api
```

---

## 🆘 Still Getting 404?

### Check 1: Vercel Build Logs
1. Go to Vercel dashboard
2. Click your project
3. Go to **Deployments**
4. Click latest deployment
5. Look for any build errors

### Check 2: Browser Console
1. Open your Vercel URL
2. Press F12 (Developer Tools)
3. Look for errors in Console tab

### Check 3: Network Tab
1. In DevTools, click Network tab
2. Reload page
3. Look for failed requests
4. Click on request to see details

### Check 4: Clear Cache
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Or clear browser cache manually
3. Try from incognito/private window

---

## 🚀 Latest Changes Pushed

Your GitHub repository has been updated with:
- ✅ `frontend/package.json` - Build configuration
- ✅ `frontend/vercel.json` - Routing rules
- ✅ `frontend/script.js` - Dynamic API URL

All changes are already in GitHub → ready to deploy!

---

## 📞 Quick Reference

**Your Vercel Project:** https://vercel.com/dashboard  
**Your GitHub Repo:** https://github.com/Hmoham404/ATS  
**Render Backend:** https://render.com/dashboard  

---

**Deploy now and let me know if you see the app! 🎉**
