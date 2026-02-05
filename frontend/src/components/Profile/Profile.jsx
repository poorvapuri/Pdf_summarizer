// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import authService from '../../services/authService';
// import historyService from '../../services/historyService';

// // Profile Page Component
// const Profile = () => {
//   const { user, updateUser, logout } = useAuth();
  
//   // State
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || ''
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [stats, setStats] = useState({
//     totalSummaries: 0,
//     memberSince: ''
//   });
//   const [showPasswordForm, setShowPasswordForm] = useState(false);

//   // Fetch user stats on mount
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const result = await historyService.getHistory();
//         if (result.success) {
//           const history = result.data.history || result.data || [];
//           setStats({
//             totalSummaries: history.length,
//             memberSince: user?.createdAt || new Date().toISOString()
//           });
//         }
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       }
//     };

//     fetchStats();
//   }, [user]);

//   // Handle input change for profile
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//     if (success) setSuccess('');
//   };

//   // Handle input change for password
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//     if (success) setSuccess('');
//   };

//   // Handle profile update
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim()) {
//       setError('Name is required');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const result = await authService.updateProfile({
//         name: formData.name.trim()
//       });
      
//       if (result.success) {
//         updateUser({ ...user, name: formData.name.trim() });
//         setSuccess('Profile updated successfully!');
//         setEditing(false);
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password change
//   const handleChangePassword = async (e) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword.length < 6) {
//       setError('New password must be at least 6 characters');
//       return;
//     }
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const result = await authService.updateProfile({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword
//       });
      
//       if (result.success) {
//         setSuccess('Password changed successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//         setShowPasswordForm(false);
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to change password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setFormData({
//       name: user?.name || '',
//       email: user?.email || ''
//     });
//     setEditing(false);
//     setError('');
//     setSuccess('');
//   };

//   return (
//     <div className="profile-page page-container">
//       {/* Page Header */}
//       <div className="page-header">
//         <h1 className="page-title">👤 Profile</h1>
//         <p className="page-description">
//           Manage your account settings and preferences
//         </p>
//       </div>

//       {/* Messages */}
//       {error && (
//         <div className="form-error mb-lg">
//           <span className="error-icon">⚠️</span>
//           <span>{error}</span>
//         </div>
//       )}
      
//       {success && (
//         <div className="form-success mb-lg">
//           <span className="success-icon">✓</span>
//           <span>{success}</span>
//         </div>
//       )}

//       <div className="profile-content">
//         {/* Profile Card */}
//         <div className="profile-card">
//           <div className="profile-header">
//             <div className="profile-avatar">
//               {user?.name?.charAt(0).toUpperCase() || 'U'}
//             </div>
//             <div className="profile-info">
//               <h2 className="profile-name">{user?.name || 'User'}</h2>
//               <p className="profile-email">{user?.email || 'No email'}</p>
//             </div>
//           </div>

//           {/* Profile Stats */}
//           <div className="profile-stats">
//             <div className="profile-stat">
//               <span className="stat-value">{stats.totalSummaries}</span>
//               <span className="stat-label">Summaries</span>
//             </div>
//             <div className="profile-stat">
//               <span className="stat-value">{formatDate(stats.memberSince)}</span>
//               <span className="stat-label">Member Since</span>
//             </div>
//           </div>
//         </div>

//         {/* Edit Profile Form */}
//         <div className="profile-section">
//           <div className="section-header">
//             <h3 className="section-title">Profile Information</h3>
//             {!editing && (
//               <button 
//                 className="btn-text"
//                 onClick={() => setEditing(true)}
//               >
//                 Edit
//               </button>
//             )}
//           </div>

//           <form onSubmit={handleUpdateProfile} className="profile-form">
//             <div className="form-group">
//               <label className="form-label">Name</label>
//               {editing ? (
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-input"
//                   value={formData.name}
//                   onChange={handleChange}
//                   disabled={loading}
//                 />
//               ) : (
//                 <div className="form-value">{user?.name || 'N/A'}</div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Email</label>
//               <div className="form-value">{user?.email || 'N/A'}</div>
//               <p className="form-hint">Email cannot be changed</p>
//             </div>

//             {editing && (
//               <div className="form-actions">
//                 <button 
//                   type="button" 
//                   className="btn-secondary"
//                   onClick={cancelEditing}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="btn-primary"
//                   disabled={loading}
//                 >
//                   {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Change Password Section */}
//         <div className="profile-section">
//           <div className="section-header">
//             <h3 className="section-title">Password</h3>
//             {!showPasswordForm && (
//               <button 
//                 className="btn-text"
//                 onClick={() => setShowPasswordForm(true)}
//               >
//                 Change Password
//               </button>
//             )}
//           </div>

//           {showPasswordForm ? (
//             <form onSubmit={handleChangePassword} className="profile-form">
//               <div className="form-group">
//                 <label className="form-label">Current Password</label>
//                 <input
//                   type="password"
//                   name="currentPassword"
//                   className="form-input"
//                   value={passwordData.currentPassword}
//                   onChange={handlePasswordChange}
//                   disabled={loading}
//                   placeholder="Enter current password"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">New Password</label>
//                 <input
//                   type="password"
//                   name="newPassword"
//                   className="form-input"
//                   value={passwordData.newPassword}
//                   onChange={handlePasswordChange}
//                   disabled={loading}
//                   placeholder="Enter new password (min. 6 characters)"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Confirm New Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   className="form-input"
//                   value={passwordData.confirmPassword}
//                   onChange={handlePasswordChange}
//                   disabled={loading}
//                   placeholder="Confirm new password"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button 
//                   type="button" 
//                   className="btn-secondary"
//                   onClick={() => {
//                     setShowPasswordForm(false);
//                     setPasswordData({
//                       currentPassword: '',
//                       newPassword: '',
//                       confirmPassword: ''
//                     });
//                     setError('');
//                   }}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="btn-primary"
//                   disabled={loading}
//                 >
//                   {loading ? 'Updating...' : 'Update Password'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <p className="form-hint">
//               ••••••••••
//             </p>
//           )}
//         </div>

//         {/* Danger Zone */}
//         <div className="profile-section danger-zone">
//           <h3 className="section-title">Danger Zone</h3>
//           <p className="section-description">
//             Once you log out, you'll need to sign in again to access your account.
//           </p>
//           <button 
//             className="btn-danger"
//             onClick={logout}
//           >
//             🚪 Log Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';

function Profile() {
  return (
    <div className="page">
      <h1>👤 Profile</h1>
      <p>Manage your account settings</p>
      
      <div className="card" style={{ cursor: 'default' }}>
        <h3>Coming Soon</h3>
        <p>Profile management features will be available in a future update.</p>
      </div>
    </div>
  );
}

export default Profile;