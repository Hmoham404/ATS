# 🔒 Security: API Key Exposed - Action Required

## ⚠️ What Happened

Your OpenRouter API key was found exposed in the GitHub repository:
- **Key ending in:** `...c24d`
- **Location:** `backend/.env` (previously committed)
- **Status:** ❌ COMPROMISED

---

## ✅ What I've Done

1. ✅ Added `.gitignore` to prevent future `.env` commits
2. ✅ Removed `backend/.env` from Git tracking
3. ✅ Pushed security changes to GitHub

---

## 🔑 Next Steps - You Must Do These

### Step 1: Revoke the Compromised Key

1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Find the key ending in `...c24d`
3. Click **Delete** or **Revoke**
4. Confirm deletion

**⏱️ This prevents anyone from using the stolen key**

---

### Step 2: Create a New API Key

1. On [openrouter.ai/keys](https://openrouter.ai/keys)
2. Click **"Create New Key"**
3. Give it a name: `AI CV Checker Production` or similar
4. Copy the **complete new key**

---

### Step 3: Update Your Local `.env` File

Open `backend/.env` on your computer (do NOT commit this file!):

```env
PORT=5000
OPENROUTER_API_KEY=sk-or-v1-YOUR-NEW-KEY-HERE
CORS_ORIGIN=http://localhost:3000
```

**Replace `YOUR-NEW-KEY-HERE` with the new key from Step 2**

---

### Step 4: Update Vercel Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your **ATS project**
3. Go to **Settings → Environment Variables**
4. Update or create:
   ```
   Key: OPENROUTER_API_KEY
   Value: sk-or-v1-YOUR-NEW-KEY
   ```
5. Click **Save**
6. Go to **Deployments → Redeploy**

---

### Step 5: Update Render Environment Variables

If you deployed backend on Render:

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click your **backend service**
3. Go to **Environment**
4. Update:
   ```
   OPENROUTER_API_KEY=sk-or-v1-YOUR-NEW-KEY
   ```
5. Click **Save**
6. Service will redeploy automatically

---

### Step 6: Update Your Render Backend `.env` File

On your local computer, update `backend/.env`:

```env
PORT=10000
OPENROUTER_API_KEY=sk-or-v1-YOUR-NEW-KEY
CORS_ORIGIN=https://your-frontend.vercel.app
NODE_ENV=production
```

**Do NOT commit this file!**

---

## 🛡️ Security Best Practices

### NEVER Commit `.env` Files

The `.gitignore` now prevents this, but remember:

```bash
❌ WRONG:  git add backend/.env
❌ WRONG:  git commit -m "add env file"

✅ RIGHT: Keep .env local only
✅ RIGHT: Use environment variables on services
```

### Use `.env.example`

Share a template without secrets:

**`backend/.env.example`:**
```env
PORT=5000
OPENROUTER_API_KEY=your_key_here_never_commit
CORS_ORIGIN=http://localhost:3000
```

---

## ✅ Verification Checklist

- [ ] Revoked the old API key on openrouter.ai
- [ ] Created a new API key
- [ ] Updated local `backend/.env` with new key
- [ ] Updated Vercel environment variables
- [ ] Updated Render environment variables
- [ ] Redeployed Vercel project
- [ ] Redeployed Render service
- [ ] Tested the app - can upload & analyze CV
- [ ] Checked `.gitignore` - `.env` is listed

---

## 🔍 Verify Everything Works

### Test Locally

```bash
cd backend
npm run dev
# Check that it connects with new API key
```

### Test on Vercel

1. Visit your Vercel URL
2. Click "Try Demo" - should work
3. Upload a CV - should analyze it
4. Check browser console (F12) - look for API messages

### Test on Render

1. Check Render dashboard - service should be "Live"
2. No error logs
3. API responding to requests

---

## 📋 Summary

| Item | Status | Action |
|------|--------|--------|
| **Old key compromised** | ❌ Exposed | ✅ Will revoke |
| **GitHub protected** | ✅ Done | `.env` now in `.gitignore` |
| **New key created** | ⏳ Need to do | Go to openrouter.ai |
| **Environment updated** | ⏳ Need to do | Update Vercel + Render |
| **App tested** | ⏳ Need to do | Verify works end-to-end |

---

## 🆘 If You Need Help

**Question:** How do I know the old key won't be used?  
**Answer:** Once you revoke it on openrouter.ai, it's permanently disabled.

**Question:** Do I need to change anything in GitHub?  
**Answer:** No, the old `.env` is removed from Git history. Just make sure never to commit it again.

**Question:** What if I forgot to revoke the key?  
**Answer:** Do it now! Even if someone had the key from git history, revoking it makes it useless.

---

## 🎯 Timeline

- **Immediately:** Revoke old key + create new one (Step 1-2)
- **Today:** Update environments (Step 3-5)
- **Today:** Test everything (Verification)
- **Done:** API key is now secure

---

**⏰ This should take ~15-20 minutes total**

**🔐 After this, your repository will be secure!**
