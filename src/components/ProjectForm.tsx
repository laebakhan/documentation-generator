import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Github, 
  FileCode, 
  Layers, 
  RotateCcw, 
  HelpCircle,
  Plus,
  X,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProjectInput } from '../types/project';
import { SAMPLE_PROJECTS } from '../utils/sampleData';

interface ProjectFormProps {
  initialData?: ProjectInput;
  onSubmit: (data: ProjectInput) => void;
  isGenerating: boolean;
}

const COMMON_TECH_SUGGESTIONS = [
  'Java', 'MySQL', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'React', 'Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB',
  'PostgreSQL', 'Docker', 'Bootstrap', 'Tailwind CSS', 'Apache Tomcat', 'JDBC'
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isGenerating
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [techStack, setTechStack] = useState(initialData?.techStack || '');
  const [features, setFeatures] = useState(initialData?.features || '');
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || '');
  const [codeDetails, setCodeDetails] = useState(initialData?.codeDetails || '');
  const [docStyle, setDocStyle] = useState<ProjectInput['docStyle']>(initialData?.docStyle || 'comprehensive');
  const [targetAudience, setTargetAudience] = useState<ProjectInput['targetAudience']>(initialData?.targetAudience || 'developers');
  const [license, setLicense] = useState(initialData?.license || 'MIT');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAddTechTag = (tag: string) => {
    const currentTags = techStack
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (!currentTags.some(t => t.toLowerCase() === tag.toLowerCase())) {
      const updated = currentTags.length > 0 ? `${techStack.trim()}, ${tag}` : tag;
      setTechStack(updated);
    }
  };

  const handleLoadDemo = (sampleId = 'student-mgmt') => {
    const sample = SAMPLE_PROJECTS.find(s => s.id === sampleId) || SAMPLE_PROJECTS[0];
    setName(sample.data.name);
    setDescription(sample.data.description);
    setTechStack(sample.data.techStack);
    setFeatures(sample.data.features);
    setGithubUrl(sample.data.githubUrl || '');
    setCodeDetails(sample.data.codeDetails || '');
    setDocStyle(sample.data.docStyle || 'comprehensive');
    setTargetAudience(sample.data.targetAudience || 'developers');
    setLicense(sample.data.license || 'MIT');
    setValidationError(null);
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setTechStack('');
    setFeatures('');
    setGithubUrl('');
    setCodeDetails('');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If completely empty, we can either prompt or autofill demo data per requirements:
    // "If no project details are entered, use realistic sample data so the app can still be demonstrated."
    let finalName = name.trim();
    let finalDesc = description.trim();
    let finalTech = techStack.trim();
    let finalFeatures = features.trim();

    if (!finalName && !finalDesc) {
      // Use realistic Student Management System sample data
      const defaultSample = SAMPLE_PROJECTS[0].data;
      finalName = defaultSample.name;
      finalDesc = defaultSample.description;
      finalTech = defaultSample.techStack;
      finalFeatures = defaultSample.features;
      setName(finalName);
      setDescription(finalDesc);
      setTechStack(finalTech);
      setFeatures(finalFeatures);
    }

    const payload: ProjectInput = {
      name: finalName || 'Student Management System',
      description: finalDesc || 'Academic management system for universities and colleges.',
      techStack: finalTech || 'Java, MySQL, HTML, CSS, JavaScript',
      features: finalFeatures || 'Student registration, Attendance, GPA Calculator',
      githubUrl: githubUrl.trim() || undefined,
      codeDetails: codeDetails.trim() || undefined,
      docStyle,
      targetAudience,
      license,
    };

    setValidationError(null);
    onSubmit(payload);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Project Details
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
              Generator Studio
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Turn your project details into clear, professional documentation.
          </p>
        </div>

        {/* Quick Demo Pre-fill Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleLoadDemo('student-mgmt')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            title="Load Student Management System sample data"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>Load "Student Management" Demo</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs border border-slate-800"
            title="Clear Form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Validation Banner if any */}
      {validationError && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Core Identifiers */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-950 flex items-center justify-center text-xs text-cyan-300">1</span>
            Basic Information
          </h2>

          {/* Project Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Student Management System"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-medium transition-colors"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              The official title of your repository, application, or software package.
            </p>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Description <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your project does, who it is for, and the core problems it solves..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-colors resize-y leading-relaxed"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              A comprehensive summary helps generate deep Problem Statement and Executive Summary sections.
            </p>
          </div>
        </div>

        {/* Section 2: Tech Stack & Features */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-950 flex items-center justify-center text-xs text-indigo-300">2</span>
            Stack & Features
          </h2>

          {/* Tech Stack Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Technology / Tech Stack <span className="text-indigo-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500">Comma-separated</span>
            </div>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g., Java, MySQL, HTML, CSS, JavaScript, Apache Tomcat"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono transition-colors"
            />
            
            {/* Quick-add chips */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-500 mr-1">Quick Add:</span>
              {COMMON_TECH_SUGGESTIONS.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleAddTechTag(tech)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
                >
                  +{tech}
                </button>
              ))}
            </div>
          </div>

          {/* Features Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Features <span className="text-indigo-400">*</span>
            </label>
            <textarea
              rows={4}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder={`Enter features line-by-line or bulleted:
- Student Enrollment & Profile Management
- Course Registration & Timetable Allocation
- Attendance Tracking with Monthly Reports
- GPA / CGPA Calculation & Grade Cards
- Role-based Authentication for Admin & Faculty`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono transition-colors resize-y leading-relaxed"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Each feature will be formatted into feature tables, architecture specs, and user guides.
            </p>
          </div>
        </div>

        {/* Section 3: Optional Code & Repository Details */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-xs text-emerald-300">3</span>
            Optional Code & Repository Details
          </h2>

          {/* GitHub Repo URL */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Repository URL (Optional)</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/project-repo"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono transition-colors"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Used to format real git clone commands, shields badges, and contribution links in the README.
            </p>
          </div>

          {/* Code / Architecture / Schema details */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              <span>Code Snippets / Database Schema / Directory Details (Optional)</span>
            </label>
            <textarea
              rows={4}
              value={codeDetails}
              onChange={(e) => setCodeDetails(e.target.value)}
              placeholder={`Paste any SQL schema, sample routes, or directory layout hints:
CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100));
// StudentServlet.java handles /students endpoints`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono transition-colors resize-y leading-relaxed"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Optional snippets help auto-populate accurate API signatures and schema definitions.
            </p>
          </div>

          {/* Settings Grid */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Documentation Style
              </label>
              <select
                value={docStyle}
                onChange={(e) => setDocStyle(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="comprehensive">Comprehensive (All 10 Sections)</option>
                <option value="standard">Standard Industry Format</option>
                <option value="hackathon">Hackathon Pitch & Demo</option>
                <option value="minimalist">Minimalist Developer Docs</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="developers">Developers & Engineers</option>
                <option value="students">Students & Academic Evaluators</option>
                <option value="contributors">Open Source Contributors</option>
                <option value="stakeholders">Stakeholders & Executives</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                License
              </label>
              <select
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="MIT">MIT License</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GNU GPL v3</option>
                <option value="BSD-3-Clause">BSD 3-Clause</option>
                <option value="ISC">ISC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span className="font-semibold text-slate-200">Ready to synthesize:</span> Clicking generate will analyze your inputs and assemble the full documentation suite.
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:via-teal-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>{isGenerating ? 'Generating Documentation...' : 'Generate Documentation'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
