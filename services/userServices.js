const User = require('../models/userModel');

const addUser = async (body) => {
  return await User.create(body);
};

const allUsers = async () => {
  return await User.find({});
};

const singleUser = async (params) => {
  return await User.findById(params);
};

const alterUser = async (params, body) => {
  return await User.findByIdAndUpdate(params, body, {
    new: true,
    runValidators: true,
  });
};

const removeUser = async (params) => {
  return await User.findByIdAndDelete(params);
};

module.exports = {
  addUser,
  allUsers,
  singleUser,
  alterUser,
  removeUser,
};
