const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: { type: Number, required: true }, // Subscription type (e.g., Free, Premium)
    renewal_date: { type: Date }
  }
});

module.exports = mongoose.model('User', UserSchema);