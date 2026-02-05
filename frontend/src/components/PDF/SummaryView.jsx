import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import historyService from '../../services/historyService';
import LoadingSpinner from '../LoadingSpinner';

// Summary View Component
const SummaryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch summary on mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await historyService.getHistoryItem(id);
        if (result.success) {
          setSummary(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to load summary');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSummary();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get summary text
  const getSummaryText = () => {
    if (!summary) return '';
    return summary.summary || summary.content || summary.text || '';
  };

  // Download summary
  const downloadSummary = () => {
    const text = getSummaryText();
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${summary?.filename || 'document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy summary
  const copySummary = async () => {
    const text = getSummaryText();
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Summary copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Delete summary
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this summary?')) {
      return;
    }

    try {
      const result = await historyService.deleteHistory(id);
      if (result.success) {
        navigate('/history');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete summary');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading summary" />;
  }

  if (error) {
    return (
      <div className="summary-view-page page-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>Error Loading Summary</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate('/history')}>
            Back to History
          </button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="summary-view-page page-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>Summary Not Found</h2>
          <p>The requested summary could not be found.</p>
          <button className="btn-primary" onClick={() => navigate('/history')}>
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-view-page page-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/history')}>
        ← Back to History
      </button>

      {/* Summary Card */}
      <div className="summary-view-card">
        {/* Header */}
        <div className="summary-view-header">
          <div className="summary-view-title">
            <div className="summary-view-icon">📄</div>
            <div className="summary-view-info">
              <h1>{summary.filename || summary.fileName || 'Untitled Document'}</h1>
              <p className="summary-view-date">
                {formatDate(summary.createdAt || summary.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="summary-view-actions">
            <button className="btn-icon" onClick={downloadSummary} title="Download">
              📥
            </button>
            <button className="btn-icon" onClick={copySummary} title="Copy">
              📋
            </button>
            <button className="btn-icon danger" onClick={handleDelete} title="Delete">
              🗑️
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="summary-view-content">
          <h2>Summary</h2>
          <div className="summary-text">
            {getSummaryText()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="summary-view-footer">
          <button className="btn-secondary" onClick={() => navigate('/upload')}>
            <span>📤</span>
            <span>Upload New PDF</span>
          </button>
          <button className="btn-secondary" onClick={() => navigate('/history')}>
            <span>📋</span>
            <span>View All History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;