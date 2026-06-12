# PDF Summarizer

A full-stack web application for uploading PDF documents and generating summaries. The project includes a React frontend, an Express/Node backend, a Python-based summarization service, and MongoDB storage.

## Features

- User registration and login
- PDF upload and summary generation
- History of previous summaries
- Profile access and basic authentication flow

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- AI service: Python, NLTK, pytesseract, pdf2image, slate3k

## Project Structure

- frontend/ - React client application
- backend/ - Express API server
- ai_service/ - Python summarization scripts and dependencies

## Prerequisites

Before running the project locally, make sure you have:

- Node.js and npm installed
- Python 3 installed
- MongoDB Atlas connection string
- Tesseract OCR installed if OCR-based extraction is needed

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder with the following values:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   PYTHON_PATH=python3
   ```

4. Start the backend:
   ```bash
   npm start
   ```

## Python Dependency Setup

Install the required Python packages:

```bash
cd ai_service
python -m pip install -r requirements.txt
```

If you plan to use OCR-related features, install Tesseract OCR separately and ensure it is available in your system PATH.

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

The frontend will run locally and communicate with the backend at the configured API URL.

## API Configuration

The frontend currently uses a hardcoded backend URL in the service files. For local development, this is typically:

```text
http://localhost:5000/api
```

For deployment, update the API base URL in the frontend service files to point to your deployed backend.

## Deployment Notes

A simple deployment approach is:

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

Make sure to set the same environment variables in your hosting platform for the backend.

## Notes

- Uploaded PDF files are handled by the backend and may require persistent storage in production.
- For production deployments, consider storing uploaded files in cloud storage instead of local disk.
