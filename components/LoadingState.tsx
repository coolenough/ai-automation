
import React, { useState, useEffect } from 'react';

interface LoadingStateProps {
  isUploading?: boolean;
  isSaving?: boolean;
  customMessage?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isUploading, isSaving, customMessage }) => {
  const [step, setStep] = useState(0);
  
  const uploadMessages = [
    "Uploading PDF to secure cloud...",
    "Generating public access link...",
    "Syncing with Supabase Storage...",
    "Finalizing cloud bucket entry..."
  ];

  const dispatchMessages = [
    "Payload construction in progress...",
    "Opening connection to n8n node...",
    "Transmitting JSON package...",
    "Waiting for workflow trigger..."
  ];

  const activeMessages = customMessage ? [customMessage] : (isUploading ? uploadMessages : dispatchMessages);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % activeMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [activeMessages]);

  const getAccentColor = () => {
    if (isUploading) return 'border-t-emerald-500';
    return 'border-t-indigo-600';
  };

  const getIconColor = () => {
    if (isUploading) return 'text-emerald-500';
    return 'text-indigo-600';
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in zoom-in duration-500 w-full max-w-md">
      <div className="relative">
        <div className={`w-24 h-24 border-4 border-slate-100 ${getAccentColor()} rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className={`w-8 h-8 ${getIconColor()} animate-pulse`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          {isUploading ? 'Storage Sync' : 'Workflow Trigger'}
        </h3>
        <p className="text-slate-500 font-medium h-6">{activeMessages[step]}</p>
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full ${isUploading ? 'bg-emerald-500' : 'bg-indigo-600'} transition-all duration-1000 ease-out`}
          style={{ width: `${((step + 1) / activeMessages.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingState;
