import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Menu, 
  X, 
  Github,
  BookOpen,
  Check
} from 'lucide-react';
import { GeneratedDocumentation } from '../types/project';
import { downloadFile } from '../utils/markdown';

interface NavbarProps {
  currentDoc: GeneratedDocumentation | null;
  onLoadDemo: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onQuickNotify: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDoc,
  onLoadDemo,
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  onQuickNotify
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyReadme = async () => {
    if (!currentDoc) return;
    try {
      await navigator.clipboard.writeText(currentDoc.readmeMarkdown);
      setCopied(true);
      onQuickNotify('README.md copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onQuickNotify('Failed to copy. Please select and copy manually.');
    }
  };

  const handleDownload = () => {
    if (!currentDoc) return;
    const filename = `${currentDoc.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-README.md`;
    downloadFile(filename, currentDoc.readmeMarkdown);
    onQuickNotify(`Downloaded ${filename}!`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight">Project Guide</span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                Turn your project details into clear documentation
              </p>
            </div>
          </button>
        </div>

        {/* Center / Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'home' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'generate' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => setActiveTab('documentation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeTab === 'documentation' 
                ? 'bg-slate-800 text-cyan-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Documentation</span>
            {currentDoc && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'readme' 
                ? 'bg-slate-800 text-indigo-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            README
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'analysis' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'history' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'about' 
                ? 'bg-slate-800 text-white' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Trigger Button */}
          <button
            onClick={onLoadDemo}
            title="Load the Student Management System demo project"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Demo:</span>
            <span>Student Management</span>
          </button>

          {currentDoc && (
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
              <button
                onClick={handleCopyReadme}
                title="Copy README Markdown"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span className="hidden lg:inline text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                title="Download README.md"
                className="p-1.5 rounded-lg text-cyan-300 hover:text-cyan-200 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 text-xs flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px]">Download</span>
              </button>
            </div>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            🏠 Home Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('generate'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'generate' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            ⚡ Generate Documentation
          </button>
          <button
            onClick={() => { setActiveTab('documentation'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeTab === 'documentation' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
            }`}
          >
            <span>📖 Documentation Preview</span>
            {currentDoc && <span className="text-[10px] bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded">Ready</span>}
          </button>
          <button
            onClick={() => { setActiveTab('readme'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'readme' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'
            }`}
          >
            📋 README Generator
          </button>
          <button
            onClick={() => { setActiveTab('analysis'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'analysis' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            🔍 Project Analysis
          </button>
          <button
            onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'history' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            🕒 History
          </button>
          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'about' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            ℹ️ About Project Guide
          </button>
        </div>
      )}
    </header>
  );
};
