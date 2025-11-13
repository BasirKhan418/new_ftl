const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("❌ MONGODB_URI is missing in environment variables!");
    process.exit(1);
  }

  try {
    console.log("🔄 Connecting to MongoDB...");

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4,
      retryWrites: true,
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(
      `🔗 Connection State: ${
        conn.connection.readyState === 1 ? "Connected" : "Connecting"
      }`
    );

    // Event Listeners
    conn.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err);
    });

    conn.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB Disconnected");
    });

    conn.connection.on("reconnected", () => {
      console.log("🔄 MongoDB Reconnected");
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.log("🚀 Starting server without Database Connection...");
    console.log("⚠️ Some features may not work without a database.");
  }
};

module.exports = connectDB;
