import React, { useState } from 'react';
import { 
  GeneratedDocumentation, 
  GeneratedDocSections 
} from '../types/project';
import { renderMarkdown, downloadFile } from '../utils/markdown';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  Save, 
  X, 
  Search, 
  ChevronRight, 
  Code2, 
  Sparkles, 
  BookOpen,
  ArrowUpRight,
  Printer
} from 'lucide-react';

interface DocumentationViewProps {
  doc: GeneratedDocumentation;
  onUpdateSections: (updatedSections: GeneratedDocSections) => void;
  onSwitchToReadme: () => void;
  onSwitchToAnalysis: () => void;
  onQuickNotify: (msg: string) => void;
}

const SECTION_CONFIG: { key: keyof GeneratedDocSections; title: string; iconNumber: string }[] = [
  { key: 'overview', title: 'Project Overview', iconNumber: '01' },
  { key: 'problemStatement', title: 'Problem Statement', iconNumber: '02' },
  { key: 'features', title: 'Features & Capabilities', iconNumber: '03' },
  { key: 'techStack', title: 'Technology Stack', iconNumber: '04' },
  { key: 'installation', title: 'Installation Guide', iconNumber: '05' },
  { key: 'howToRun', title: 'How to Run', iconNumber: '06' },
  { key: 'howToUse', title: 'How to Use', iconNumber: '07' },
  { key: 'projectStructure', title: 'Project Structure', iconNumber: '08' },
  { key: 'apiModules', title: 'API / Module Information', iconNumber: '09' },
  { key: 'futureScope', title: 'Future Scope & Roadmap', iconNumber: '10' },
];

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  doc,
  onUpdateSections,
  onSwitchToReadme,
  onSwitchToAnalysis,
  onQuickNotify,
}) => {
  const [activeSectionKey, setActiveSectionKey] = useState<keyof GeneratedDocSections>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<keyof GeneratedDocSections | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleCopySection = async (key: keyof GeneratedDocSections, title: string) => {
    try {
      await navigator.clipboard.writeText(doc.sections[key]);
      setCopiedKey(key);
      onQuickNotify(`Copied "${title}" section!`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      onQuickNotify('Failed to copy. Please select and copy text manually.');
    }
  };

  const handleStartEdit = (key: keyof GeneratedDocSections) => {
    setEditingKey(key);
    setEditContent(doc.sections[key]);
  };

  const handleSaveEdit = () => {
    if (!editingKey) return;
    const updated = {
      ...doc.sections,
      [editingKey]: editContent,
    };
    onUpdateSections(updated);
    setEditingKey(null);
    onQuickNotify('Section updated successfully!');
  };

  const handleDownloadFullDoc = () => {
    let fullText = `# ${doc.projectName} - Complete Technical Documentation\n\n`;
    fullText += `Generated on ${new Date(doc.createdAt).toLocaleDateString()}\n\n`;
    fullText += `Executive Summary:\n${doc.summary}\n\n---\n\n`;

    SECTION_CONFIG.forEach(sec => {
      fullText += `## ${sec.title}\n\n${doc.sections[sec.key]}\n\n---\n\n`;
    });

    const filename = `${doc.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-docs.md`;
    downloadFile(filename, fullText);
    onQuickNotify(`Downloaded ${filename}!`);
  };

  const filteredSections = SECTION_CONFIG.filter(sec => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = sec.title.toLowerCase().includes(query);
    const contentMatch = doc.sections[sec.key].toLowerCase().includes(query);
    return titleMatch || contentMatch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
              DOCUMENTATION PREVIEW & EDITOR
            </span>
            <span className="text-xs text-slate-400">
              Created {new Date(doc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {doc.projectName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 line-clamp-2 max-w-2xl">
            {doc.summary}
          </p>
        </div>

        {/* Global Doc Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onSwitchToReadme}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 text-xs font-semibold transition-all"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>View README.md</span>
          </button>

          <button
            onClick={onSwitchToAnalysis}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tech Analysis</span>
          </button>

          <button
            onClick={handleDownloadFullDoc}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.md)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Table of Contents Navigation (Sticky) */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Table of Contents</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">10 Sections</span>
          </div>

          {/* Quick Search inside documentation */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sections or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Section Items */}
          <nav className="space-y-1 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1">
            {filteredSections.map((sec) => {
              const isActive = activeSectionKey === sec.key;
              return (
                <button
                  key={sec.key}
                  onClick={() => {
                    setActiveSectionKey(sec.key);
                    const el = document.getElementById(`section-${sec.key}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-800/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-cyan-400">{sec.iconNumber}</span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </nav>

          {/* Quick Stats Box */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Detected Type:</span>
              <span className="text-slate-200 font-medium">{doc.analysis.projectType.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Architecture:</span>
              <span className="text-slate-200 font-medium truncate max-w-[140px]" title={doc.analysis.architecturePattern}>
                {doc.analysis.architecturePattern.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Right Documentation Content Stream */}
        <div className="lg:col-span-8 space-y-6">
          {filteredSections.map((sec) => {
            const isEditing = editingKey === sec.key;
            const isCopied = copiedKey === sec.key;

            return (
              <section
                key={sec.key}
                id={`section-${sec.key}`}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md space-y-4"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                      {sec.iconNumber}
                    </span>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Section Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopySection(sec.key, sec.title)}
                      title="Copy section markdown"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs border border-slate-800 flex items-center gap-1 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => isEditing ? setEditingKey(null) : handleStartEdit(sec.key)}
                      title={isEditing ? 'Cancel Edit' : 'Edit section markdown'}
                      className={`p-1.5 rounded-lg text-xs border flex items-center gap-1 transition-colors ${
                        isEditing
                          ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline text-[11px]">{isEditing ? 'Close' : 'Edit'}</span>
                    </button>
                  </div>
                </div>

                {/* Section Content (View or In-line Markdown Editor) */}
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="text-[11px] text-slate-400">
                      Editing raw Markdown for this section. Changes will reflect in both Documentation and README views.
                    </div>
                    <textarea
                      rows={12}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500 leading-relaxed resize-y"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingKey(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="markdown-body text-slate-300"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.sections[sec.key]) }}
                  />
                )}
              </section>
            );
          })}
        </div>

      </div>

    </div>
  );
};
