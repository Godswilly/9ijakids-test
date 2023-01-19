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
    count: user.length,
    data: {
      user: newUser,
    },
  });
});

module.exports = {
  createUser,
};
