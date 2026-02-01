
import React from 'react';
import { SubmissionData } from '../types';

interface DashboardProps {
  data: SubmissionData;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-700 space-y-10">
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden text-center">
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto backdrop-blur-xl border border-white/20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">Pipeline Sync</h2>
          <p className="text-indigo-100 font-bold uppercase tracking-[0.2em] text-xs">Record successfully committed to n8n</p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-12 space-y-10">
        <div className="flex items-center justify-between border-b border-slate-50 pb-8">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Submission Receipt</h3>
          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-lg uppercase">{data.timestamp}</span>
        </div>
        
        <div className="space-y-8">
          <div className="group">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Cloud Storage Link</span>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
              <span className="text-xs font-bold text-slate-600 truncate max-w-[200px]">{data.resumeUrl}</span>
              <a href={data.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-black text-[10px] uppercase hover:underline shrink-0">Open PDF</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">LinkedIn</span>
               {data.linkedinUrl !== 'N/A' ? (
                 <a href={data.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-900 font-bold text-xs hover:text-indigo-600 truncate block">View Profile</a>
               ) : (
                 <span className="text-slate-300 font-bold text-xs uppercase">Not Provided</span>
               )}
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">GitHub</span>
               {data.githubUrl !== 'N/A' ? (
                 <a href={data.githubUrl} target="_blank" rel="noreferrer" className="text-slate-900 font-bold text-xs hover:text-indigo-600 truncate block">View Source</a>
               ) : (
                 <span className="text-slate-300 font-bold text-xs uppercase">Not Provided</span>
               )}
            </div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-sm hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3"
        >
          <span>New Pipeline Entry</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
        Your data is now being formatted into row entries<br/>at the linked Google Spreadsheet.
      </p>
    </div>
  );
};

export default Dashboard;
