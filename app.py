
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Attempt to import supabase dependencies
try:
    from supabase import create_client, Client
except ImportError:
    print("\n" + "!"*60)
    print("CRITICAL: Missing 'supabase' dependency.")
    print("Run: pip install supabase")
    print("!"*60 + "\n")

app = Flask(__name__)
CORS(app)

# Supabase Credentials
SUPABASE_URL = "https://iqcxemcvdcirbhmkgzhc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxY3hlbWN2ZGNpcmJobWtnemhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTkzNDQ2MywiZXhwIjoyMDg1NTEwNDYzfQ.DQLJqtVzcyXTXBwsWDTNPajoqodFaGckBuwGVbRVMDo"
BUCKET_NAME = "profiles" # This must match exactly what is in your Supabase dashboard

def get_supabase_client():
    """Initializes the Supabase client."""
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"ERROR: Failed to initialize Supabase client: {e}")
        raise e

@app.route('/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
    
    try:
        supabase = get_supabase_client()
        file_content = file.read()
        
        # Clean the filename
        clean_name = "".join([c for c in file.filename if c.isalnum() or c in "._-"]).strip()
        file_path = f"resumes/{clean_name}"
        
        print(f"DEBUG: Checking bucket '{BUCKET_NAME}'...")
        
        # --- DIAGNOSTIC: Check if bucket exists ---
        try:
            buckets = supabase.storage.list_buckets()
            bucket_names = [b.name for b in buckets]
            print(f"DEBUG: Found buckets in project: {bucket_names}")
            
            if BUCKET_NAME not in bucket_names:
                print(f"CRITICAL: The bucket '{BUCKET_NAME}' was NOT found in your project.")
                return jsonify({
                    "error": f"Bucket '{BUCKET_NAME}' not found. Available buckets: {bucket_names}",
                    "diagnostic": "Please ensure you have created a bucket named 'profiles' in the Supabase Storage dashboard and it is set to 'Public'."
                }), 404
        except Exception as bucket_err:
            print(f"WARNING: Could not list buckets (check API permissions): {bucket_err}")

        # --- UPLOAD ---
        print(f"DEBUG: Uploading to path: {file_path}")
        
        # Explicitly call from_ with the bucket name
        res = supabase.storage.from_(BUCKET_NAME).upload(
            path=file_path,
            file=file_content,
            file_options={"content-type": "application/pdf", "x-upsert": "true"}
        )
        
        # Generate URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(file_path)
        print(f"SUCCESS: File uploaded to {public_url}")
        
        return jsonify({
            "url": public_url,
            "path": file_path,
            "message": "Upload successful"
        }), 200
        
    except Exception as e:
        error_msg = str(e)
        print(f"CRITICAL BACKEND ERROR: {error_msg}")
        
        # Check for the specific 'proxy' bug again just in case
        if "proxy" in error_msg:
            return jsonify({"error": "Supabase Library Conflict. Run: pip install --upgrade supabase storage3"}), 500
            
        return jsonify({"error": f"Upload Failed: {error_msg}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online"}), 200

if __name__ == '__main__':
    print("\n" + "="*50)
    print(" C360 DIAGNOSTIC BACKEND RUNNING ")
    print("="*50)
    print(f"Monitoring bucket: {BUCKET_NAME}")
    print("Target Webhook: n8n Dispatcher Active")
    print("="*50 + "\n")
    app.run(port=5000, debug=True)
