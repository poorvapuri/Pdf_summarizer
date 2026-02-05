// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import authService from '../../services/authService';

// // // Register Page Component
// // const Register = () => {
// //   const navigate = useNavigate();
// //   const { isAuthenticated } = useAuth();

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   });
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   // Redirect if already authenticated
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       navigate('/dashboard', { replace: true });
// //     }
// //   }, [isAuthenticated, navigate]);

// //   // Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //     // Clear messages when user types
// //     if (error) setError('');
// //     if (success) setSuccess('');
// //   };

// //   // Validate form
// //   const validateForm = () => {
// //     if (!formData.name.trim()) {
// //       setError('Name is required');
// //       return false;
// //     }
// //     if (formData.name.trim().length < 2) {
// //       setError('Name must be at least 2 characters');
// //       return false;
// //     }
// //     if (!formData.email.trim()) {
// //       setError('Email is required');
// //       return false;
// //     }
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(formData.email)) {
// //       setError('Please enter a valid email address');
// //       return false;
// //     }
// //     if (formData.password.length < 6) {
// //       setError('Password must be at least 6 characters');
// //       return false;
// //     }
// //     if (formData.password !== formData.confirmPassword) {
// //       setError('Passwords do not match');
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Handle form submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;

// //     setLoading(true);
// //     setError('');
// //     setSuccess('');

// //     try {
// //       const result = await authService.register({
// //         name: formData.name.trim(),
// //         email: formData.email.trim().toLowerCase(),
// //         password: formData.password
// //       });
      
// //       if (result.success) {
// //         setSuccess('Account created successfully! Redirecting to login...');
// //         setTimeout(() => {
// //           navigate('/login');
// //         }, 2000);
// //       } else {
// //         setError(result.error);
// //       }
// //     } catch (err) {
// //       setError('An unexpected error occurred. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       {/* Animated Background */}
// //       <div className="auth-background"></div>

// //       {/* Register Card */}
// //       <div className="auth-card">
// //         {/* Header */}
// //         <div className="auth-header">
// //           <div className="auth-logo">📄</div>
// //           <h1 className="auth-title">Create Account</h1>
// //           <p className="auth-subtitle">Join PDF Summarizer today</p>
// //         </div>

// //         {/* Register Form */}
// //         <form className="auth-form" onSubmit={handleSubmit}>
// //           {/* Error Message */}
// //           {error && (
// //             <div className="form-error">
// //               <span className="error-icon">⚠️</span>
// //               <span>{error}</span>
// //             </div>
// //           )}

// //           {/* Success Message */}
// //           {success && (
// //             <div className="form-success">
// //               <span className="success-icon">✓</span>
// //               <span>{success}</span>
// //             </div>
// //           )}

// //           {/* Name Field */}
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="name">
// //               Full Name
// //             </label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               className="form-input"
// //               placeholder="Enter your full name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               disabled={loading}
// //               autoComplete="name"
// //             />
// //           </div>

// //           {/* Email Field */}
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="email">
// //               Email Address
// //             </label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               className="form-input"
// //               placeholder="Enter your email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               disabled={loading}
// //               autoComplete="email"
// //             />
// //           </div>

// //           {/* Password Field */}
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="password">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               className="form-input"
// //               placeholder="Create a password (min. 6 characters)"
// //               value={formData.password}
// //               onChange={handleChange}
// //               disabled={loading}
// //               autoComplete="new-password"
// //             />
// //           </div>

// //           {/* Confirm Password Field */}
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="confirmPassword">
// //               Confirm Password
// //             </label>
// //             <input
// //               type="password"
// //               id="confirmPassword"
// //               name="confirmPassword"
// //               className="form-input"
// //               placeholder="Confirm your password"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               disabled={loading}
// //               autoComplete="new-password"
// //             />
// //           </div>

// //           {/* Submit Button */}
// //           <button 
// //             type="submit" 
// //             className="btn-primary"
// //             disabled={loading}
// //           >
// //             {loading ? (
// //               <span className="btn-loading">
// //                 <span className="spinner-inline"></span>
// //                 <span>Creating account...</span>
// //               </span>
// //             ) : (
// //               'Create Account'
// //             )}
// //           </button>
// //         </form>

// //         {/* Footer */}
// //         <div className="auth-footer">
// //           <span>Already have an account?</span>
// //           <Link to="/login" className="auth-link">
// //             Sign in
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { register } from '../../services/authService';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await register({ name, email, password });
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>Create Account</h1>
//         <p>Join PDF Summarizer</p>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Creating...' : 'Create Account'}
//           </button>
//         </form>

//         <p className="auth-footer">
//           Already have an account? <Link to="/login">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // if (password.length < 6) {
    //   setError('Password must be at least 6 characters');
    //   return;
    // }

    setLoading(true);
    setError('');

    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
    {/* <p>Join PDF Summarizer today</p> */ }

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;