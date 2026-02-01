
import React, { useState } from 'react';
import { uploadToCloud, sendToWebhook } from './services/storageService';
import { ProfileInputs, SubmissionData } from './types';
import Header from './components/Header';
import InputSection from './components/InputSection';
import LoadingState from './components/LoadingState';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ProfileInputs>({
    resume: null,
    linkedinUrl: '',
    githubUrl: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'dispatching' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<SubmissionData | null>(null);

  const handleSubmit = async () => {
    if (!inputs.resume && !inputs.linkedinUrl && !inputs.githubUrl) {
      setErrorMessage("Please provide at least one source (Resume, LinkedIn, or GitHub).");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    let pdfUrl = "N/A";

    try {
      if (inputs.resume) {
        setStatus('uploading');
        const uploadRes = await uploadToCloud(inputs.resume);
        pdfUrl = uploadRes.url;
      }

      setStatus('dispatching');
      const payload = {
        resume_url: pdfUrl,
        linkedin_profile: inputs.linkedinUrl || 'N/A',
        github_profile: inputs.githubUrl || 'N/A',
        source: 'Pipeline_Client_v2',
        submission_time: new Date().toLocaleString()
      };

      await sendToWebhook(payload);

      setLastSubmission({
        resumeUrl: pdfUrl,
        linkedinUrl: inputs.linkedinUrl || 'N/A',
        githubUrl: inputs.githubUrl || 'N/A',
        timestamp: payload.submission_time
      });

      setStatus('success');
    } catch (err: any) {
      console.error("Pipeline Failure:", err);
      setStatus('error');
      setErrorMessage(err.message || "Automation pipeline failed to connect.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputs({ resume: null, linkedinUrl: '', githubUrl: '' });
    setLastSubmission(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-16">
        {status !== 'success' && !loading && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em]">
              Sheet Sync Portal
            </div>
            <h2 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
              Direct <span className="text-indigo-600">Ingest</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Submit profile data directly to your n8n workflow for high-speed spreadsheet population.
            </p>
          </div>
        )}

        {status === 'success' && lastSubmission ? (
          <Dashboard data={lastSubmission} onReset={handleReset} />
        ) : loading ? (
          <div className="flex justify-center py-20">
            <LoadingState 
              isUploading={status === 'uploading'} 
              customMessage={
                status === 'dispatching' 
                  ? 'Executing n8n Webhook...' 
                  : 'Mirroring PDF to Cloud Storage...'
              }
            />
          </div>
        ) : (
          <InputSection 
            inputs={inputs}
            onFileChange={(e) => setInputs(prev => ({ ...prev, resume: e.target.files?.[0] || null }))}
            onUrlChange={(field, value) => setInputs(prev => ({ ...prev, [field]: value }))}
            onAnalyze={handleSubmit}
            onRetry={handleSubmit}
            error={errorMessage}
            errorStage={status === 'error' ? 'upload' : null}
          />
        )}
      </main>
      
      <footer className="py-16 border-t border-slate-100 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Pipeline Health: 100%</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest mt-6 md:mt-0">v2.1.0 // n8n Node Ready</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
