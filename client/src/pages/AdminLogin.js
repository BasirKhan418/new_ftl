import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../api/config';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaSpinner,
  FaShieldAlt,
  FaFlask
} from 'react-icons/fa';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token validity
      api.get('/api/auth/verify').then(() => {
        navigate('/admin/dashboard');
      }).catch(() => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', formData);
      
      if (response.data.success) {
        const { admin, token } = response.data.data;
        
        // Store token and user data
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(admin));
        
        toast.success('Login successful! Welcome back.');
        
        // Redirect to intended page or dashboard
        const redirectTo = location.state?.from || '/admin/dashboard';
        navigate(redirectTo);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-purple-800 to-slate-700 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-20 blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-pulse opacity-15 blur-sm" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full animate-pulse opacity-20 blur-sm" style={{ animationDelay: '-1.5s' }}></div>
        <div className="absolute top-10 right-20 w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse opacity-15 blur-sm" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse opacity-15 blur-sm" style={{ animationDelay: '-4s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gray-900 bg-opacity-95 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-yellow-400 backdrop-blur-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <FaShieldAlt className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaFlask className="h-6 w-6 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">GTFTL</h1>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Admin Panel</h2>
            <p className="text-yellow-200">Sign in to manage the system</p>
          </motion.div>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-yellow-400" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-yellow-400 rounded-xl text-white placeholder-yellow-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                placeholder="Enter username or email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-yellow-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-yellow-400 rounded-xl text-white placeholder-yellow-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              loading
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-50 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSpinner className="h-5 w-5 animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-yellow-200 text-sm">
            Protected access for authorized personnel only
          </p>
          <div className="mt-4 pt-4 border-t border-yellow-400 border-opacity-50">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
            >
              ← Back to Website
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
