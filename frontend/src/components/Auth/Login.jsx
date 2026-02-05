// // // // import React, { useState, useEffect } from 'react';
// // // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // // import { useAuth } from '../../context/AuthContext';
// // // // import authService from '../../services/authService';

// // // // // Login Page Component
// // // // const Login = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { login, isAuthenticated } = useAuth();

// // // //   // Form state
// // // //   const [formData, setFormData] = useState({
// // // //     email: '',
// // // //     password: ''
// // // //   });
// // // //   const [error, setError] = useState('');
// // // //   const [loading, setLoading] = useState(false);

// // // //   // Redirect if already authenticated
// // // //   useEffect(() => {
// // // //     if (isAuthenticated) {
// // // //       const from = location.state?.from?.pathname || '/dashboard';
// // // //       navigate(from, { replace: true });
// // // //     }
// // // //   }, [isAuthenticated, navigate, location]);

// // // //   // Handle input change
// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }));
// // // //     // Clear error when user types
// // // //     if (error) setError('');
// // // //   };

// // // //   // Handle form submit
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     // Basic validation
// // // //     if (!formData.email || !formData.password) {
// // // //       setError('Please fill in all fields');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');

// // // //     try {
// // // //       const result = await authService.login(formData);
      
// // // //       if (result.success) {
// // // //         // Extract user data and token from response
// // // //         const { token, user, name, email } = result.data;
// // // //         const userData = user || { name, email };
        
// // // //         // Call login from context
// // // //         login(userData, token);
        
// // // //         // Navigate to dashboard
// // // //         const from = location.state?.from?.pathname || '/dashboard';
// // // //         navigate(from, { replace: true });
// // // //       } else {
// // // //         setError(result.error);
// // // //       }
// // // //     } catch (err) {
// // // //       setError('An unexpected error occurred. Please try again.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="auth-page">
// // // //       {/* Animated Background */}
// // // //       <div className="auth-background"></div>

// // // //       {/* Login Card */}
// // // //       <div className="auth-card">
// // // //         {/* Header */}
// // // //         <div className="auth-header">
// // // //           <div className="auth-logo">📄</div>
// // // //           <h1 className="auth-title">Welcome Back</h1>
// // // //           <p className="auth-subtitle">Sign in to continue to PDF Summarizer</p>
// // // //         </div>

// // // //         {/* Login Form */}
// // // //         <form className="auth-form" onSubmit={handleSubmit}>
// // // //           {/* Error Message */}
// // // //           {error && (
// // // //             <div className="form-error">
// // // //               <span className="error-icon">⚠️</span>
// // // //               <span>{error}</span>
// // // //             </div>
// // // //           )}

// // // //           {/* Email Field */}
// // // //           <div className="form-group">
// // // //             <label className="form-label" htmlFor="email">
// // // //               Email Address
// // // //             </label>
// // // //             <input
// // // //               type="email"
// // // //               id="email"
// // // //               name="email"
// // // //               className="form-input"
// // // //               placeholder="Enter your email"
// // // //               value={formData.email}
// // // //               onChange={handleChange}
// // // //               disabled={loading}
// // // //               autoComplete="email"
// // // //             />
// // // //           </div>

// // // //           {/* Password Field */}
// // // //           <div className="form-group">
// // // //             <label className="form-label" htmlFor="password">
// // // //               Password
// // // //             </label>
// // // //             <input
// // // //               type="password"
// // // //               id="password"
// // // //               name="password"
// // // //               className="form-input"
// // // //               placeholder="Enter your password"
// // // //               value={formData.password}
// // // //               onChange={handleChange}
// // // //               disabled={loading}
// // // //               autoComplete="current-password"
// // // //             />
// // // //           </div>

// // // //           {/* Submit Button */}
// // // //           <button 
// // // //             type="submit" 
// // // //             className="btn-primary"
// // // //             disabled={loading}
// // // //           >
// // // //             {loading ? (
// // // //               <span className="btn-loading">
// // // //                 <span className="spinner-inline"></span>
// // // //                 <span>Signing in...</span>
// // // //               </span>
// // // //             ) : (
// // // //               'Sign In'
// // // //             )}
// // // //           </button>
// // // //         </form>

// // // //         {/* Footer */}
// // // //         <div className="auth-footer">
// // // //           <span>Don't have an account?</span>
// // // //           <Link to="/register" className="auth-link">
// // // //             Create one
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;

// // // import React, { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { login } from '../../services/authService';

// // // const Login = () => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       const { data } = await login({ email, password });
// // //       localStorage.setItem('token', data.token);
// // //       navigate('/dashboard');
// // //       window.location.reload(); // Refresh to update navbar
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Login failed');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-page">
// // //       <div className="auth-card">
// // //         <h1>Welcome Back</h1>
// // //         <p>Sign in to continue</p>

// // //         {error && <div className="error">{error}</div>}

// // //         <form onSubmit={handleSubmit}>
// // //           <input
// // //             type="email"
// // //             placeholder="Email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             required
// // //           />
// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             required
// // //           />
// // //           <button type="submit" disabled={loading}>
// // //             {loading ? 'Signing in...' : 'Sign In'}
// // //           </button>
// // //         </form>

// // //         <p className="auth-footer">
// // //           Don't have an account? <Link to="/register">Register</Link>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { login } from '../../services/authService';

// // function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!email || !password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       const response = await login({ email, password });
// //       localStorage.setItem('token', response.data.token);
// //       navigate('/dashboard');
// //       window.location.reload();
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Login failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-card">
// //         <h1>Welcome Back</h1>
// //         <p>Sign in to continue to PDF Summarizer</p>

// //         {error && <div className="error">{error}</div>}

// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="email"
// //             placeholder="Email address"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             disabled={loading}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             disabled={loading}
// //           />
// //           <button type="submit" disabled={loading}>
// //             {loading ? 'Signing in...' : 'Sign In'}
// //           </button>
// //         </form>

// //         <p className="auth-footer">
// //           Don't have an account? <Link to="/register">Create one</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../../services/authService';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await login({ email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard');
//       window.location.reload();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       {/* Left - Branding */}
//       <div className="auth-left">
//         <div className="auth-branding">
//           <div className="logo">
//             <div className="logo-icon">📄</div>
//             <div className="logo-text">PDF Summarizer</div>
//           </div>
          
//           <h1>
//             Summarize PDFs with <span>AI Power</span>
//           </h1>
//           <p>
//             Upload any document and get a concise, intelligent summary in seconds. 
//             Save time and extract key insights effortlessly.
//           </p>

//           <div className="auth-features">
//             <div className="auth-feature">
//               <span>⚡</span>
//               Instant AI-powered summaries
//             </div>
//             <div className="auth-feature">
//               <span>🔒</span>
//               Secure document processing
//             </div>
//             <div className="auth-feature">
//               <span>📁</span>
//               Access your history anytime
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right - Form */}
//       <div className="auth-right">
//         <div className="auth-glow"></div>
        
//         <div className="auth-card">
//           <h2>Welcome back</h2>
//           <p>Sign in to your account to continue</p>

//           {error && <div className="error">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//               />
//             </div>

//             <div className="input-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//               />
//             </div>

//             <button type="submit" disabled={loading}>
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </form>

//           <p className="auth-footer">
//             Don't have an account? <Link to="/register">Create one</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-branding">
          <div className="logo">
            <div className="logo-icon">📄</div>
            <div className="logo-text">PDF Summarizer</div>
          </div>

          <h1>
            Summarize PDFs with <span>AI Power</span>
          </h1>
          <p>
            Upload any document and get a concise, intelligent summary in seconds.
            Save time and extract key insights effortlessly.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <span>⚡</span>
              Instant AI-powered summaries
            </div>
            <div className="auth-feature">
              <span>🔒</span>
              Secure document processing
            </div>
            <div className="auth-feature">
              <span>📁</span>
              Access your history anytime
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-glow"></div>

        <div className="auth-card">
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;