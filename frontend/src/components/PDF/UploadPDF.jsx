// // // // import React, { useState, useRef } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import pdfService from '../../services/pdfService';
// // // // import LoadingSpinner from '../LoadingSpinner';

// // // // // Upload PDF Component
// // // // const UploadPDF = () => {
// // // //   const navigate = useNavigate();
// // // //   const fileInputRef = useRef(null);
  
// // // //   // State
// // // //   const [file, setFile] = useState(null);
// // // //   const [dragOver, setDragOver] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [uploadProgress, setUploadProgress] = useState(0);
// // // //   const [error, setError] = useState('');
// // // //   const [summary, setSummary] = useState(null);

// // // //   // Validate file
// // // //   const validateFile = (selectedFile) => {
// // // //     if (!selectedFile) {
// // // //       setError('Please select a file');
// // // //       return false;
// // // //     }
    
// // // //     // Check file type
// // // //     const validTypes = ['application/pdf'];
// // // //     if (!validTypes.includes(selectedFile.type)) {
// // // //       setError('Please upload a PDF file only');
// // // //       return false;
// // // //     }
    
// // // //     // Check file size (max 10MB)
// // // //     const maxSize = 10 * 1024 * 1024; // 10MB
// // // //     if (selectedFile.size > maxSize) {
// // // //       setError('File size must be less than 10MB');
// // // //       return false;
// // // //     }
    
// // // //     return true;
// // // //   };

// // // //   // Handle file selection
// // // //   const handleFileSelect = (selectedFile) => {
// // // //     setError('');
// // // //     setSummary(null);
// // // //     setUploadProgress(0);
    
// // // //     if (validateFile(selectedFile)) {
// // // //       setFile(selectedFile);
// // // //     } else {
// // // //       setFile(null);
// // // //     }
// // // //   };

// // // //   // Handle input change
// // // //   const handleInputChange = (e) => {
// // // //     const selectedFile = e.target.files[0];
// // // //     handleFileSelect(selectedFile);
// // // //   };

// // // //   // Handle drag events
// // // //   const handleDragOver = (e) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setDragOver(true);
// // // //   };

// // // //   const handleDragLeave = (e) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setDragOver(false);
// // // //   };

// // // //   const handleDrop = (e) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setDragOver(false);
    
// // // //     const droppedFile = e.dataTransfer.files[0];
// // // //     handleFileSelect(droppedFile);
// // // //   };

// // // //   // Handle click on upload zone
// // // //   const handleZoneClick = () => {
// // // //     if (!loading) {
// // // //       fileInputRef.current?.click();
// // // //     }
// // // //   };

// // // //   // Remove selected file
// // // //   const removeFile = (e) => {
// // // //     e.stopPropagation();
// // // //     setFile(null);
// // // //     setSummary(null);
// // // //     setError('');
// // // //     setUploadProgress(0);
// // // //     if (fileInputRef.current) {
// // // //       fileInputRef.current.value = '';
// // // //     }
// // // //   };

// // // //   // Format file size
// // // //   const formatFileSize = (bytes) => {
// // // //     if (bytes === 0) return '0 Bytes';
// // // //     const k = 1024;
// // // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // // //   };

// // // //   // Handle upload and summarize
// // // //   const handleUpload = async () => {
// // // //     if (!file) {
// // // //       setError('Please select a PDF file first');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');
// // // //     setUploadProgress(0);

// // // //     try {
// // // //       const result = await pdfService.uploadPDF(file, (progressEvent) => {
// // // //         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// // // //         setUploadProgress(progress);
// // // //       });
      
// // // //       if (result.success) {
// // // //         setSummary(result.data);
// // // //       } else {
// // // //         setError(result.error);
// // // //       }
// // // //     } catch (err) {
// // // //       setError('Failed to process the PDF. Please try again.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //       setUploadProgress(0);
// // // //     }
// // // //   };

// // // //   // Download summary as text file
// // // //   const downloadSummary = () => {
// // // //     if (!summary) return;
    
// // // //     const text = typeof summary === 'string' 
// // // //       ? summary 
// // // //       : summary.summary || summary.content || summary.text || JSON.stringify(summary, null, 2);
    
// // // //     const blob = new Blob([text], { type: 'text/plain' });
// // // //     const url = URL.createObjectURL(blob);
// // // //     const a = document.createElement('a');
// // // //     a.href = url;
// // // //     a.download = `summary-${file?.name?.replace('.pdf', '') || 'document'}.txt`;
// // // //     document.body.appendChild(a);
// // // //     a.click();
// // // //     document.body.removeChild(a);
// // // //     URL.revokeObjectURL(url);
// // // //   };

// // // //   // Copy summary to clipboard
// // // //   const copySummary = async () => {
// // // //     if (!summary) return;
    
// // // //     const text = typeof summary === 'string' 
// // // //       ? summary 
// // // //       : summary.summary || summary.content || summary.text || JSON.stringify(summary, null, 2);
    
// // // //     try {
// // // //       await navigator.clipboard.writeText(text);
// // // //       // Show temporary success feedback
// // // //       const btn = document.querySelector('.copy-btn');
// // // //       if (btn) {
// // // //         const originalText = btn.innerHTML;
// // // //         btn.innerHTML = '✓ Copied!';
// // // //         setTimeout(() => {
// // // //           btn.innerHTML = originalText;
// // // //         }, 2000);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Failed to copy:', err);
// // // //       setError('Failed to copy to clipboard');
// // // //     }
// // // //   };

// // // //   // Reset for new upload
// // // //   const resetUpload = () => {
// // // //     setFile(null);
// // // //     setSummary(null);
// // // //     setError('');
// // // //     setUploadProgress(0);
// // // //     if (fileInputRef.current) {
// // // //       fileInputRef.current.value = '';
// // // //     }
// // // //   };

// // // //   // Get summary text
// // // //   const getSummaryText = () => {
// // // //     if (!summary) return '';
// // // //     return typeof summary === 'string' 
// // // //       ? summary 
// // // //       : summary.summary || summary.content || summary.text || JSON.stringify(summary, null, 2);
// // // //   };

// // // //   return (
// // // //     <div className="upload-page page-container">
// // // //       {/* Loading Overlay */}
// // // //       {loading && (
// // // //         <LoadingSpinner 
// // // //           text={uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : "Analyzing your PDF with AI"} 
// // // //         />
// // // //       )}

// // // //       {/* Page Header */}
// // // //       <div className="page-header">
// // // //         <h1 className="page-title">📤 Upload PDF</h1>
// // // //         <p className="page-description">
// // // //           Upload a PDF document and get an AI-powered summary in seconds
// // // //         </p>
// // // //       </div>

// // // //       {/* Error Message */}
// // // //       {error && (
// // // //         <div className="form-error mb-lg">
// // // //           <span className="error-icon">⚠️</span>
// // // //           <span>{error}</span>
// // // //         </div>
// // // //       )}

// // // //       {/* Upload Zone - Show when no summary */}
// // // //       {!summary && (
// // // //         <>
// // // //           <div 
// // // //             className={`upload-zone ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
// // // //             onClick={handleZoneClick}
// // // //             onDragOver={handleDragOver}
// // // //             onDragLeave={handleDragLeave}
// // // //             onDrop={handleDrop}
// // // //             role="button"
// // // //             tabIndex={0}
// // // //             onKeyPress={(e) => e.key === 'Enter' && handleZoneClick()}
// // // //           >
// // // //             <input
// // // //               type="file"
// // // //               ref={fileInputRef}
// // // //               className="upload-input"
// // // //               accept=".pdf,application/pdf"
// // // //               onChange={handleInputChange}
// // // //               disabled={loading}
// // // //             />
            
// // // //             <div className="upload-icon">{file ? '✅' : '📄'}</div>
            
// // // //             {file ? (
// // // //               <div className="file-selected">
// // // //                 <h3 className="upload-title">File Ready!</h3>
// // // //                 <p className="upload-subtitle">Click "Summarize" to process your PDF</p>
// // // //                 <div className="file-info">
// // // //                   <div className="file-details">
// // // //                     <span className="file-icon">📎</span>
// // // //                     <div className="file-meta">
// // // //                       <span className="file-name">{file.name}</span>
// // // //                       <span className="file-size">{formatFileSize(file.size)}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                   <button 
// // // //                     className="file-remove"
// // // //                     onClick={removeFile}
// // // //                     aria-label="Remove file"
// // // //                     type="button"
// // // //                   >
// // // //                     ✕
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="upload-placeholder">
// // // //                 <h3 className="upload-title">Drop your PDF here</h3>
// // // //                 <p className="upload-subtitle">
// // // //                   or <span className="upload-browse">browse</span> to choose a file
// // // //                 </p>
// // // //                 <p className="upload-hint">
// // // //                   Maximum file size: 10MB
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Upload Button */}
// // // //           <div className="upload-actions">
// // // //             <button 
// // // //               className="btn-upload"
// // // //               onClick={handleUpload}
// // // //               disabled={!file || loading}
// // // //             >
// // // //               {loading ? (
// // // //                 <span className="btn-loading">
// // // //                   <span className="spinner-inline"></span>
// // // //                   <span>Processing...</span>
// // // //                 </span>
// // // //               ) : (
// // // //                 <>
// // // //                   <span>⚡</span>
// // // //                   <span>Summarize PDF</span>
// // // //                 </>
// // // //               )}
// // // //             </button>
// // // //           </div>
// // // //         </>
// // // //       )}

// // // //       {/* Summary Result */}
// // // //       {summary && (
// // // //         <div className="summary-result">
// // // //           <div className="summary-header">
// // // //             <div className="summary-title">
// // // //               <span>✨</span>
// // // //               <span>Summary Generated</span>
// // // //               <span className="summary-badge">Complete</span>
// // // //             </div>
// // // //             <div className="summary-file">
// // // //               <span className="file-icon">📄</span>
// // // //               <span>{file?.name || 'Document'}</span>
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="summary-content">
// // // //             {getSummaryText()}
// // // //           </div>

// // // //           <div className="summary-actions">
// // // //             <button className="btn-secondary" onClick={downloadSummary}>
// // // //               <span>📥</span>
// // // //               <span>Download</span>
// // // //             </button>
// // // //             <button className="btn-secondary copy-btn" onClick={copySummary}>
// // // //               <span>📋</span>
// // // //               <span>Copy</span>
// // // //             </button>
// // // //             <button className="btn-secondary" onClick={() => navigate('/history')}>
// // // //               <span>📋</span>
// // // //               <span>View History</span>
// // // //             </button>
// // // //             <button className="btn-primary-outline" onClick={resetUpload}>
// // // //               <span>🔄</span>
// // // //               <span>New Upload</span>
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UploadPDF;

// // // import React, { useState } from 'react';
// // // import { uploadPDF } from '../../services/pdfService';

// // // const UploadPDF = () => {
// // //   const [file, setFile] = useState(null);
// // //   const [summary, setSummary] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleUpload = async () => {
// // //     if (!file) return setError('Please select a PDF');
// // //     if (file.type !== 'application/pdf') return setError('Only PDF files allowed');

// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       const { data } = await uploadPDF(file);
// // //       setSummary(data.summary);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Upload failed');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const downloadSummary = () => {
// // //     const blob = new Blob([summary], { type: 'text/plain' });
// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement('a');
// // //     a.href = url;
// // //     a.download = 'summary.txt';
// // //     a.click();
// // //   };

// // //   return (
// // //     <div className="page">
// // //       <h1>📤 Upload PDF</h1>

// // //       {error && <div className="error">{error}</div>}

// // //       {!summary ? (
// // //         <>
// // //           <div className="upload-box">
// // //             <input
// // //               type="file"
// // //               accept=".pdf"
// // //               onChange={(e) => setFile(e.target.files[0])}
// // //             />
// // //             {file && <p>Selected: {file.name}</p>}
// // //           </div>

// // //           <button onClick={handleUpload} disabled={loading}>
// // //             {loading ? 'Processing...' : 'Summarize PDF'}
// // //           </button>

// // //           {loading && <div className="spinner"></div>}
// // //         </>
// // //       ) : (
// // //         <div className="summary-box">
// // //           <h3>✨ Summary</h3>
// // //           <p>{summary}</p>
// // //           <div className="actions">
// // //             <button onClick={downloadSummary}>Download</button>
// // //             <button onClick={() => setSummary('')}>New Upload</button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UploadPDF;

// // import React, { useState, useRef } from 'react';
// // import { uploadPDF } from '../../services/pdfService';

// // const UploadPDF = () => {
// //   const [file, setFile] = useState(null);
// //   const [summary, setSummary] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [dragOver, setDragOver] = useState(false);
// //   const inputRef = useRef();

// //   const handleFile = (selectedFile) => {
// //     setError('');
// //     if (!selectedFile) return;
// //     if (selectedFile.type !== 'application/pdf') {
// //       setError('Please upload a PDF file');
// //       return;
// //     }
// //     if (selectedFile.size > 10 * 1024 * 1024) {
// //       setError('File size must be less than 10MB');
// //       return;
// //     }
// //     setFile(selectedFile);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) return setError('Please select a PDF first');
    
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const { data } = await uploadPDF(file);
// //       setSummary(data.summary);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Upload failed. Try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const downloadSummary = () => {
// //     const blob = new Blob([summary], { type: 'text/plain' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `summary-${file?.name || 'document'}.txt`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   const copyToClipboard = async () => {
// //     await navigator.clipboard.writeText(summary);
// //     alert('Copied to clipboard!');
// //   };

// //   const reset = () => {
// //     setFile(null);
// //     setSummary('');
// //     setError('');
// //     if (inputRef.current) inputRef.current.value = '';
// //   };

// //   return (
// //     <div className="page">
// //       <h1>📤 Upload PDF</h1>
// //       <p>Drop your document below to generate an AI-powered summary</p>

// //       {error && <div className="error">{error}</div>}

// //       {loading && (
// //         <div className="loading-overlay">
// //           <div className="spinner"></div>
// //           <div className="loading-text">
// //             Analyzing your PDF
// //             <span className="loading-dots">
// //               <span></span><span></span><span></span>
// //             </span>
// //           </div>
// //         </div>
// //       )}

// //       {!summary ? (
// //         <>
// //           <div 
// //             className={`upload-box ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
// //             onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
// //             onDragLeave={() => setDragOver(false)}
// //             onDrop={(e) => { 
// //               e.preventDefault(); 
// //               setDragOver(false);
// //               handleFile(e.dataTransfer.files[0]);
// //             }}
// //             onClick={() => inputRef.current?.click()}
// //           >
// //             <input
// //               ref={inputRef}
// //               type="file"
// //               accept=".pdf"
// //               onChange={(e) => handleFile(e.target.files[0])}
// //             />
            
// //             <div className="upload-icon">📄</div>
            
// //             {file ? (
// //               <>
// //                 <h3>File Ready!</h3>
// //                 <div className="file-selected">{file.name}</div>
// //               </>
// //             ) : (
// //               <>
// //                 <h3>Drop your PDF here</h3>
// //                 <p>or click to browse</p>
// //                 <label>Choose File</label>
// //               </>
// //             )}
// //           </div>

// //           <div className="mt-3 text-center">
// //             <button onClick={handleUpload} disabled={!file || loading}>
// //               {loading ? (
// //                 <><span className="spinner-inline"></span> Processing...</>
// //               ) : (
// //                 '⚡ Summarize PDF'
// //               )}
// //             </button>
// //           </div>
// //         </>
// //       ) : (
// //         <div className="summary-box">
// //           <div className="summary-header">
// //             <h3>✨ Summary Generated</h3>
// //             <span className="summary-badge">Complete</span>
// //           </div>
// //           <div className="summary-content">{summary}</div>
// //           <div className="actions">
// //             <button onClick={downloadSummary} className="btn-secondary">
// //               📥 Download
// //             </button>
// //             <button onClick={copyToClipboard} className="btn-secondary">
// //               📋 Copy
// //             </button>
// //             <button onClick={reset} className="btn-secondary">
// //               🔄 New Upload
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UploadPDF;

// import React, { useState, useRef } from 'react';
// import { uploadPDF } from '../../services/pdfService';

// function UploadPDF() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dragOver, setDragOver] = useState(false);
//   const inputRef = useRef(null);

//   const handleFile = (selectedFile) => {
//     setError('');
    
//     if (!selectedFile) return;

//     if (selectedFile.type !== 'application/pdf') {
//       setError('Please upload a PDF file');
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a PDF first');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await uploadPDF(file);
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Upload failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadSummary = () => {
//     const blob = new Blob([summary], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `summary-${file?.name || 'document'}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(summary);
//       alert('Copied to clipboard!');
//     } catch (err) {
//       console.error('Copy failed:', err);
//     }
//   };

//   const reset = () => {
//     setFile(null);
//     setSummary('');
//     setError('');
//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setDragOver(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const droppedFile = e.dataTransfer.files[0];
//     handleFile(droppedFile);
//   };

//   return (
//     <div className="page">
//       <h1>📤 Upload PDF</h1>
//       <p>Drop your document below to generate an AI-powered summary</p>

//       {error && <div className="error">{error}</div>}

//       {loading && (
//         <div className="loading-overlay">
//           <div className="spinner"></div>
//           <div className="loading-text">
//             Analyzing your PDF
//             <span className="loading-dots">
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//           </div>
//         </div>
//       )}

//       {!summary ? (
//         <div>
//           <div
//             className={`upload-box ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             onClick={() => inputRef.current?.click()}
//           >
//             <input
//               ref={inputRef}
//               type="file"
//               accept=".pdf,application/pdf"
//               onChange={(e) => handleFile(e.target.files[0])}
//               style={{ display: 'none' }}
//             />

//             <div className="upload-icon">📄</div>

//             {file ? (
//               <div>
//                 <h3>File Ready!</h3>
//                 <div className="file-selected">{file.name}</div>
//               </div>
//             ) : (
//               <div>
//                 <h3>Drop your PDF here</h3>
//                 <p>or click to browse</p>
//               </div>
//             )}
//           </div>

//           <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
//             <button onClick={handleUpload} disabled={!file || loading}>
//               {loading ? 'Processing...' : '⚡ Summarize PDF'}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="summary-box">
//           <div className="summary-header">
//             <h3>✨ Summary Generated</h3>
//             <span className="summary-badge">Complete</span>
//           </div>
//           <div className="summary-content">{summary}</div>
//           <div className="actions">
//             <button onClick={downloadSummary} className="btn-secondary">
//               📥 Download
//             </button>
//             <button onClick={copyToClipboard} className="btn-secondary">
//               📋 Copy
//             </button>
//             <button onClick={reset} className="btn-secondary">
//               🔄 New Upload
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadPDF;

import React, { useState, useRef } from 'react';
import { uploadPDF } from '../../services/pdfService';

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File must be less than 10MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadPDF(file);
      setSummary(response.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${file?.name || 'document'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(summary);
    alert('Copied!');
  };

  const reset = () => {
    setFile(null);
    setSummary('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Upload PDF</h1>
        <p>Get an AI-powered summary of your document</p>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">
            Analyzing your PDF
            <span className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      )}

      {!summary ? (
        <>
          <div
            className={`upload-area ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display: 'none' }}
            />

            <div className="icon">📄</div>

            {file ? (
              <>
                <h3>Ready to upload</h3>
                <div className="file-badge">📎 {file.name}</div>
              </>
            ) : (
              <>
                <h3>Drop your PDF here</h3>
                <p>or click to browse files</p>
              </>
            )}
          </div>

          <div className="upload-btn" style={{ textAlign: 'center' }}>
            <button onClick={handleUpload} disabled={!file || loading}>
              ⚡ Summarize PDF
            </button>
          </div>
        </>
      ) : (
        <div className="summary-card">
          <div className="summary-header">
            <h3>✓ Summary Generated</h3>
            <span className="summary-badge">Complete</span>
          </div>
          <div className="summary-content">{summary}</div>
          <div className="summary-actions">
            <button onClick={downloadSummary} className="btn-secondary">
              📥 Download
            </button>
            <button onClick={copyToClipboard} className="btn-secondary">
              📋 Copy
            </button>
            <button onClick={reset} className="btn-secondary">
              🔄 Upload another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPDF;