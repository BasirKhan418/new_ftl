const express = require('express');
const cors = require('cors');
require('dotenv').config()
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import configuration
const connectDB = require('./config/database');

// Import route files
const contactRoutes = require('./routes/contact');
const internshipRoutes = require('./routes/internship');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const serviceRequestRoutes = require('./routes/serviceRequest');
const teamRoutes = require('./routes/team');
const equipmentRoutes = require('./routes/equipment');

// New feature routes
const pageRoutes = require('./routes/pages');
const internshipManagementRoutes = require('./routes/internships');
const serviceManagementRoutes = require('./routes/services');

// AI feature routes
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        process.env.CLIENT_URL || 'https://ftl.org.in',
        'https://ftl.org.in',
        'https://www.ftl.org.in'
      ]
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Create upload directories if they don't exist
const uploadDirs = ['./uploads', './uploads/resumes', './uploads/blog-images', './uploads/team-images', './uploads/equipment-images', './uploads/equipment-manuals'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/images', express.static(path.join(__dirname, '../image')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/service-request', serviceRequestRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/equipment', equipmentRoutes);

// New feature routes
app.use('/api/pages', pageRoutes);
app.use('/api/internships', internshipManagementRoutes);
app.use('/api/services', serviceManagementRoutes);

// AI feature routes
app.use('/api/ai', aiRoutes);

// Admin routes
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/contacts', contactRoutes);
app.use('/api/admin/internships', internshipRoutes);
app.use('/api/admin/blogs', blogRoutes);
app.use('/api/admin/service-requests', serviceRequestRoutes);
app.use('/api/admin/team', teamRoutes);
app.use('/api/admin/equipment', equipmentRoutes);

// New admin feature routes  
app.use('/api/admin/pages', pageRoutes);
app.use('/api/admin/internships', internshipManagementRoutes);
app.use('/api/admin/services', serviceManagementRoutes);

// Enhanced Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK', 
    message: 'GTFTL Backend Server is running',
    environment: NODE_ENV,
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message
  });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/health`);
});

// Handle port already in use error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log(`\n💡 Solutions:`);
    console.log(`   1. Kill the process using port ${PORT}:`);
    console.log(`      Windows: netstat -ano | findstr :${PORT}`);
    console.log(`      Then: taskkill /PID <PID> /F`);
    console.log(`   2. Or change PORT in .env file`);
    console.log(`   3. Or use a different port: PORT=5001 npm start\n`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});