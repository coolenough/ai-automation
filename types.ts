
export interface SubmissionData {
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  timestamp: string;
}

export interface ProfileInputs {
  resume: File | null;
  linkedinUrl: string;
  githubUrl: string;
}
