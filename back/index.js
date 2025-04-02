const express = require('express');
require('dotenv').config(); // Load environment variables from .env
const cors = require('cors'); // Import the CORS package
const PORT = process.env.PORT || 3000;
const app = express();
const authRoutes = require('./routes/auth.routes');
const mongoose = require('mongoose');
const config = require('./config/config.js');
const cookieParser = require('cookie-parser');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser()); // Required to read cookies
app.use(cors()); // This will allow all origins by default
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
app.use('/auth', authRoutes); // Authentication routes (signup/login)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
