const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Profile = require('../models/Profile');

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      subscription: { type:  0 }, // Default to Free (0)
    });

    await newUser.save();

    // Create profile for the user
    const newProfile = new Profile({ userId: newUser._id });
    await newProfile.save();

    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};

// Login Controller with HTTP-only Cookie
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, subscription: user.subscription },
      SECRET,
      { expiresIn: '12h' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      sameSite: 'Lax', // Protect against CSRF
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
};

// Logout Controller (Clears Cookie)
exports.logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logout successful' });
};
