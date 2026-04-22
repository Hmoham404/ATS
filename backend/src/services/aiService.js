import axios from 'axios';

const AI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function analyzeCV(cvText) {
  const AI_API_KEY = process.env.OPENROUTER_API_KEY;
  
  if (!AI_API_KEY) {
    console.warn('⚠️  OpenRouter API key not configured. Using mock analysis.');
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
    console.log('📤 Sending CV to OpenRouter API...');
    console.log('API Key present:', !!AI_API_KEY);
    console.log('Using model: openai/gpt-3.5-turbo');
    
    const response = await axios.post(
      AI_API_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'AI CV Checker'
        }
      }
    );

    console.log('✅ API response received');
    const content = response.data.choices[0].message.content;
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('❌ AI API Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    // Fallback to mock analysis if API fails
    console.log('📋 Using mock analysis as fallback...');
    return getMockAnalysis();
  }
}

function getMockAnalysis() {
  return {
    candidateName: 'John Doe',
    currentJobTitle: 'Software Engineer',
    atsScore: 72,
    scoreCategory: 'good',
    strengths: [
      'Clear professional summary with measurable achievements',
      'Strong technical skills section with relevant technologies',
      'Good use of action verbs and quantifiable results',
      'Well-structured work experience with clear responsibilities'
    ],
    weaknesses: [
      'Missing key industry-specific keywords',
      'Inconsistent date formatting throughout',
      'No mention of relevant certifications or technical qualifications',
      'Limited use of metrics in some job descriptions'
    ],
    suggestions: [
      'Add specific technical skills and certifications relevant to your target role',
      'Include quantifiable achievements (e.g., increased sales by 25%)',
      'Use standard date formats consistently (MM/YYYY)',
      'Add a keywords section matching the job description',
      'Expand bullet points with more specific examples of accomplishments'
    ],
    keywords: {
      found: ['leadership', 'project management', 'team collaboration', 'data analysis', 'communication'],
      recommended: ['machine learning', 'cloud computing', 'agile methodology', 'stakeholder management', 'system design']
    },
    atsCompatibility: 'Your CV is ATS-friendly with good structure and content. Focus on adding more industry-specific keywords and quantifiable metrics.'
  };
}
