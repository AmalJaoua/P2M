const express = require('express');
require('dotenv').config(); // Load environment variables from .env
const cors = require('cors'); // Import the CORS package
const PORT = process.env.PORT || 3000;
const app = express();
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const contentRoutes = require('./routes/content.routes');
const videoRoutes = require('./routes/video.routes');

const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config.js');
const cookieParser = require('cookie-parser');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser()); // Required to read cookies
app.use(cors({
  origin: 'http://localhost:5173',        
  credentials: true,  
}));
// Routes

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process if the connection fails
    });

  // Static serving of HLS segments
app.use('/hls', express.static(path.join(__dirname, 'hls')));  
app.use('/auth', authRoutes); // Authentication routes (signup/login)
app.use('/profile', profileRoutes);
app.use('/content', contentRoutes);
app.use('/video', videoRoutes);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
