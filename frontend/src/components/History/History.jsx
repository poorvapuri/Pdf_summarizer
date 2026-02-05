// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import historyService from '../../services/historyService';
// import LoadingSpinner from '../LoadingSpinner';

// // History Page Component
// const History = () => {
//   const navigate = useNavigate();
  
//   // State
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [expandedIds, setExpandedIds] = useState([]);
//   const [deletingId, setDeletingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch history on mount
//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   // Fetch history from API
//   const fetchHistory = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const result = await historyService.getHistory();
      
//       if (result.success) {
//         const historyData = result.data.history || result.data || [];
//         // Sort by date (newest first)
//         const sorted = historyData.sort((a, b) => {
//           return new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp);
//         });
//         setHistory(sorted);
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to fetch history. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a history item
//   const handleDelete = async (id, e) => {
//     e.stopPropagation();
    
//     if (!window.confirm('Are you sure you want to delete this summary?')) {
//       return;
//     }

//     setDeletingId(id);

//     try {
//       const result = await historyService.deleteHistory(id);
      
//       if (result.success) {
//         setHistory(prev => prev.filter(item => (item._id || item.id) !== id));
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to delete. Please try again.');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // Toggle expand/collapse summary
//   const toggleExpand = (id, e) => {
//     e.stopPropagation();
//     setExpandedIds(prev => 
//       prev.includes(id) 
//         ? prev.filter(i => i !== id)
//         : [...prev, id]
//     );
//   };

//   // Download summary
//   const downloadSummary = (item, e) => {
//     e.stopPropagation();
//     const text = item.summary || item.content || '';
//     const blob = new Blob([text], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `summary-${item.filename || item.fileName || 'document'}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Filter history by search term
//   const filteredHistory = history.filter(item => {
//     const filename = (item.filename || item.fileName || '').toLowerCase();
//     const summary = (item.summary || item.content || '').toLowerCase();
//     const search = searchTerm.toLowerCase();
//     return filename.includes(search) || summary.includes(search);
//   });

//   // View summary detail
//   const viewSummary = (id) => {
//     navigate(`/summary/${id}`);
//   };

//   // Loading state
//   if (loading) {
//     return <LoadingSpinner text="Loading your history" />;
//   }

//   return (
//     <div className="history-page page-container">
//       {/* Page Header */}
//       <div className="page-header">
//         <div className="page-header-content">
//           <div>
//             <h1 className="page-title">📋 Summary History</h1>
//             <p className="page-description">
//               View and manage your previous PDF summaries
//             </p>
//           </div>
//           {history.length > 0 && (
//             <div className="history-stats">
//               <span className="history-count">{history.length} summaries</span>
//             </div>
//           )}
//         </div>
        
//         {/* Search Bar */}
//         {history.length > 0 && (
//           <div className="search-bar">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="Search summaries..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             {searchTerm && (
//               <button 
//                 className="search-clear"
//                 onClick={() => setSearchTerm('')}
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="form-error mb-lg">
//           <span className="error-icon">⚠️</span>
//           <span>{error}</span>
//           <button 
//             className="btn-text" 
//             onClick={fetchHistory}
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* History List */}
//       {filteredHistory.length > 0 ? (
//         <div className="history-grid">
//           {filteredHistory.map((item, index) => {
//             const id = item._id || item.id || index;
//             const isExpanded = expandedIds.includes(id);
//             const isDeleting = deletingId === id;
//             const summaryText = item.summary || item.content || 'No summary available';
            
//             return (
//               <div 
//                 key={id} 
//                 className={`history-card ${isExpanded ? 'expanded' : ''}`}
//                 style={{ animationDelay: `${index * 0.05}s` }}
//                 onClick={() => viewSummary(id)}
//               >
//                 {/* Card Header */}
//                 <div className="history-card-header">
//                   <div className="history-file-info">
//                     <div className="history-file-icon">📄</div>
//                     <div className="history-file-details">
//                       <div className="history-file-name">
//                         {item.filename || item.fileName || 'Untitled Document'}
//                       </div>
//                       <div className="history-timestamp">
//                         {formatDate(item.createdAt || item.timestamp)}
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="history-actions">
//                     <button 
//                       className="btn-icon"
//                       onClick={(e) => downloadSummary(item, e)}
//                       title="Download"
//                     >
//                       📥
//                     </button>
//                     <button 
//                       className="btn-icon danger"
//                       onClick={(e) => handleDelete(id, e)}
//                       disabled={isDeleting}
//                       title="Delete"
//                     >
//                       {isDeleting ? (
//                         <span className="spinner-inline"></span>
//                       ) : (
//                         '🗑️'
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Summary Preview */}
//                 <div className={`history-summary ${isExpanded ? 'expanded' : ''}`}>
//                   {summaryText}
//                 </div>

//                 {/* Expand/Collapse Button */}
//                 {summaryText.length > 200 && (
//                   <button 
//                     className="history-expand"
//                     onClick={(e) => toggleExpand(id, e)}
//                   >
//                     {isExpanded ? (
//                       <>Show Less <span>↑</span></>
//                     ) : (
//                       <>Show More <span>↓</span></>
//                     )}
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : history.length > 0 && searchTerm ? (
//         /* No Search Results */
//         <div className="empty-state">
//           <div className="empty-icon">🔍</div>
//           <h3 className="empty-title">No results found</h3>
//           <p className="empty-description">
//             No summaries match your search term "{searchTerm}"
//           </p>
//           <button 
//             className="btn-secondary"
//             onClick={() => setSearchTerm('')}
//           >
//             Clear Search
//           </button>
//         </div>
//       ) : (
//         /* Empty State */
//         <div className="empty-state">
//           <div className="empty-icon">📭</div>
//           <h3 className="empty-title">No summaries yet</h3>
//           <p className="empty-description">
//             Upload your first PDF to get started with AI-powered summarization
//           </p>
//           <button 
//             className="btn-primary"
//             onClick={() => navigate('/upload')}
//           >
//             📤 Upload PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;

import React, { useState, useEffect } from 'react';
import { getHistory, deleteHistory } from '../../services/historyService';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await getHistory();
      setHistory(data.history || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this summary?')) return;
    try {
      await deleteHistory(id);
      setHistory(history.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="page"><div className="spinner"></div></div>;

  return (
    <div className="page">
      <h1>📋 History</h1>

      {history.length === 0 ? (
        <p>No summaries yet</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-item">
              <div>
                <strong>{item.filename}</strong>
                <small>{new Date(item.createdAt).toLocaleDateString()}</small>
              </div>
              <p>{item.summary?.substring(0, 150)}...</p>
              <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;