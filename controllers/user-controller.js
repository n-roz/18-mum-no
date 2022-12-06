const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            // .populate({
            //     path: 'thoughts',
            //     select: '-_v'
            // })
            .select(-_v)
            // ReferenceError: _v is not defined at getAllUsers 
            // (/Users/roznik/Desktop/class/projects/18-mum-no/controllers/user-controller.js:11:22)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-_v')
            .populate("friends")
            .populate("thoughts")
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    // updateUserById
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$set:req.body}, { runValidators: true, new: true, })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err))
    },

    // deleteUser
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // add friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
    }
};

module.exports = userController;