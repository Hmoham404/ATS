// Dynamic API URL configuration
const API_URL = (() => {
  // If in production (Vercel), use environment variable or default to production API
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return window.API_URL || 'https://ats-backend.onrender.com/api';
  }
  // Development: use localhost
  return 'http://localhost:5000/api';
})();

console.log('🔗 API URL:', API_URL);

let currentAnalysis = null;

/* ==========================================
   DARK MODE TOGGLE
   ========================================== */
const darkModeBtn = document.getElementById('darkModeBtn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize dark mode from localStorage or system preference
function initDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const isDark = savedMode !== null ? savedMode === 'true' : prefersDark.matches;
  
  if (isDark) {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateDarkModeIcon(isDark);
}

function updateDarkModeIcon(isDark) {
  const icon = darkModeBtn.querySelector('i');
  if (isDark) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.add('fa-moon');
    icon.classList.remove('fa-sun');
  }
}

darkModeBtn.addEventListener('click', toggleDarkMode);
initDarkMode();

// Upload Area Interactions
const uploadArea = document.getElementById('uploadArea');
const cvFile = document.getElementById('cvFile');

uploadArea.addEventListener('click', () => cvFile.click());

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    cvFile.files = files;
    analyzeCV();
  }
});

cvFile.addEventListener('change', () => {
  if (cvFile.files.length > 0) {
    analyzeCV();
  }
});

async function analyzeCV() {
  const file = cvFile.files[0];
  
  if (!file) {
    showError('Please select a file');
    return;
  }

  // Validate file type
  if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
    showError('Please upload a PDF or DOCX file');
    return;
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    showError('File size must be less than 10MB');
    return;
  }

  showLoading();

  try {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Analysis failed');
    }

    const result = await response.json();
    currentAnalysis = result.analysis;
    displayResults(result.analysis);
  } catch (error) {
    showError(error.message || 'Failed to analyze CV. Please try again.');
    hideLoading();
  }
}

function displayResults(analysis) {
  hideLoading();

  // Update candidate info
  document.getElementById('candidateName').textContent = analysis.candidateName || 'Unknown';
  document.getElementById('candidateJobTitle').textContent = analysis.currentJobTitle || 'Position not detected';

  // Update score
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreLabel = document.getElementById('scoreLabel');
  const scoreRing = document.getElementById('scoreRing');
  
  // Animate score number
  animateValue(scoreNumber, 0, analysis.atsScore, 1000);
  scoreLabel.textContent = analysis.scoreCategory;
  
  // Animate SVG circle
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (analysis.atsScore / 100) * circumference;
  scoreRing.style.strokeDashoffset = offset;

  // Update compatibility text
  document.getElementById('compatibilityText').textContent = analysis.atsCompatibility;

  // Update strengths
  const strengthsList = document.getElementById('strengthsList');
  strengthsList.innerHTML = analysis.strengths
    .map(item => `<li>${item}</li>`)
    .join('');

  // Update weaknesses
  const weaknessesList = document.getElementById('weaknessesList');
  weaknessesList.innerHTML = analysis.weaknesses
    .map(item => `<li>${item}</li>`)
    .join('');

  // Update suggestions
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = analysis.suggestions
    .map(item => `<li>${item}</li>`)
    .join('');

  // Update keywords
  const keywordsFound = document.getElementById('keywordsFound');
  keywordsFound.innerHTML = analysis.keywords.found
    .map(kw => `<span class="keyword-tag">${kw}</span>`)
    .join('');

  const keywordsRecommended = document.getElementById('keywordsRecommended');
  keywordsRecommended.innerHTML = analysis.keywords.recommended
    .map(kw => `<span class="keyword-tag">${kw}</span>`)
    .join('');

  // Show results container
  document.getElementById('resultsContainer').classList.remove('hidden');
  
  // Scroll to results
  document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Animate number counter
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function resetAnalysis() {
  cvFile.value = '';
  document.getElementById('resultsContainer').classList.add('hidden');
  uploadArea.scrollIntoView({ behavior: 'smooth' });
}

function downloadResults() {
  if (!currentAnalysis) return;

  const content = `
AI CV CHECKER - ANALYSIS RESULTS
================================

Candidate: ${currentAnalysis.candidateName || 'Unknown'}
Position: ${currentAnalysis.currentJobTitle || 'Not detected'}

ATS Score: ${currentAnalysis.atsScore}/100
Category: ${currentAnalysis.scoreCategory}

STRENGTHS:
${currentAnalysis.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

WEAKNESSES:
${currentAnalysis.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

SUGGESTIONS FOR IMPROVEMENT:
${currentAnalysis.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

KEYWORDS FOUND:
${currentAnalysis.keywords.found.join(', ')}

RECOMMENDED KEYWORDS:
${currentAnalysis.keywords.recommended.join(', ')}

COMPATIBILITY ASSESSMENT:
${currentAnalysis.atsCompatibility}

Generated by AI CV Checker
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cv-analysis-results.txt';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

function showLoading() {
  document.getElementById('loadingIndicator').classList.remove('hidden');
  document.getElementById('resultsContainer').classList.add('hidden');
}

function hideLoading() {
  document.getElementById('loadingIndicator').classList.add('hidden');
}

function showError(message) {
  alert(`❌ Error: ${message}`);
}

// Demo Analysis
function analyzeExample() {
  showLoading();
  
  // Simulate API delay
  setTimeout(() => {
    const mockAnalysis = {
      atsScore: 78,
      scoreCategory: 'good',
      atsCompatibility: 'Your CV has good ATS compatibility. Focus on adding more industry keywords and quantifiable metrics.',
      strengths: [
        'Clear professional summary with impactful achievements',
        'Well-organized work experience with measurable results',
        'Good use of action verbs and strong technical keywords',
        'Consistent formatting and clean structure'
      ],
      weaknesses: [
        'Missing some industry-specific technical keywords',
        'Could include more quantifiable metrics (percentages, numbers)',
        'No mention of relevant certifications',
        'Limited white space in job descriptions'
      ],
      suggestions: [
        'Add specific technical skills (Python, AWS, React, etc.) in a dedicated skills section',
        'Include metrics for each achievement (e.g., "increased sales by 35%")',
        'Add professional certifications and education details',
        'Use shorter, punchier bullet points for better readability',
        'Include industry-relevant keywords from job postings'
      ],
      keywords: {
        found: ['leadership', 'project management', 'team collaboration', 'data analysis', 'communication', 'problem solving'],
        recommended: ['machine learning', 'cloud architecture', 'agile', 'DevOps', 'stakeholder management', 'system design', 'API development']
      }
    };

    currentAnalysis = mockAnalysis;
    displayResults(mockAnalysis);
  }, 2000);
}

// Health check on page load
window.addEventListener('load', async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      console.warn('⚠️  Backend API not available. Using demo mode only.');
    }
  } catch (error) {
    console.warn('⚠️  Cannot connect to backend. Frontend demo mode enabled.');
  }
});
