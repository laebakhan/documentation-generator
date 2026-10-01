export interface ProjectInput {
  name: string;
  description: string;
  techStack: string;
  features: string;
  githubUrl?: string;
  codeDetails?: string;
  docStyle?: 'standard' | 'comprehensive' | 'hackathon' | 'minimalist';
  targetAudience?: 'developers' | 'stakeholders' | 'students' | 'contributors';
  license?: string;
  authorName?: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'security' | 'data' | 'ui' | 'integration';
}

export interface FileItem {
  path: string;
  purpose: string;
  type: 'config' | 'entry' | 'backend' | 'frontend' | 'database' | 'asset';
}

export interface ProjectAnalysis {
  detectedLanguages: LanguageStat[];
  frameworks: string[];
  libraries: string[];
  database: string[];
  tools: string[];
  projectType: string;
  architecturePattern: string;
  mainFeatures: FeatureItem[];
  importantFiles: FileItem[];
  complexityScore: 'Beginner' | 'Intermediate' | 'Advanced' | 'Enterprise';
  estimatedDevTime: string;
  keyHighlights: string[];
}

export interface GeneratedDocSections {
  overview: string;
  problemStatement: string;
  features: string;
  techStack: string;
  installation: string;
  howToRun: string;
  howToUse: string;
  projectStructure: string;
  apiModules: string;
  futureScope: string;
}

export interface GeneratedDocumentation {
  id: string;
  createdAt: string;
  projectName: string;
  summary: string;
  sections: GeneratedDocSections;
  readmeMarkdown: string;
  analysis: ProjectAnalysis;
  rawInput: ProjectInput;
  generationSource?: 'gemini' | 'heuristic';
}
