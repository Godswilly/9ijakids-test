const User = require('../models/userModel');

const addUser = async (body) => await User.create(body);

const allUsers = async () => await User.find({});

const singleUser = async (params) => await User.findById(params);

const alterUser = async (params, body) =>
  await User.findByIdAndUpdate(params, body, {
    new: true,
    runValidators: true,
  });

const removeUser = async (params) => await User.findByIdAndDelete(params);

module.exports = {
  addUser,
  allUsers,
  singleUser,
  alterUser,
  removeUser,
};
