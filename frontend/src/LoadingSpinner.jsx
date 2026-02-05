import React from 'react';

// Loading Spinner Component
const LoadingSpinner = ({ text = 'Loading', fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <div className="loading-text">
          {text}
          <span className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-md">
      <div className="spinner-inline"></div>
      <span>{text}</span>
    </div>
  );
};

export default LoadingSpinner;