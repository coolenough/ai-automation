
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';
// Target n8n Webhook (GET)
const N8N_WEBHOOK_URL = 'https://ashish33332.app.n8n.cloud/webhook-test/a91ceb5d-9a1c-476a-923e-d1928755511f'; 

export interface UploadResponse {
  url: string;
  path: string;
  error?: string;
}

const handleRequestError = (error: any, context: string) => {
  if (error.code === 'ERR_NETWORK') {
    throw new Error(`${context}: Network connection failed. If this is the local backend, ensure 'python app.py' is running.`);
  }
  const message = error.response?.data?.error || error.message || `An error occurred in the ${context.toLowerCase()} stage.`;
  console.error(`[Service] ${context} Error:`, message);
  throw new Error(message);
};

export async function uploadToCloud(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000,
    });
    return response.data;
  } catch (error: any) {
    throw handleRequestError(error, 'Cloud Upload');
  }
}

/**
 * Dispatches a GET request to n8n with the candidate data as query parameters
 */
export async function sendToWebhook(payload: any): Promise<any> {
  try {
    const response = await axios.get(N8N_WEBHOOK_URL, {
      params: payload,
      timeout: 15000,
    });
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error(`n8n Connection Failed: Ensure your n8n workflow is currently 'Listening' or active.`);
    }
    throw handleRequestError(error, 'n8n Dispatch');
  }
}
