// PDF text extraction using PDF.js library
async function extractPdfText(file) {
  // Load PDF.js library dynamically
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = async () => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const pdf = await pdfjsLib.getDocument(new Uint8Array(e.target.result)).promise;
          let fullText = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }

          resolve(fullText);
        } catch (error) {
          reject(new Error('Failed to extract text from PDF: ' + error.message));
        }
      };
      reader.readAsArrayBuffer(file);
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js library'));
  });
}

// DOCX text extraction using Mammoth.js
async function extractDocxText(file) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.min.js';
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
          resolve(result.value);
        } catch (error) {
          reject(new Error('Failed to extract text from DOCX: ' + error.message));
        }
      };
      reader.readAsArrayBuffer(file);
    };
    script.onerror = () => reject(new Error('Failed to load Mammoth.js library'));
  });
}

// Main extraction function
export async function extractFileText(file) {
  if (file.type === 'application/pdf') {
    return extractPdfText(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractDocxText(file);
  } else {
    throw new Error('Unsupported file format');
  }
}
