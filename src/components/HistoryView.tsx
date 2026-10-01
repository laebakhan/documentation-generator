import React, { useState } from 'react';
import { GeneratedDocumentation } from '../types/project';
import { downloadFile } from '../utils/markdown';
import { 
  Clock, 
  Trash2, 
  ArrowRight, 
  Download, 
  Search, 
  FileText, 
  Sparkles,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

interface HistoryViewProps {
  history: GeneratedDocumentation[];
  currentDocId?: string;
  onRestore: (doc: GeneratedDocumentation) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onQuickNotify: (msg: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  currentDocId,
  onRestore,
  onDelete,
  onClearAll,
  onQuickNotify,
}) => {
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(item => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.projectName.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.rawInput.techStack.toLowerCase().includes(q)
    );
  });

  const handleDownloadDoc = (doc: GeneratedDocumentation) => {
    const filename = `${doc.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-README.md`;
    downloadFile(filename, doc.readmeMarkdown);
    onQuickNotify(`Downloaded ${filename}!`);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
              LOCAL STORAGE ARCHIVE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {history.length} Saved {history.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Generation History
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Previously generated documentation suites stored in your local browser session.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by project name, tech stack, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {/* History List or Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 space-y-3">
          <Clock className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">
            {history.length === 0 ? 'No Generated Projects Yet' : 'No Matching Projects Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {history.length === 0 
              ? 'When you generate documentation, your projects are saved here so you can revisit, restore, or export them anytime.'
              : 'Try searching with a different keyword.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredHistory.map((item) => {
            const isCurrent = item.id === currentDocId;
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCurrent 
                    ? 'bg-slate-900 border-cyan-700/60 shadow-lg shadow-cyan-950/50' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base truncate">
                      {item.projectName}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.analysis.projectType}
                    </span>
                    {item.analysis.detectedLanguages.slice(0, 3).map(lang => (
                      <span key={lang.name} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownloadDoc(item)}
                    title="Download README.md"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRestore(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Open in Studio</span>
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    title="Delete from history"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 text-xs border border-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
