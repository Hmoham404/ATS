# AI CV Checker - Getting Started

## Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your OpenRouter API key (optional):
```
PORT=5000
OPENROUTER_API_KEY=sk-or-v1-your_key_here
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Start Backend
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 4: Serve Frontend
```bash
cd frontend
npx http-server -p 3000
```
OR with Python:
```bash
python -m http.server 3000
```

✅ Frontend running on http://localhost:3000

---

## Test the App

### Option 1: Try Demo Mode (No Backend Required)
1. Open http://localhost:3000
2. Click "Try Demo"
3. See sample analysis

### Option 2: Upload Real CV
1. Open http://localhost:3000
2. Drop your CV or click to upload
3. Get instant ATS score and suggestions

---

## Troubleshooting

### Frontend not connecting to backend?
- Make sure backend is running on http://localhost:5000
- Check browser console for errors
- The app will work in demo mode without backend

### Backend error on npm install?
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS errors?
- Make sure `CORS_ORIGIN=http://localhost:3000` in backend `.env`
- Restart backend server

### File upload not working?
- Check file size (must be < 10MB)
- Verify file format (PDF or DOCX only)
- Check backend logs

---

## Free API Configuration

### Getting OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up (free account)
3. Copy your API key from dashboard
4. Add to `.env`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxx
   ```

### Without API Key
- App runs in **mock analysis mode**
- Perfect for testing UI/UX
- Shows realistic sample results

---

## File Structure

```
ai-cv-checker/
├── backend/
│   ├── src/
│   │   ├── server.js              # Main Express server
│   │   ├── services/aiService.js  # AI integration
│   │   └── utils/fileParser.js    # PDF/DOCX parsing
│   ├── uploads/                   # Temp file storage
│   └── package.json
├── frontend/
│   ├── index.html                 # Homepage
│   ├── styles.css                 # Styling
│   ├── script.js                  # Client logic
│   └── assets/SAMPLE_CV.txt       # Sample CV
└── README.md
```

---

## Next Steps

1. ✅ Run locally (you are here!)
2. 🚀 Deploy backend to Render/Railway
3. 🚀 Deploy frontend to Vercel/Netlify
4. 🎨 Customize styling
5. 🤖 Add more AI features
6. 📊 Add analytics/logging

---

## Need Help?

- 📖 Read [README.md](../README.md)
- 🐛 Check terminal logs for errors
- 💬 Try demo mode first
- 📧 Create an issue

Enjoy! 🚀
