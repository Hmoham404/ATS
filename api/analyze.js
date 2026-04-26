const https = require('https');

function makeHttpsRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function analyzeCV(cvText) {
  const AI_API_KEY = process.env.OPENROUTER_API_KEY;
  
  if (!AI_API_KEY) {
    return getMockAnalysis();
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) and HR consultant. Analyze the following CV for ATS compatibility and provide actionable feedback.

CV TEXT:
${cvText}

Provide a detailed analysis in JSON format with the following structure:
{
  "candidateName": "<extracted full name or 'Unknown'>",
  "currentJobTitle": "<extracted job title or target role>",
  "atsScore": <number 0-100>,
  "scoreCategory": "<excellent|good|fair|poor>",
  "strengths": [<list of 3-5 CV strengths>],
  "weaknesses": [<list of 3-5 areas for improvement>],
  "suggestions": [<list of 3-5 actionable suggestions>],
  "keywords": {
    "found": [<list of important keywords present>],
    "recommended": [<list of recommended keywords to add>]
  },
  "atsCompatibility": "<overall assessment>"
}

Return ONLY valid JSON, no additional text.`;

  try {
    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await makeHttpsRequest(options, {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('AI API Error:', error.message);
    return getMockAnalysis();
  }
}

function getMockAnalysis() {
  return {
    candidateName: 'John Doe',
    currentJobTitle: 'Software Engineer',
    atsScore: 75,
    scoreCategory: 'good',
    strengths: [
      'Clear professional summary',
      'Relevant work experience',
      'Technical skills listed'
    ],
    weaknesses: [
      'Missing keywords from job description',
      'No measurable achievements'
    ],
    suggestions: [
      'Add quantifiable results and metrics',
      'Use industry-specific keywords',
      'Improve formatting for ATS readability'
    ],
    keywords: {
      found: ['Java', 'Python', 'AWS'],
      recommended: ['DevOps', 'Agile', 'Cloud Architecture']
    },
    atsCompatibility: 'Good - Should pass most ATS systems'
  };
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cvText } = req.body;

    if (!cvText || cvText.trim().length === 0) {
      return res.status(400).json({ error: 'No CV text provided' });
    }

    const analysis = await analyzeCV(cvText);

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze CV'
    });
  }
};
