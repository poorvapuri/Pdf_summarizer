// // // import React, { useState } from 'react';
// // // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthContext';

// // // // Navbar Component
// // // const Navbar = () => {
// // //   const { user, logout } = useAuth();
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // //   // Handle logout
// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate('/login');
// // //     setMobileMenuOpen(false);
// // //   };

// // //   // Check if link is active
// // //   const isActive = (path) => location.pathname === path;

// // //   // Toggle mobile menu
// // //   const toggleMobileMenu = () => {
// // //     setMobileMenuOpen(!mobileMenuOpen);
// // //   };

// // //   // Close mobile menu on link click
// // //   const handleLinkClick = () => {
// // //     setMobileMenuOpen(false);
// // //   };

// // //   return (
// // //     <nav className="navbar">
// // //       <div className="navbar-content">
// // //         {/* Brand */}
// // //         <Link to="/dashboard" className="navbar-brand" onClick={handleLinkClick}>
// // //           <div className="navbar-logo">📄</div>
// // //           <span className="navbar-title">PDF Summarizer</span>
// // //         </Link>

// // //         {/* Mobile Menu Button */}
// // //         <button 
// // //           className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
// // //           onClick={toggleMobileMenu}
// // //           aria-label="Toggle menu"
// // //         >
// // //           <span></span>
// // //           <span></span>
// // //           <span></span>
// // //         </button>

// // //         {/* Navigation Links */}
// // //         <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
// // //           <Link 
// // //             to="/dashboard" 
// // //             className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
// // //             onClick={handleLinkClick}
// // //           >
// // //             <span className="nav-link-icon">
// // //               🏠 <span>Home</span>
// // //             </span>
// // //           </Link>
          
// // //           <Link 
// // //             to="/upload" 
// // //             className={`nav-link ${isActive('/upload') ? 'active' : ''}`}
// // //             onClick={handleLinkClick}
// // //           >
// // //             <span className="nav-link-icon">
// // //               📤 <span>Upload</span>
// // //             </span>
// // //           </Link>
          
// // //           <Link 
// // //             to="/history" 
// // //             className={`nav-link ${isActive('/history') ? 'active' : ''}`}
// // //             onClick={handleLinkClick}
// // //           >
// // //             <span className="nav-link-icon">
// // //               📋 <span>History</span>
// // //             </span>
// // //           </Link>

// // //           <Link 
// // //             to="/profile" 
// // //             className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
// // //             onClick={handleLinkClick}
// // //           >
// // //             <span className="nav-link-icon">
// // //               👤 <span>{user?.name || 'Profile'}</span>
// // //             </span>
// // //           </Link>

// // //           <button className="logout-btn" onClick={handleLogout}>
// // //             🚪 <span>Logout</span>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Navbar = () => {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="nav-brand">📄 PDF Summarizer</div>
// //       <div className="nav-links">
// //         <Link to="/dashboard">Home</Link>
// //         <Link to="/upload">Upload</Link>
// //         <Link to="/history">History</Link>
// //         <button onClick={logout}>Logout</button>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//     window.location.reload();
//   };

//   const isActive = (path) => location.pathname === path ? 'active' : '';

//   return (
//     <nav className="navbar">
//       <Link to="/dashboard" className="nav-brand">
//         <span>PDF Summarizer</span>
//       </Link>
      
//       <div className="nav-links">
//         <Link to="/dashboard" className={isActive('/dashboard')}>🏠 Home</Link>
//         <Link to="/upload" className={isActive('/upload')}>📤 Upload</Link>
//         <Link to="/history" className={isActive('/history')}>📋 History</Link>
//         <button onClick={logout}>🚪 Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">
        <span>PDF Summarizer</span>
      </Link>

      <div className="nav-links">
        <Link to="/dashboard" className={isActive('/dashboard')}>
           Home
        </Link>
        <Link to="/upload" className={isActive('/upload')}>
           Upload
        </Link>
        <Link to="/history" className={isActive('/history')}>
           History
        </Link>
        <Link to="/headings" className={isActive('/headings')}>
           Headings
        </Link>
        <button onClick={handleLogout}> Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;