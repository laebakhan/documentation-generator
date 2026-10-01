import React from 'react';
import { 
  ProjectAnalysis, 
  LanguageStat, 
  FeatureItem, 
  FileItem 
} from '../types/project';
import { 
  BarChart3, 
  Cpu, 
  Layers, 
  FolderTree, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Clock, 
  Wrench,
  FileCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AnalysisViewProps {
  analysis: ProjectAnalysis;
  projectName: string;
  onGoToDocumentation: () => void;
  onGoToReadme: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  analysis,
  projectName,
  onGoToDocumentation,
  onGoToReadme,
}) => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800/60 font-semibold">
              PROJECT ARCHITECTURE & TECH ANALYSIS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {projectName} Analysis
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Automated architectural detection, language distribution, and module dependency inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToDocumentation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <span>View Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onGoToReadme}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all"
          >
            <span>Open README</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Type */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>PROJECT TYPE</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base font-bold text-slate-100 truncate" title={analysis.projectType}>
            {analysis.projectType}
          </div>
          <p className="text-[11px] text-slate-400">Detected system category</p>
        </div>

        {/* Architecture Pattern */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ARCHITECTURE</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-base font-bold text-slate-100 truncate" title={analysis.architecturePattern}>
            {analysis.architecturePattern}
          </div>
          <p className="text-[11px] text-slate-400">Structural design model</p>
        </div>

        {/* Complexity Rating */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>COMPLEXITY</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-emerald-400">
            {analysis.complexityScore}
          </div>
          <p className="text-[11px] text-slate-400">Based on feature density</p>
        </div>

        {/* Estimated Dev Time */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ESTIMATED BUILD TIME</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base font-bold text-amber-300">
            {analysis.estimatedDevTime}
          </div>
          <p className="text-[11px] text-slate-400">Full implementation cycle</p>
        </div>
      </div>

      {/* Language Breakdown Bar (GitHub style) */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Programming Languages Composition</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Detected Ratio</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
          {analysis.detectedLanguages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              title={`${lang.name}: ${lang.percentage}%`}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-90"
            />
          ))}
        </div>

        {/* Language Legend Chips */}
        <div className="flex flex-wrap gap-3 pt-1">
          {analysis.detectedLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="font-medium text-slate-200">{lang.name}</span>
              <span className="text-slate-400 font-mono text-[11px]">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frameworks, Libraries, Database & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Frameworks & Runtimes */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            <Cpu className="w-4 h-4" />
            <span>Frameworks & Runtimes</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.frameworks.map((fw) => (
              <span
                key={fw}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-cyan-300 border border-slate-700/80"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Database & Storage */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
            <Database className="w-4 h-4" />
            <span>Database & Storage</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.database.map((db) => (
              <span
                key={db}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-emerald-300 border border-slate-700/80"
              >
                {db}
              </span>
            ))}
          </div>
        </div>

        {/* Tools & DevOps */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            <Wrench className="w-4 h-4" />
            <span>Tools & Build</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-amber-300 border border-slate-700/80"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Extracted Features & Classification</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.mainFeatures.map((feat) => (
            <div
              key={feat.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-xs">
                  {feat.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold bg-slate-800 text-slate-400">
                  {feat.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Files & Modules Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Essential Files & Module Responsibilities</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{analysis.importantFiles.length} key modules</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-4 font-semibold">File / Module Path</th>
                <th className="py-2.5 px-4 font-semibold">Layer</th>
                <th className="py-2.5 px-4 font-semibold">Architectural Responsibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {analysis.importantFiles.map((file, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-medium text-cyan-300">
                    {file.path}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700/60">
                      {file.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-300">
                    {file.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architectural Highlights */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Synthesis Highlights</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          {analysis.keyHighlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{hl}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
