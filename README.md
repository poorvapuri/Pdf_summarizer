# PDF Summarizer

A web application that extracts text from PDF documents and generates concise summaries. Users can summarize an entire PDF or selected page ranges, making it easier to quickly understand lengthy documents.

## Live Demo

**Live Demo:** https://pdf-summarizer-delta-opal.vercel.app

## Features

* User Authentication (Login & Signup)
* PDF Upload and Validation
* Text Extraction from PDF Files
* OCR Support for Scanned PDFs
* Multiple Summary Modes (Short, Medium, Detailed)
* Page-Range Based Summarization
* Automatic Heading Generation
* Summary History Tracking
* Email Sharing of Summaries
* Responsive User Interface
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* MongoDB Atlas

### AI Service

* Python
* NLTK
* Tesseract OCR
* pdf2image
* slate3k

### Testing

* Selenium
* TestNG

## How It Works

1. User uploads a PDF document.
2. Text is extracted from the PDF.
3. If text extraction is not possible, OCR is used.
4. The text is cleaned and processed.
5. Important sentences are identified and ranked.
6. A summary is generated based on the selected mode.
7. The summary is displayed and saved to history.

## Project Structure

```text
PDF_SUMMARIZER
│
├── frontend/
├── backend/
├── ai_service/
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd PDF_SUMMARIZER
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PYTHON_PATH=python3
```

Start the backend:

```bash
npm start
```

### Python Setup

```bash
cd ai_service
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

## Screenshots

### Login Page

*Add screenshot here*

### Dashboard

*Add screenshot here*

### Upload PDF

*Add screenshot here*

### Summary Result

*Add screenshot here*

### History Page

*Add screenshot here*

## Future Enhancements

* Multi-Language Support
* Advanced AI-Based Summarization
* Export Summaries as PDF
* Improved OCR Accuracy
* Keyword-Based Search
