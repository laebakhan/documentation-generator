import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Code2, 
  Layers, 
  CheckCircle, 
  Download, 
  Terminal, 
  FolderTree, 
  ShieldCheck, 
  Zap,
  Play,
  Cpu
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../utils/sampleData';
import { ProjectInput } from '../types/project';

interface DashboardHomeProps {
  onStartNew: () => void;
  onSelectSample: (sample: ProjectInput) => void;
  onViewDoc: () => void;
  hasActiveDoc: boolean;
  activeProjectName?: string;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onStartNew,
  onSelectSample,
  onViewDoc,
  hasActiveDoc,
  activeProjectName
}) => {
  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Documentation & README Generator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Turn your project details into{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              clear, professional documentation.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Input your project tech stack, key features, and code structure. Project Guide synthesizes 
            a complete 10-section documentation suite and an industry-standard GitHub README.md ready to copy or download.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartNew}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>Generate Documentation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Quick Demo Button (Student Management System) */}
            <button
              onClick={() => onSelectSample(SAMPLE_PROJECTS[0].data)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-sm transition-all"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>Load Student Management Demo</span>
            </button>

            {hasActiveDoc && (
              <button
                onClick={onViewDoc}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Current ({activeProjectName})</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">10</div>
              <div className="text-xs text-slate-400">Complete Sections</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">100%</div>
              <div className="text-xs text-slate-400">GitHub README Ready</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">Instant</div>
              <div className="text-xs text-slate-400">Copy & Download</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">Deep</div>
              <div className="text-xs text-slate-400">Tech Stack Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1-Click Ready Demo Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Ready Demo Templates</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select any pre-configured architecture to inspect the complete generator workflow instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_PROJECTS.map((sample) => (
            <div
              key={sample.id}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-600/50 hover:bg-slate-900 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                    {sample.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">MIT</span>
                </div>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                  {sample.label}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {sample.data.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sample.data.techStack.split(',').slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onSelectSample(sample.data)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 group-hover:bg-cyan-600 group-hover:text-white text-slate-200 text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Load & Generate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 10 Sections Showcase */}
      <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Generated Documentation Breakdown</span>
          </h2>
          <p className="text-xs text-slate-400">
            Every generation automatically creates 10 structured, industry-standard technical sections:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { num: '01', title: 'Project Overview', desc: 'Summary, vision, goals & badges' },
            { num: '02', title: 'Problem Statement', desc: 'Challenges & rationale for the solution' },
            { num: '03', title: 'Features & Capabilities', desc: 'Core user workflows & functionality' },
            { num: '04', title: 'Technology Stack', desc: 'Categorized language, DB & frameworks' },
            { num: '05', title: 'Installation Guide', desc: 'Prerequisites, cloning & DB migration' },
            { num: '06', title: 'How to Run', desc: 'Local dev, server start & build scripts' },
            { num: '07', title: 'How to Use', desc: 'Step-by-step walkthrough for users' },
            { num: '08', title: 'Project Structure', desc: 'Annotated ASCII folder tree' },
            { num: '09', title: 'API / Modules', desc: 'Endpoints, HTTP methods & schemas' },
            { num: '10', title: 'Future Scope', desc: 'Roadmap, next milestones & v2 items' },
          ].map((sec) => (
            <div
              key={sec.num}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-cyan-400">{sec.num}</div>
              <div className="font-semibold text-slate-200 text-sm mt-1">{sec.title}</div>
              <div className="text-[11px] text-slate-400 mt-1">{sec.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950 border border-slate-800">
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 font-semibold">
          Seamless User Journey
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Terminal className="w-5 h-5 mx-auto text-cyan-400 mb-1.5" />
            <div className="font-bold text-xs text-slate-200">1. Project Details</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Stack, features, code</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Cpu className="w-5 h-5 mx-auto text-indigo-400 mb-1.5" />
            <div className="font-bold text-xs text-slate-200">2. Deep Analysis</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Architecture & modules</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <FileText className="w-5 h-5 mx-auto text-emerald-400 mb-1.5" />
            <div className="font-bold text-xs text-slate-200">3. 10 Doc Sections</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Structured technical specs</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Code2 className="w-5 h-5 mx-auto text-amber-400 mb-1.5" />
            <div className="font-bold text-xs text-slate-200">4. README.md</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Badges & GitHub format</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Download className="w-5 h-5 mx-auto text-rose-400 mb-1.5" />
            <div className="font-bold text-xs text-slate-200">5. Copy / Download</div>
            <div className="text-[10px] text-slate-400 mt-0.5">1-click file delivery</div>
          </div>
        </div>
      </section>

    </div>
  );
};
