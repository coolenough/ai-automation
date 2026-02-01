
import React from 'react';
import { ProfileInputs } from '../types';

interface InputSectionProps {
  inputs: ProfileInputs;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (field: 'linkedinUrl' | 'githubUrl', value: string) => void;
  onAnalyze: () => void;
  onRetry: () => void;
  error: string | null;
  errorStage: 'upload' | 'analysis' | 'save' | 'auth' | null;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  inputs, 
  onFileChange, 
  onUrlChange, 
  onAnalyze,
  onRetry,
  error,
  errorStage
}) => {
  return (
    <div className="w-full max-w-2xl bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-6">
        {/* Resume */}
        <div className="group">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">1. Candidate Resume</label>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">PDF ONLY</span>
          </div>
          <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group/upload bg-slate-50/50 overflow-hidden">
            <input 
              type="file" 
              accept="application/pdf"
              onChange={onFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover/upload:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-slate-400 group-hover/upload:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-base text-slate-600 font-semibold">
                {inputs.resume ? <span className="text-indigo-600">{inputs.resume.name}</span> : 'Drop Resume or Browse'}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Automatic cloud sync on upload</p>
            </div>
            {/* Background design element */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* URLs */}
        <div className="space-y-5">
          <label className="text-sm font-extrabold text-slate-800 uppercase tracking-tight block">2. External Profiles</label>
          
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="w-6 h-6 text-slate-300 group-focus-within/input:text-indigo-400 transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
            </div>
            <input 
              type="text"
              placeholder="LinkedIn URL"
              value={inputs.linkedinUrl}
              onChange={(e) => onUrlChange('linkedinUrl', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm"
            />
          </div>

          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="w-6 h-6 text-slate-300 group-focus-within/input:text-indigo-400 transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
            </div>
            <input 
              type="text"
              placeholder="GitHub URL"
              value={inputs.githubUrl}
              onChange={(e) => onUrlChange('githubUrl', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-5 rounded-3xl bg-red-50 border border-red-100 text-red-900 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start">
            <div className="bg-red-200/50 p-2 rounded-xl mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-black uppercase text-xs tracking-widest mb-1">Dispatch Failure</p>
              <p className="font-semibold leading-relaxed opacity-80">{error}</p>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={onAnalyze}
        className="group relative w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-black active:scale-[0.98] transition-all shadow-2xl shadow-slate-200 overflow-hidden"
      >
        <span className="flex items-center justify-center relative z-10">
          Start Automation
          <svg className="w-6 h-6 ml-3 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </div>
  );
};

export default InputSection;
