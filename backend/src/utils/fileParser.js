import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractTextFromFile(filePath, mimeType) {
  try {
    if (mimeType === 'application/pdf') {
      return await extractTextFromPDF(filePath);
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await extractTextFromDOCX(filePath);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error(`Failed to extract text from file: ${error.message}`);
  }
}

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text || '';
  } catch (error) {
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
}

async function extractTextFromDOCX(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    throw new Error(`DOCX parsing failed: ${error.message}`);
  }
}
