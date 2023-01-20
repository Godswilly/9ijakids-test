const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');
const { registerValidation } = require('../utils/validator');
const {
  addUser,
  allUsers,
  singleUser,
  alterUser,
  removeUser,
} = require('../services/userServices');

const createUser = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    throw new ErrorHandler(`${error.details[0].message}`);
  }

  const newUser = await addUser(req.body);

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
  const { error } = registerValidation(req.body);

  if (error) {
    throw new ErrorHandler(`${error.details[0].message}`);
  }

  const user = await alterUser(req.params.id, req.body);

  if (!user) {
    throw new ErrorHandler('No user found with the given ID', 404);
  }

  if (error) {
    throw new ErrorHandler(`${error.details[0].message}`);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await removeUser(req.params.id);

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
