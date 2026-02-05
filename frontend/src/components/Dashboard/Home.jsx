// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import historyService from '../../services/historyService';

// // Dashboard Home Component
// const Home = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalSummaries: 0,
//     thisMonth: 0,
//     thisWeek: 0
//   });
//   const [recentSummaries, setRecentSummaries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch stats on mount
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const result = await historyService.getHistory();
//         if (result.success) {
//           const history = result.data.history || result.data || [];
//           const now = new Date();
          
//           // Calculate this month
//           const thisMonth = history.filter(item => {
//             const itemDate = new Date(item.createdAt || item.timestamp);
//             return itemDate.getMonth() === now.getMonth() && 
//                    itemDate.getFullYear() === now.getFullYear();
//           });
          
//           // Calculate this week
//           const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//           const thisWeek = history.filter(item => {
//             const itemDate = new Date(item.createdAt || item.timestamp);
//             return itemDate >= oneWeekAgo;
//           });

//           setStats({
//             totalSummaries: history.length,
//             thisMonth: thisMonth.length,
//             thisWeek: thisWeek.length
//           });

//           // Get recent summaries (last 3)
//           const sorted = [...history].sort((a, b) => {
//             return new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp);
//           });
//           setRecentSummaries(sorted.slice(0, 3));
//         }
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Get greeting based on time of day
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="dashboard-page page-container">
//       {/* Header Section */}
//       <div className="dashboard-header">
//         <h1 className="dashboard-welcome">
//           {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
//         </h1>
//         <p className="dashboard-subtitle">
//           Welcome to your PDF Summarizer dashboard. Let's get productive!
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <div className="stat-icon">📊</div>
//           <div className="stat-value">
//             {loading ? '...' : stats.totalSummaries}
//           </div>
//           <div className="stat-label">Total Summaries</div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon">📅</div>
//           <div className="stat-value">
//             {loading ? '...' : stats.thisMonth}
//           </div>
//           <div className="stat-label">This Month</div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon">📆</div>
//           <div className="stat-value">
//             {loading ? '...' : stats.thisWeek}
//           </div>
//           <div className="stat-label">This Week</div>
//         </div>
//       </div>

//       {/* Action Cards */}
//       <div className="dashboard-actions">
//         <div 
//           className="action-card"
//           onClick={() => navigate('/upload')}
//           role="button"
//           tabIndex={0}
//           onKeyPress={(e) => e.key === 'Enter' && navigate('/upload')}
//         >
//           <div className="action-icon">📤</div>
//           <h2 className="action-title">Upload PDF</h2>
//           <p className="action-description">
//             Upload a new PDF document to get an AI-powered summary. 
//             Supports documents up to 10MB.
//           </p>
//           <div className="action-arrow">
//             Get Started <span>→</span>
//           </div>
//         </div>

//         <div 
//           className="action-card"
//           onClick={() => navigate('/history')}
//           role="button"
//           tabIndex={0}
//           onKeyPress={(e) => e.key === 'Enter' && navigate('/history')}
//         >
//           <div className="action-icon">📋</div>
//           <h2 className="action-title">View History</h2>
//           <p className="action-description">
//             Access your previous summaries and manage your document history.
//             Download or delete old summaries.
//           </p>
//           <div className="action-arrow">
//             View All <span>→</span>
//           </div>
//         </div>
//       </div>

//       {/* Recent Summaries */}
//       {recentSummaries.length > 0 && (
//         <div className="recent-section">
//           <div className="section-header">
//             <h2 className="section-title">Recent Summaries</h2>
//             <button 
//               className="section-link"
//               onClick={() => navigate('/history')}
//             >
//               View All →
//             </button>
//           </div>
//           <div className="recent-grid">
//             {recentSummaries.map((item, index) => (
//               <div 
//                 key={item._id || item.id || index} 
//                 className="recent-card"
//                 onClick={() => navigate(`/summary/${item._id || item.id}`)}
//               >
//                 <div className="recent-icon">📄</div>
//                 <div className="recent-info">
//                   <div className="recent-name">
//                     {item.filename || item.fileName || 'Untitled'}
//                   </div>
//                   <div className="recent-date">
//                     {formatDate(item.createdAt || item.timestamp)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Welcome to PDF Summarizer 👋</h1>
      <p>AI-powered document summarization</p>

      <div className="cards">
        <div className="card" onClick={() => navigate('/upload')}>
          <span>📤</span>
          <h3>Upload PDF</h3>
          <p>Get AI-powered summaries</p>
        </div>

        <div className="card" onClick={() => navigate('/history')}>
          <span>📋</span>
          <h3>View History</h3>
          <p>Access previous summaries</p>
        </div>
      </div>
    </div>
  );
};

export default Home;