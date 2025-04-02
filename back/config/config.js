const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,
};

module.exports = config; // Use CommonJS export
