const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const createUser = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    status: 'success',
    count: users.length,
    data: {
      users,
    },
  });
});

module.exports = {
  createUser,
  getAllUsers,
};
