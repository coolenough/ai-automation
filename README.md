# 🤖 AI Automation

AI Automation is a full-stack project focused on building **AI-powered automation workflows** with a modern web interface and backend services.  
The project uses **Supabase** for **storing, retrieving, and managing databases**, and is designed to be extensible and production-ready.

---

## 🚀 Overview

This repository provides a foundation for creating AI-driven automation systems where:
- Users interact through a web UI
- Automation logic is handled by a backend service
- All persistent data is stored and retrieved using **Supabase**

Supabase acts as the backend infrastructure, providing a PostgreSQL database and authentication capabilities.

---

## ✨ Features

- 🤖 AI-powered automation pipelines  
- 🖥️ Modern frontend built with React, Vite, and TypeScript  
- 🧠 Python backend for handling automation logic  
- 🗄️ Supabase integration for:
  - Database storage  
  - Data retrieval  
  - Secure backend communication  
- ⚡ Fast local development setup  
- 📽️ Demo screencast included in the repository  

---

## 🧱 Tech Stack

### Frontend
- React  
- TypeScript  
- Vite  

### Backend
- Python  

### Database & Backend Services
- **Supabase**
  - PostgreSQL database
  - Data storage and retrieval
  - Authentication support (extendable)

---

## 📁 Project Structure

```text
ai-automation/
├── .vite/                  # Vite cache and build artifacts
├── components/             # Reusable UI components
├── services/               # API and service logic
├── templates/              # UI templates
├── App.tsx                 # Main React application
├── index.tsx               # React entry point
├── index.html              # Root HTML file
├── app.py                  # Backend server
├── metadata.json           # Project metadata
├── pipeline.json           # Automation pipeline configuration
├── package.json            # Frontend dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── Screencast_*.webm       # Demo video
└── README.md               # Project documentation

Supabase Usage
This project uses Supabase as the main backend service for:
📦 Storing application and automation data
🔄 Retrieving data for frontend display and backend processing
🔐 Managing secure access and authentication (optional)
Supabase provides a scalable PostgreSQL database and simplifies backend development by handling infrastructure concerns.

🛠️ Installation
Prerequisites
Node.js ≥ 16
Python ≥ 3.8
Supabase project credentials (URL and Service_role Key)
Clone the Repository
Copy code
Bash
git clone https://github.com/coolenough/ai-automation.git
cd ai-automation
Frontend Setup
Copy code
Bash
npm install
npm run dev
Backend Setup
Copy code
Bash
python -m venv venv
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows

pip install -r requirements.txt
python app.py
🔐 Environment Variables
Create a .env file in the project root:
Copy code
Env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
These values are used to connect the application to Supabase for database storage and retrieval.
▶️ Running the Project
Start the backend server:
Copy code
Bash
python app.py
Start the frontend development server:
Copy code
Bash
npm run dev
Open your browser and navigate to:
Copy code

http://localhost:3000
📦 Usage
Define automation workflows in pipeline.json
Execute automation logic through the backend
Store and retrieve workflow data using Supabase
Extend the system with additional AI models or automation steps
📸 Demo
A screencast (.webm) file is included in the repository demonstrating:
Application UI
Automation workflow execution
Backend and database interaction