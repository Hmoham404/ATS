# AI CV Checker 🚀

A modern, AI-powered CV analysis tool that gives instant ATS scores and actionable suggestions to optimize your resume. Built with Node.js, Express, and vanilla JavaScript with a professional SaaS-style interface.

**Live Demo:** Coming Soon  
**GitHub:** [github.com/Hmoham404/ATS](https://github.com/Hmoham404/ATS)

---

## ✨ Features

- **AI-Powered Analysis** - Advanced AI analyzes your CV like professional recruiters do
- **ATS Score** - Know your Applicant Tracking System compatibility (0-100)
- **100% Private** - Your data is never stored or shared
- **All Formats** - Works with PDF and DOCX files (max 10MB)
- **Dark Mode** - Modern dark/light theme toggle
- **Real-time Results** - Instant feedback with animated score display
- **Downloadable Reports** - Export analysis as text file
- **Demo Mode** - Try before uploading your CV

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with dark mode support, animations, responsive design
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **Font Awesome** - Professional icons
- **Google Fonts** - Typography (Inter, Poppins)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **OpenRouter API** - AI model integration (gpt-3.5-turbo)
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX text extraction
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Deployment Ready
- **Frontend**: Vercel (free)
- **Backend**: Render, Railway, Heroku
- **Database**: Optional (currently stateless)

---

## 📋 Project Structure

```
ai-cv-checker/
├── frontend/
│   ├── index.html              # Main HTML structure
│   ├── styles.css              # Complete styling with dark mode
│   ├── script.js               # Frontend logic & interactivity
│   ├── assets/
│   │   └── SAMPLE_CV.txt       # Demo CV file
│   └── uploads/                # Uploaded files (temporary)
├── backend/
│   ├── src/
│   │   ├── server.js           # Express server & API endpoints
│   │   ├── services/
│   │   │   └── aiService.js    # OpenRouter AI integration
│   │   └── utils/
│   │       └── fileParser.js   # PDF/DOCX text extraction
│   ├── uploads/                # Temp file storage
│   ├── package.json
│   ├── .env                    # API keys & config
│   └── .env.example            # Config template
├── README.md                   # This file
├── SETUP.md                    # Quick setup guide
├── DEPLOYMENT.md               # Deployment instructions
└── .gitignore
```

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (v14+)
- npm
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/Hmoham404/ATS.git
cd ai-cv-checker
```

### Step 2: Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
OPENROUTER_API_KEY=sk-or-v1-your_key_here
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Start Backend
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 4: Start Frontend
Open a new terminal:
```bash
cd frontend
npx http-server -p 3000
```
OR with Python:
```bash
python -m http.server 3000
```
✅ Frontend running on http://localhost:3000

### Step 5: Test the App
- Open http://localhost:3000
- Click "Try Demo" to see sample analysis
- Or upload your CV for real analysis

---

## 🔑 Getting OpenRouter API Key (Free)

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up for free account
3. Copy API key from dashboard
4. Add to backend `.env`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxx
   ```

**Without API Key?** App runs in demo mode - perfect for testing UI/UX!

---

## 📊 API Endpoints

### Analyze CV
```
POST /api/analyze
Content-Type: multipart/form-data

Body: form-data with 'file' field (PDF or DOCX)

Response: {
  "candidateName": "John Doe",
  "currentJobTitle": "Software Engineer",
  "atsScore": 82,
  "scoreCategory": "Strong Match",
  "strengths": [
    "Strong technical skills",
    "Good experience",
    "Clear career progression"
  ],
  "weaknesses": [
    "Missing keywords",
    "Poor formatting",
    "Limited metrics"
  ],
  "suggestions": [
    "Add more ATS keywords",
    "Improve formatting",
    "Include more achievements"
  ],
  "keywords": {
    "found": ["Python", "React", "Node.js", "AWS"],
    "recommended": ["Docker", "Kubernetes", "CI/CD", "Machine Learning"]
  },
  "atsCompatibility": "This CV is well-formatted for ATS systems..."
}
```

---

## 🎯 Analysis Results Breakdown

### ATS Score (0-100)
- **90-100**: Excellent - Highly compatible with ATS systems
- **70-89**: Good - Generally well-formatted
- **50-69**: Fair - Some improvements needed
- **30-49**: Poor - Significant issues
- **0-29**: Critical - Major formatting problems

### Strengths
What's working well in your CV:
- Technical skills clarity
- Experience relevance
- Achievement metrics

### Weaknesses
Areas that need improvement:
- Missing industry keywords
- Inconsistent formatting
- Lack of quantifiable results

### Suggestions
Actionable recommendations:
- Add specific technology keywords
- Improve visual formatting
- Include measurable achievements

### Keywords Analysis
- **Found**: Keywords detected in your CV
- **Recommended**: Keywords you should add

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend?
```bash
# Make sure backend is running
# Check http://localhost:5000 in browser
# Look for CORS errors in console
# Restart backend with: npm run dev
```

### File Upload Not Working?
- File must be PDF or DOCX
- File size must be < 10MB
- Check backend logs for errors

### npm Install Fails?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors?
- Ensure `CORS_ORIGIN=http://localhost:3000` in `.env`
- Restart backend server

### API Key Issues?
- Verify API key is correctly copied
- Check for extra spaces in `.env`
- Ensure file is saved and backend restarted

---

## 🌍 Deployment

### Deploy Frontend to Vercel (Free)
```bash
npm install -g vercel
cd frontend
vercel
```

### Deploy Backend to Render (~$7/month)
1. Push to GitHub
2. Go to [render.com](https://render.com)
3. New Web Service
4. Connect GitHub repo
5. Set environment variables:
   - PORT=10000
   - OPENROUTER_API_KEY=your_key
   - CORS_ORIGIN=https://your-frontend.vercel.app
6. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 📁 Key Files

### Backend
- **server.js** - Express setup, POST /api/analyze endpoint, file upload handling
- **aiService.js** - OpenRouter API integration, CV text analysis, response parsing
- **fileParser.js** - PDF and DOCX text extraction using pdf-parse and mammoth

### Frontend
- **index.html** - Semantic HTML structure, hero section, features, upload area, results display
- **styles.css** - Complete styling with CSS variables, dark mode, animations, responsive design
- **script.js** - File upload, API communication, results display, dark mode toggle, animations

---

## 🎨 Features in Detail

### Dark Mode
- Toggle button in navbar
- Persists to localStorage
- System preference fallback
- Professional color scheme with CSS custom properties

### Score Animation
- SVG circle progress indicator
- Smooth number counter animation
- Color-coded results (Red, Yellow, Green)
- Real-time visual feedback

### Responsive Design
- Mobile-first approach
- Tablet breakpoint: 768px
- Mobile breakpoint: 480px
- Works perfectly on all devices

### Results Export
- Download analysis as text file
- Includes all scores and suggestions
- Ready for email or storage
- Professional formatting

### File Upload
- Drag and drop support
- Click to browse files
- File type validation
- File size validation (max 10MB)
- Loading indicator during analysis

---

## 📈 Performance

- **Instant Load** - Lightweight, no bloat (~50KB total)
- **Fast Analysis** - API response in 2-5 seconds
- **Smooth Animations** - 60fps CSS animations
- **Optimized** - Minified and production-ready
- **Responsive** - Mobile-friendly with fast rendering

---

## 🔒 Security & Privacy

- ✅ No data stored on server
- ✅ Files deleted after analysis
- ✅ HTTPS ready (use in production)
- ✅ API keys in environment variables only
- ✅ File upload validation
- ✅ CORS restrictions enforced
- ✅ No tracking or analytics
- ✅ No user accounts required

---

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

**Mohamed Lakhal** - AI/Web Developer

- GitHub: [github.com/Hmoham404](https://github.com/Hmoham404)
- LinkedIn: [Mohamed Lakhal](https://www.linkedin.com/in/mohamed-lakhal-874ab1218/)
- Portfolio: [bortoflo.vercel.app](https://bortoflo.vercel.app/)
- Email: lakhalm300@gmail.com
- Facebook: [Mohamed Lakhal](https://www.facebook.com/mohamed.lakhal.3745)

Made with ❤️ for job seekers

---

## 🤝 Contributing

Found a bug? Have a feature idea? 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

- Questions? Open an issue on GitHub
- Want to report a bug? Describe it clearly
- Feature requests? We'd love to hear them!

---

## 🎯 Roadmap

- [ ] User accounts & CV history
- [ ] Batch analysis for multiple CVs
- [ ] CV templates & formatting suggestions
- [ ] Industry-specific analysis
- [ ] Resume builder integration
- [ ] Export to PDF with feedback
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] CV comparison tools

---

## ⭐ Show Your Support

If this project helped you, please give it a star! ⭐

---

## 📚 Additional Resources

- [SETUP.md](SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Express.js Docs](https://expressjs.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy CV Checking! 🚀**
