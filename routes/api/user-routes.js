const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);

// set up GET one, PUT, and DELETE user by ID at /api/users/:ID
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// POST and DELETE at api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;