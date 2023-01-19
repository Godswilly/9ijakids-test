const express = require('express');

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;
