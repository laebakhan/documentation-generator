import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Edit3, 
  Eye, 
  Save, 
  FileCode, 
  FileText, 
  Columns, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { GeneratedDocumentation } from '../types/project';
import { renderMarkdown, downloadFile } from '../utils/markdown';

interface ReadmeViewProps {
  doc: GeneratedDocumentation;
  onUpdateReadme: (newMarkdown: string) => void;
  onRegenerate: () => void;
  onQuickNotify: (msg: string) => void;
}

export const ReadmeView: React.FC<ReadmeViewProps> = ({
  doc,
  onUpdateReadme,
  onRegenerate,
  onQuickNotify,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'editor' | 'split'>('preview');
  const [markdown, setMarkdown] = useState(doc.readmeMarkdown);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  // Sync markdown if doc changes
  React.useEffect(() => {
    setMarkdown(doc.readmeMarkdown);
    setIsSaved(true);
  }, [doc.readmeMarkdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      onQuickNotify('README.md copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onQuickNotify('Failed to copy. Please select and copy text manually.');
    }
  };

  const handleDownload = () => {
    const filename = `${doc.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-README.md`;
    downloadFile(filename, markdown);
    onQuickNotify(`Downloaded ${filename}!`);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
    setIsSaved(false);
  };

  const handleSaveChanges = () => {
    onUpdateReadme(markdown);
    setIsSaved(true);
    onQuickNotify('README.md changes saved!');
  };

  const lineCount = markdown.split('\n').length;
  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-800/60 font-semibold">
              GITHUB-FORMATTED README.MD
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {lineCount} lines • {wordCount} words
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>README.md Generator</span>
            {!isSaved && (
              <span className="text-xs text-amber-400 font-mono px-2 py-0.5 bg-amber-950/80 rounded border border-amber-800/60">
                Unsaved Edits
              </span>
            )}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Formatted with GitHub badges, markdown table of contents, prerequisites, run instructions, and license.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switches */}
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'preview'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'editor'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex px-2.5 py-1 rounded-lg text-xs font-medium items-center gap-1.5 transition-colors ${
                viewMode === 'split'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy README'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download README.md</span>
          </button>

          {/* Regenerate Button */}
          <button
            onClick={onRegenerate}
            title="Regenerate documentation and README"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 text-xs font-medium transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Editor Save Reminder if dirty */}
      {!isSaved && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs">
          <span>You have unsaved edits in your README. Click save to synchronize.</span>
          <button
            onClick={handleSaveChanges}
            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save README</span>
          </button>
        </div>
      )}

      {/* Workspace Display Area */}
      <div className="space-y-4">
        
        {/* Split View */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* Left: Raw Editor */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>README.md (Editor)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">{lineCount} lines</span>
              </div>
              <textarea
                rows={30}
                value={markdown}
                onChange={handleTextChange}
                className="w-full p-4 bg-slate-900/90 text-slate-100 font-mono text-xs focus:outline-none leading-relaxed resize-y border-none"
              />
            </div>

            {/* Right: Rendered Preview */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg p-6 max-h-[800px] overflow-y-auto">
              <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
            </div>
          </div>
        )}

        {/* Editor Only */}
        {viewMode === 'editor' && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>README.md Source</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{lineCount} lines</span>
                {!isSaved && (
                  <button
                    onClick={handleSaveChanges}
                    className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                )}
              </div>
            </div>
            <textarea
              rows={28}
              value={markdown}
              onChange={handleTextChange}
              className="w-full p-6 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed resize-y"
            />
          </div>
        )}

        {/* Preview Only */}
        {viewMode === 'preview' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
          </div>
        )}

      </div>

    </div>
  );
};
