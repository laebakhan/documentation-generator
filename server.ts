import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateDocumentationSuite, analyzeProjectInput } from './src/utils/docGenerator.ts';
import { ProjectInput, GeneratedDocumentation } from './src/types/project.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Documentation Generation Proxy Endpoint
app.post('/api/generate', async (req, res) => {
  const input: ProjectInput = req.body;

  if (!input || !input.name) {
    // Fall back to sample if completely empty
    const fallbackDoc = generateDocumentationSuite(input || { name: 'Student Management System', description: '', techStack: 'Java, MySQL, HTML, CSS, JavaScript', features: '' });
    return res.json({ documentation: fallbackDoc, source: 'heuristic' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log('[Server] No GEMINI_API_KEY detected. Using local smart generation engine.');
    const doc = generateDocumentationSuite(input);
    return res.json({ documentation: doc, source: 'heuristic' });
  }

  try {
    const ai = new GoogleGenAI();
    const prompt = `You are an expert software technical writer and systems architect.
Generate comprehensive, professional documentation and a GitHub-ready README.md for the following software project:

Project Name: ${input.name}
Description: ${input.description}
Tech Stack: ${input.techStack}
Features: ${input.features}
GitHub URL: ${input.githubUrl || 'N/A'}
Code / Project Details: ${input.codeDetails || 'N/A'}
Documentation Style: ${input.docStyle || 'comprehensive'}
Target Audience: ${input.targetAudience || 'developers'}
License: ${input.license || 'MIT'}

Return a JSON object with this exact structure:
{
  "summary": "1-2 sentence executive summary",
  "sections": {
    "overview": "Detailed Markdown for Section 1: Project Overview (Motivation, Goals, Background)",
    "problemStatement": "Detailed Markdown for Section 2: Problem Statement & Why This Solution",
    "features": "Detailed Markdown for Section 3: Features & Capabilities (bulleted with bold titles)",
    "techStack": "Detailed Markdown for Section 4: Technology Stack with Markdown table categorizing languages, frameworks, DB, tools",
    "installation": "Detailed Markdown for Section 5: Step-by-step Installation & Prerequisites with shell code blocks",
    "howToRun": "Detailed Markdown for Section 6: How to Run (dev server, build, environment config)",
    "howToUse": "Detailed Markdown for Section 7: User Walkthrough with practical workflows",
    "projectStructure": "Detailed Markdown for Section 8: ASCII directory tree with file explanations",
    "apiModules": "Detailed Markdown for Section 9: API Endpoints table, HTTP methods, controllers, or schemas",
    "futureScope": "Detailed Markdown for Section 10: Future Roadmap and expansion scope checklist"
  },
  "readmeMarkdown": "Full GitHub-standard README.md incorporating all sections with badges, table of contents, and license."
}

Do not wrap in extra markdown ticks if possible, just return raw JSON or JSON in codeblock.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    let parsedData: any = null;

    try {
      // Clean possible markdown code fences if present
      const cleanJson = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.warn('[Server] Could not parse Gemini JSON response directly, falling back to heuristic engine:', parseErr);
    }

    if (parsedData && parsedData.sections && parsedData.readmeMarkdown) {
      const baseAnalysis = analyzeProjectInput(input);
      const doc: GeneratedDocumentation = {
        id: `doc-${Date.now()}`,
        createdAt: new Date().toISOString(),
        projectName: input.name,
        summary: parsedData.summary || input.description.slice(0, 150),
        sections: parsedData.sections,
        readmeMarkdown: parsedData.readmeMarkdown,
        analysis: baseAnalysis,
        rawInput: input,
        generationSource: 'gemini',
      };
      return res.json({ documentation: doc, source: 'gemini' });
    } else {
      // Fallback
      const doc = generateDocumentationSuite(input);
      return res.json({ documentation: doc, source: 'heuristic' });
    }
  } catch (error: any) {
    console.error('[Server] Gemini API call error:', error);
    // Graceful fallback to guarantee zero crash and fast response
    const doc = generateDocumentationSuite(input);
    return res.json({ documentation: doc, source: 'heuristic', error: error.message });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Project Guide] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
