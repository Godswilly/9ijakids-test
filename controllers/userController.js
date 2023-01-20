const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');
const {
  addUser,
  allUsers,
  singleUser,
  alterUser,
  removeUser,
} = require('../services/userServices');

const createUser = asyncHandler(async (req, res, next) => {
  const userInput = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const newUser = await addUser(userInput);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await allUsers();

  res.status(200).json({
    status: 'success',
    count: users.length,
    data: {
      users,
    },
  });
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await singleUser(id);

  if (!user) {
    throw new ErrorHandler('No user found with the given ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await alterUser(req.params.id, req.body);

  if (!user) {
    throw new ErrorHandler('No user found with the given ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await  removeUser(req.params.id);

  if (!user) {
    throw new ErrorHandler('No user found with the given ID', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
