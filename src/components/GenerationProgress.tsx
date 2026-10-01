import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Terminal, 
  Code2, 
  Layers, 
  FileText, 
  Cpu
} from 'lucide-react';

interface GenerationProgressProps {
  projectName: string;
  onComplete?: () => void;
}

const STAGES = [
  { id: 1, label: 'Parsing metadata and tech stack parameters', icon: Terminal, weight: 20 },
  { id: 2, label: 'Analyzing architecture, dependencies & file tree', icon: Cpu, weight: 45 },
  { id: 3, label: 'Synthesizing 10 technical documentation sections', icon: FileText, weight: 70 },
  { id: 4, label: 'Formatting GitHub-standard README.md with shields', icon: Code2, weight: 90 },
  { id: 5, label: 'Finalizing documentation suite & schema validation', icon: CheckCircle2, weight: 100 },
];

export const GenerationProgress: React.FC<GenerationProgressProps> = ({ projectName }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [percent, setPercent] = useState(15);
  const [logs, setLogs] = useState<string[]>([
    `[INFO] Initialized Project Guide documentation synthesizer...`,
    `[INFO] Target Project: "${projectName || 'Student Management System'}"`,
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStageIndex(1);
      setPercent(40);
      setLogs(prev => [...prev, `[OK] Detected technology signatures and runtime requirements`]);
    }, 600);

    const timer2 = setTimeout(() => {
      setCurrentStageIndex(2);
      setPercent(68);
      setLogs(prev => [...prev, `[OK] Generated structured architectural breakdown and DAO/MVC patterns`]);
    }, 1300);

    const timer3 = setTimeout(() => {
      setCurrentStageIndex(3);
      setPercent(88);
      setLogs(prev => [...prev, `[OK] Compiled Installation Guide, How to Run, and API endpoints`]);
    }, 2000);

    const timer4 = setTimeout(() => {
      setCurrentStageIndex(4);
      setPercent(98);
      setLogs(prev => [...prev, `[OK] Formatted complete README.md with Markdown table of contents and shields`]);
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [projectName]);

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 mb-2">
          <Sparkles className="w-6 h-6 animate-spin text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Generating Documentation
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Synthesizing comprehensive documentation and README.md for <span className="text-cyan-300 font-semibold">{projectName}</span>.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Pipeline Execution</span>
          <span className="text-cyan-400 font-bold">{percent}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500 shadow-sm shadow-cyan-500/50"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-3 pt-2">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <div 
              key={stage.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-xs ${
                isDone 
                  ? 'bg-slate-950/80 border-emerald-900/50 text-slate-300' 
                  : isCurrent 
                  ? 'bg-cyan-950/40 border-cyan-700/60 text-cyan-200' 
                  : 'bg-slate-950/30 border-slate-800/40 text-slate-400'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <span className="flex-1 font-medium">{stage.label}</span>
              <span className="font-mono text-[10px] text-slate-400">
                {isDone ? 'COMPLETE' : isCurrent ? 'IN PROGRESS' : 'QUEUED'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Simulated Terminal Log Stream */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1 overflow-hidden">
        <div className="flex items-center gap-2 text-slate-400 pb-1.5 border-b border-slate-800/80">
          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] ml-1 text-slate-400">build.log</span>
        </div>
        {logs.map((log, index) => (
          <div key={index} className="truncate text-slate-400">
            {log}
          </div>
        ))}
      </div>

    </div>
  );
};
