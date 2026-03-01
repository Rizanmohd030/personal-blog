// environment variables
require('dotenv').config();

// importing libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// importing routing files - DO THIS BEFORE app initialization
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// instance of express application
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per window
  message: 'Too many login attempts, please try again after 15 minutes'
});

// port defining
const PORT = process.env.PORT || 5000;

// mount the routes
app.use('/api/', apiLimiter);
app.use('/api/auth/login', loginLimiter); // Stricter limit for login
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// function to connect the Database and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is Alive and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

// calling function to start server
startServer();
