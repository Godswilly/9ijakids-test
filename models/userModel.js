const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'User must have a First Name'],
    minlength: [3, 'Name must have more or equal to 3 characters'],
    maxlength: [20, 'Name must have less or equal to 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'User must have a Last Name'],
    minlength: [3, 'Name must have more or equal to 3 characters'],
    maxlength: [20, 'Name must have less or equal to 20 characters'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'User must have an email address'],
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email address',
    ],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Minimum password length must be 6 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!!',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
