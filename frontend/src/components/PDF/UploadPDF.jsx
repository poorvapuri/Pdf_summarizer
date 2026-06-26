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

// import React, { useState, useRef } from 'react';
// import { uploadPDF } from '../../services/pdfService';

// function UploadPDF() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dragOver, setDragOver] = useState(false);
//   const inputRef = useRef(null);
//   const [summaryType, setSummaryType] = useState("medium");


//   const handleFile = (selectedFile) => {
//     setError('');
//     if (!selectedFile) return;

//     if (selectedFile.type !== 'application/pdf') {
//       setError('Please upload a PDF file');
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setError('File must be less than 10MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a PDF');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await uploadPDF(file, summaryType);
//       setSummary(response.summary);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Upload failed');
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
//     await navigator.clipboard.writeText(summary);
//     alert('Copied!');
//   };

//   const reset = () => {
//     setFile(null);
//     setSummary('');
//     setError('');
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <h1>Upload PDF</h1>
//         <p>Get an AI-powered summary of your document</p>
//       </div>

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
//         <>
//           <div
//             className={`upload-area ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
//             onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//             onDragLeave={() => setDragOver(false)}
//             onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
//             onClick={() => inputRef.current?.click()}
//           >
//             <input
//               ref={inputRef}
//               type="file"
//               accept=".pdf"
//               onChange={(e) => handleFile(e.target.files[0])}
//               style={{ display: 'none' }}
//             />

//             <div className="icon">📄</div>

//             {file ? (
//               <>
//                 <h3>Ready to upload</h3>
//                 <div className="file-badge">📎 {file.name}</div>
//               </>
//             ) : (
//               <>
//                 <h3>Drop your PDF here</h3>
//                 <p>or click to browse files</p>
//               </>
//             )}
//           </div>

//           <div className="summary-type" style={{ textAlign: "center", marginBottom: "16px" }}>
//   <label style={{ marginRight: "8px", fontWeight: "500" }}>
//     Summary Type:
//   </label>
//   <select
//     value={summaryType}
//     onChange={(e) => setSummaryType(e.target.value)}
//   >
//     <option value="short">Short (5–6 lines)</option>
//     <option value="medium">Medium (1–2 paragraphs)</option>
//     <option value="detailed">Detailed (section-wise)</option>
//   </select>
// </div>


//           <div className="upload-btn" style={{ textAlign: 'center' }}>
//             <button onClick={handleUpload} disabled={!file || loading}>
//               ⚡ Summarize PDF
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="summary-card">
//           <div className="summary-header">
//             <h3>✓ Summary Generated</h3>
//             <span className="summary-badge">Complete</span>
//           </div>
//           <div className="summary-content">{summary}</div>
//           <div className="summary-actions">
//             <button onClick={downloadSummary} className="btn-secondary">
//               📥 Download
//             </button>
//             <button onClick={copyToClipboard} className="btn-secondary">
//               📋 Copy
//             </button>
//             <button onClick={reset} className="btn-secondary">
//               🔄 Upload another
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadPDF;



// import React, { useState, useRef } from 'react';
// import { uploadPDF } from '../../services/pdfService';
// import './UploadPDF.css';

// function UploadPDF() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dragOver, setDragOver] = useState(false);
//   const [summaryType, setSummaryType] = useState("medium");

//   const inputRef = useRef(null);

//   const handleFile = (selectedFile) => {
//     setError('');
//     if (!selectedFile) return;

//     if (selectedFile.type !== 'application/pdf') {
//       setError('Please upload a PDF file');
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setError('File must be less than 10MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a PDF');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await uploadPDF(file, summaryType);
//       setSummary(response.summary);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Upload failed');
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
//     await navigator.clipboard.writeText(summary);
//     alert('Copied!');
//   };

//   const reset = () => {
//     setFile(null);
//     setSummary('');
//     setError('');
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <h1>Upload PDF</h1>
//         <p>Get an AI-powered summary of your document</p>
//       </div>

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
//         <>
//           {/* Upload Area */}
//           <div
//             className={`upload-area ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setDragOver(true);
//             }}
//             onDragLeave={() => setDragOver(false)}
//             onDrop={(e) => {
//               e.preventDefault();
//               setDragOver(false);
//               handleFile(e.dataTransfer.files[0]);
//             }}
//             onClick={() => inputRef.current?.click()}
//           >
//             <input
//               ref={inputRef}
//               type="file"
//               accept=".pdf"
//               onChange={(e) => handleFile(e.target.files[0])}
//               style={{ display: 'none' }}
//             />

//             <div className="icon">📄</div>

//             {file ? (
//               <>
//                 <h3>Ready to upload</h3>
//                 <div className="file-badge">📎 {file.name}</div>
//               </>
//             ) : (
//               <>
//                 <h3>Drop your PDF here</h3>
//                 <p>or click to browse files</p>
//               </>
//             )}
//           </div>

//           {/* Summary Type */}
//           <div className="summary-type">
//             <label>Summary Type</label>
//             <select
//               value={summaryType}
//               onChange={(e) => setSummaryType(e.target.value)}
//             >
//               <option value="short">Short (5–6 lines)</option>
//               <option value="medium">Medium (1–2 paragraphs)</option>
//               <option value="detailed">Detailed (section-wise)</option>
//             </select>
//           </div>

//           {/* Upload Button */}
//           <div className="upload-btn" style={{ textAlign: 'center' }}>
//             <button onClick={handleUpload} disabled={!file || loading}>
//               ⚡ Summarize PDF
//             </button>
//           </div>
//         </>
//       ) : (
//         /* Summary Result */
//         <div className="summary-card">
//           <div className="summary-header">
//             <h3>✓ Summary Generated</h3>
//             <span className="summary-badge">Complete</span>
//           </div>

//           <div className="summary-content">{summary}</div>

//           <div className="summary-actions">
//             <button onClick={downloadSummary} className="btn-secondary">
//               📥 Download
//             </button>
//             <button onClick={copyToClipboard} className="btn-secondary">
//               📋 Copy
//             </button>
//             <button onClick={reset} className="btn-secondary">
//               🔄 Upload another
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadPDF;



// import React, { useState, useRef } from 'react';
// import { uploadPDF } from '../../services/pdfService';
// import './UploadPDF.css';

// function UploadPDF() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dragOver, setDragOver] = useState(false);

//   const [summaryType, setSummaryType] = useState("medium");

//   // 🔹 NEW: Page range states
//   const [startPage, setStartPage] = useState('');
//   const [endPage, setEndPage] = useState('');

//   const inputRef = useRef(null);

//   const handleFile = (selectedFile) => {
//     setError('');
//     if (!selectedFile) return;

//     if (selectedFile.type !== 'application/pdf') {
//       setError('Please upload a PDF file');
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setError('File must be less than 10MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a PDF');
//       return;
//     }

//     // 🔹 Page validation (optional feature)
//     if (startPage || endPage) {
//       const s = Number(startPage);
//       const e = Number(endPage);

//       if (!s || !e || s < 1 || e < 1) {
//         setError('Page numbers must be greater than 0');
//         return;
//       }

//       if (s > e) {
//         setError('Start page cannot be greater than end page');
//         return;
//       }
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await uploadPDF(
//         file,
//         summaryType,
//         startPage || null,
//         endPage || null
//       );
//       setSummary(response.summary);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Upload failed');
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
//     await navigator.clipboard.writeText(summary);
//     alert('Copied!');
//   };

//   const reset = () => {
//     setFile(null);
//     setSummary('');
//     setError('');
//     setStartPage('');
//     setEndPage('');
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <h1>Upload PDF</h1>
//         <p>Get an AI-powered summary of your document</p>
//       </div>

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
//         <>
//           {/* Upload Area */}
//           <div
//             className={`upload-area ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setDragOver(true);
//             }}
//             onDragLeave={() => setDragOver(false)}
//             onDrop={(e) => {
//               e.preventDefault();
//               setDragOver(false);
//               handleFile(e.dataTransfer.files[0]);
//             }}
//             onClick={() => inputRef.current?.click()}
//           >
//             <input
//               ref={inputRef}
//               type="file"
//               accept=".pdf"
//               onChange={(e) => handleFile(e.target.files[0])}
//               style={{ display: 'none' }}
//             />

//             <div className="icon">📄</div>

//             {file ? (
//               <>
//                 <h3>Ready to upload</h3>
//                 <div className="file-badge">📎 {file.name}</div>
//               </>
//             ) : (
//               <>
//                 <h3>Drop your PDF here</h3>
//                 <p>or click to browse files</p>
//               </>
//             )}
//           </div>

//           {/* 🔹 Page Range */}
//           <div className="page-range">
//             <label>Summarize specific pages (optional)</label>
//             <div className="page-range-inputs">
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="Start page (e.g. 2)"
//                 value={startPage}
//                 onChange={(e) => setStartPage(e.target.value)}
//               />
//               <span>to</span>
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="End page (e.g. 4)"
//                 value={endPage}
//                 onChange={(e) => setEndPage(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Summary Type */}
//           <div className="summary-type">
//             <label>Summary Type</label>
//             <select
//               value={summaryType}
//               onChange={(e) => setSummaryType(e.target.value)}
//             >
//               <option value="short">Short (5–6 lines)</option>
//               <option value="medium">Medium (1–2 paragraphs)</option>
//               <option value="detailed">Detailed (section-wise)</option>
//             </select>
//           </div>

//           {/* Upload Button */}
//           <div className="upload-btn" style={{ textAlign: 'center' }}>
//             <button onClick={handleUpload} disabled={!file || loading}>
//               ⚡ Summarize PDF
//             </button>
//           </div>
//         </>
//       ) : (
//         /* Summary Result */
//         <div className="summary-card">
//           <div className="summary-header">
//             <h3>✓ Summary Generated</h3>
//             <span className="summary-badge">Complete</span>
//           </div>

//           <div className="summary-content">{summary}</div>

//           <div className="summary-actions">
//             <button onClick={downloadSummary} className="btn-secondary">
//               📥 Download
//             </button>
//             <button onClick={copyToClipboard} className="btn-secondary">
//               📋 Copy
//             </button>
//             <button onClick={reset} className="btn-secondary">
//               🔄 Upload another
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadPDF;




import React, { useState, useRef, useEffect } from 'react';
import { uploadPDF } from '../../services/pdfService';
import * as pdfjsLib from 'pdfjs-dist';
import speechService from '../../services/speechService';
import './UploadPDF.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [headings, setHeadings] = useState([]);
  const [selectedHeading, setSelectedHeading] = useState('');
  const [summaryId, setSummaryId] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const [summaryType, setSummaryType] = useState('medium');
  const [suggestion, setSuggestion] = useState('');

  // 🔹 Page range (optional)
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');

  const inputRef = useRef(null);

  // --- Speech Synthesis State & Callbacks ---
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (speechService.isSupported()) {
      speechService.getVoices().then((availableVoices) => {
        setVoices(availableVoices);
        const defaultVoice = availableVoices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
                             availableVoices.find(v => v.lang.startsWith('en')) ||
                             availableVoices[0];
        if (defaultVoice) {
          setSelectedVoiceName(defaultVoice.name);
        }
      });
    }
    return () => {
      speechService.stop();
    };
  }, []);

  // Stop speech if summary or active heading changes
  useEffect(() => {
    handleStopSpeech();
  }, [summary, selectedHeading]);

  const handlePlayPauseSpeech = () => {
    if (!speechService.isSupported()) return;

    if (isSpeaking) {
      if (isPaused) {
        speechService.resume();
        setIsPaused(false);
      } else {
        speechService.pause();
        setIsPaused(true);
      }
    } else {
      setIsSpeaking(true);
      setIsPaused(false);
      speechService.speak(summary, {
        voiceName: selectedVoiceName,
        rate: speechRate,
        onEnd: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      });
    }
  };

  const handleStopSpeech = () => {
    speechService.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedVoiceName(voiceName);
    if (isSpeaking && !isPaused) {
      speechService.speak(summary, {
        voiceName: voiceName,
        rate: speechRate,
        onEnd: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      });
    }
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    setSpeechRate(rate);
    if (isSpeaking && !isPaused) {
      speechService.speak(summary, {
        voiceName: selectedVoiceName,
        rate: rate,
        onEnd: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      });
    }
  };
  // ------------------------------------------

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
    calculateWordCount(selectedFile);
  };

  const calculateWordCount = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      const words = fullText.trim().split(/\s+/).filter(word => word.length > 0);
      const count = words.length;
      
      let sugg = '';
      if (count < 100) {
        sugg = 'Short';
      } else if (count <= 300) {
        sugg = 'Medium';
      } else {
        sugg = 'Detailed';
      }
      setSuggestion(sugg);
    } catch (err) {
      console.error("Error reading PDF for word count:", err);
      setSuggestion('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF');
      return;
    }

    // 🔹 Page validation
    if (startPage || endPage) {
      const s = Number(startPage);
      const e = Number(endPage);

      if (!s || !e || s < 1 || e < 1) {
        setError('Page numbers must be greater than 0');
        return;
      }

      if (s > e) {
        setError('Start page cannot be greater than end page');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadPDF(
        file,
        summaryType,
        startPage || null,
        endPage || null
      );

      setSummary(response.summary);
      setHeadings(response.headings || []);
      setSummaryId(response._id);
      setSelectedHeading(response.selectedHeading || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadSummary = () => {
    let text = summary;
    if (selectedHeading) {
      text = `${selectedHeading}\n\n${summary}`;
    }
    const blob = new Blob([text], { type: 'text/plain' });
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
    setHeadings([]);
    setSelectedHeading('');
    setSummaryId(null);
    setError('');
    setStartPage('');
    setEndPage('');
    setSuggestion('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSelectHeading = async (heading) => {
    if (!summaryId) return;
    try {
      const { selectHeading } = await import('../../services/pdfService');
      const response = await selectHeading(summaryId, heading);
      setSelectedHeading(response.selectedHeading);
    } catch (err) {
      setError('Failed to select heading');
    }
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
          {/* Upload Area */}
          <div
            className={`upload-area ${dragOver ? 'dragover' : ''} ${
              file ? 'has-file' : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
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

          {/* 🔹 Page Range (OUTSIDE upload-area) */}
          <div className="page-range">
            <label>Summarize specific pages (optional)</label>

            <div className="page-range-inputs">
              <input
                type="number"
                min="1"
                placeholder="From"
                value={startPage}
                onChange={(e) => setStartPage(e.target.value)}
              />

              <span className="page-separator">to</span>

              <input
                type="number"
                min="1"
                placeholder="To"
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
              />
            </div>

            <small className="page-hint">
              Leave empty to summarize the full document
            </small>
          </div>

          {/* Summary Type */}
          <div className="summary-type">
            <label>Summary Type</label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
            >
              <option value="short">Short (5–6 lines)</option>
              <option value="medium">Medium (1–2 paragraphs)</option>
              <option value="detailed">Detailed (section-wise)</option>
            </select>
          </div>

          {/* Upload Button */}
          <div className="upload-btn" style={{ textAlign: 'center' }}>
            <button onClick={handleUpload} disabled={!file || loading}>
              ⚡ Summarize PDF {suggestion ? `(Suggestion: ${suggestion})` : ''}
            </button>
          </div>
        </>
      ) : (
        /* Summary Result */
        <div className="summary-card">
          <div className="summary-header">
            <h3>✓ Summary Generated</h3>
            <span className="summary-badge">Complete</span>
          </div>

          {headings && headings.length > 0 && (
            <div className="summary-headings">
              <h4>Suggested Headings:</h4>
              <div className="headings-list">
                {headings.map((h, i) => (
                  <button
                    key={i}
                    className={`heading-pill ${selectedHeading === h ? 'selected' : ''}`}
                    onClick={() => handleSelectHeading(h)}
                    style={{
                      margin: '4px',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: selectedHeading === h ? '2px solid #0056b3' : '1px solid #ccc',
                      backgroundColor: selectedHeading === h ? '#e6f2ff' : '#f8f9fa',
                      cursor: 'pointer',
                      fontWeight: selectedHeading === h ? 'bold' : 'normal'
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="summary-content" style={{ marginTop: '20px' }}>
            {selectedHeading && <h2 style={{ marginBottom: '16px' }}>{selectedHeading}</h2>}
            {summary}
          </div>

          {speechService.isSupported() && (
            <div className="speech-player">
              <div className="speech-controls-main">
                <button 
                  onClick={handlePlayPauseSpeech} 
                  className={`btn-speech-play ${isSpeaking && !isPaused ? 'speaking' : ''}`}
                  title={isSpeaking && !isPaused ? 'Pause' : 'Play summary'}
                >
                  {isSpeaking && !isPaused ? '⏸️ Pause' : '🔊 Play Summary'}
                </button>
                
                <button 
                  onClick={handleStopSpeech} 
                  className="btn-speech-stop" 
                  disabled={!isSpeaking}
                  title="Stop"
                >
                  ⏹️ Stop
                </button>
              </div>

              <div className="speech-settings">
                <div className="speech-setting-item">
                  <label htmlFor="voice-select">Voice:</label>
                  <select 
                    id="voice-select"
                    value={selectedVoiceName} 
                    onChange={handleVoiceChange}
                    className="speech-select"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="speech-setting-item">
                  <label htmlFor="speed-slider">Speed: {speechRate.toFixed(1)}x</label>
                  <input 
                    id="speed-slider"
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    value={speechRate} 
                    onChange={handleRateChange}
                    className="speech-slider"
                  />
                </div>
              </div>
            </div>
          )}

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
