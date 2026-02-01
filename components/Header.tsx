
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter">INGEST PORTAL</h1>
            <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest -mt-1">Pipeline Client v2.1</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Webhook Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
