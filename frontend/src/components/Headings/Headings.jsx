import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../../services/historyService';

function Headings() {
  const navigate = useNavigate();
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeadings();
  }, []);

  const fetchHeadings = async () => {
    try {
      const response = await getHistory();
      const historyData = response.data.history || response.data || [];
      // Filter items that have a selectedHeading
      const withHeadings = historyData.filter(item => item.selectedHeading);
      setHeadings(withHeadings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="page">
        <div className="spinner" style={{ margin: '4rem auto' }}></div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Saved Headings</h1>
        <p>Your selected headings and associated documents</p>
      </div>

      {headings.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🏷️</div>
          <h3>No headings saved yet</h3>
          <p>Upload a PDF and select a heading to see it here</p>
          <button onClick={() => navigate('/upload')}>
            📤 Upload PDF
          </button>
        </div>
      ) : (
        <div className="history-list">
          {headings.map((item) => (
            <div key={item._id} className="history-card" style={{ borderLeft: '4px solid #0056b3' }}>
              <div className="history-top">
                <div className="history-info">
                  <div className="history-meta">
                    <h3 style={{ margin: '0 0 8px 0', color: '#0056b3' }}>{item.selectedHeading}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                      <span className="history-icon" style={{ fontSize: '16px' }}>📄</span>
                      <strong>{item.fileName || item.filename || 'Untitled'}</strong>
                      <span>•</span>
                      <small>{formatDate(item.createdAt)}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Headings;
