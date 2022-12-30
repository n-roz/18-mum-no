// 18.1.7
const router = require('express').Router();

const { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);    

module.exports = router;