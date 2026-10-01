import React from 'react';
import { 
  Home, 
  Sparkles, 
  FileText, 
  Code2, 
  BarChart3, 
  Clock, 
  HelpCircle, 
  CheckCircle2,
  FolderGit2,
  Cpu
} from 'lucide-react';
import { GeneratedDocumentation } from '../types/project';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDoc: GeneratedDocumentation | null;
  historyCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentDoc,
  historyCount
}) => {
  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home, badge: null },
    { id: 'generate', label: 'Generate Docs', icon: Sparkles, badge: 'Studio' },
    { 
      id: 'documentation', 
      label: 'Documentation', 
      icon: FileText, 
      badge: currentDoc ? '10 Secs' : null,
      highlight: Boolean(currentDoc)
    },
    { 
      id: 'readme', 
      label: 'README Generator', 
      icon: Code2, 
      badge: currentDoc ? 'Ready' : null,
      highlight: Boolean(currentDoc)
    },
    { id: 'analysis', label: 'Project Analysis', icon: BarChart3, badge: currentDoc ? 'Deep' : null },
    { id: 'history', label: 'History', icon: Clock, badge: historyCount > 0 ? String(historyCount) : null },
    { id: 'about', label: 'About & Guide', icon: HelpCircle, badge: null },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-950/70 border-r border-slate-800/80 p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16 justify-between">
      <div className="space-y-6">
        
        {/* Active Project Card */}
        {currentDoc ? (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-800/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACTIVE DOCUMENT</span>
            </div>
            <h4 className="font-semibold text-slate-100 text-sm truncate" title={currentDoc.projectName}>
              {currentDoc.projectName}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                {currentDoc.analysis.projectType.split(' ')[0]}
              </span>
              <span>•</span>
              <span className="truncate">
                {currentDoc.analysis.detectedLanguages.map(l => l.name).slice(0, 2).join(', ')}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-400 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-medium mb-1">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              <span>No Project Loaded</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Fill in your project info or load the demo to generate complete docs.
            </p>
          </div>
        )}

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/70 to-indigo-950/40 text-cyan-300 border border-cyan-700/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md ${
                      isActive
                        ? 'bg-cyan-900/60 text-cyan-300'
                        : item.highlight
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Flow visualizer */}
        <div className="px-3 pt-3 border-t border-slate-800/60">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Workflow Pipeline
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-300">1</span>
              <span>Project Details</span>
            </div>
            <div className="h-2 border-l border-slate-800 ml-2" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-300">2</span>
              <span>Analyze & Infer</span>
            </div>
            <div className="h-2 border-l border-slate-800 ml-2" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-300">3</span>
              <span>10-Section Suite</span>
            </div>
            <div className="h-2 border-l border-slate-800 ml-2" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-300">4</span>
              <span>README.md Output</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/60 text-slate-400 text-[11px]">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Gen Engine</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-900/50">Online</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Markdown & README automation
        </p>
      </div>
    </aside>
  );
};
