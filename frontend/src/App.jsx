// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Import Components
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Home from './components/Dashboard/Home';
// import UploadPDF from './components/PDF/UploadPDF';
// import SummaryView from './components/PDF/SummaryView';
// import History from './components/History/History';
// import Profile from './components/Profile/Profile';
// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import LoadingSpinner from './components/LoadingSpinner';

// // Main App Component
// function App() {
//   const { loading, isAuthenticated } = useAuth();

//   // Show loading while checking authentication
//   if (loading) {
//     return <LoadingSpinner text="Initializing" />;
//   }

//   return (
//     <div className="app-container">
//       {/* Show Navbar only for authenticated users */}
//       {isAuthenticated && <Navbar />}

//       {/* Main Content */}
//       <main className={isAuthenticated ? 'main-content' : ''}>
//         <Routes>
//           {/* Public Routes */}
//           <Route 
//             path="/login" 
//             element={
//               isAuthenticated 
//                 ? <Navigate to="/dashboard" replace /> 
//                 : <Login />
//             } 
//           />
//           <Route 
//             path="/register" 
//             element={
//               isAuthenticated 
//                 ? <Navigate to="/dashboard" replace /> 
//                 : <Register />
//             } 
//           />

//           {/* Protected Routes */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/upload" 
//             element={
//               <ProtectedRoute>
//                 <UploadPDF />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/summary/:id" 
//             element={
//               <ProtectedRoute>
//                 <SummaryView />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/history" 
//             element={
//               <ProtectedRoute>
//                 <History />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Default Redirect */}
//           <Route 
//             path="/" 
//             element={
//               <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
//             } 
//           />

//           {/* 404 - Redirect to home */}
//           <Route 
//             path="*" 
//             element={
//               <Navigate to="/" replace />
//             } 
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Dashboard/Home';
import UploadPDF from './components/PDF/UploadPDF';
import History from './components/History/History';
import Navbar from './components/Navbar';

// Simple auth check
const isAuthenticated = () => !!localStorage.getItem('token');

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app">
      {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadPDF /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;