const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://princeaarya10008:FTLcutm%4010008@ftl.njzlo8f.mongodb.net/food_testing_lab?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Find admin and reset password
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('Admin not found!');
      return;
    }

    // Reset password
    admin.password = 'admin123';
    await admin.save();

    console.log('✅ Admin password reset successfully!');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('📧 Email:', admin.email);

  } catch (error) {
    console.error('❌ Error resetting admin password:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the script
resetAdminPassword();
