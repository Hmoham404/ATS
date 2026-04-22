import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeCV } from './services/aiService.js';
import { extractTextFromFile } from './utils/fileParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI CV Checker API is running' });
});

app.post('/api/analyze', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from file
    const filePath = req.file.path;
    const cvText = await extractTextFromFile(filePath, req.file.mimetype);

    if (!cvText || cvText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from file' });
    }

    // Analyze with AI
    const analysis = await analyzeCV(cvText);

    res.json({
      success: true,
      fileName: req.file.originalname,
      analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze CV'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ 
    error: error.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`✅ AI CV Checker API running on http://localhost:${PORT}`);
  console.log(`📝 API Docs: POST /api/analyze`);
});
