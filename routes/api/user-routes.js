// 18.1.7
const router = require('express').Router();

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// friends
// router
//     .route('/:userId/friends/:friendId')
//     .post(addFriend)
//     .delete(removeFriend);    

module.exports = router;