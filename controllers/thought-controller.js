const { Thought, User } = require('../models');

// 18.1.6
const thoughtController = {
    // get all thoughts
    getAllThoughts(_req, res) {
        Thought.find({})
            .then(dbThoughtData =>
                res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    // {
    //             if (!dbThoughtData) {
    //                 res.status(404).json(err) // return res.status(404).json(err)
    //             }
    //             else res.status(200).json(dbThoughtData)
    //             // res.json(thoughts)
    //         })
    //         .catch((err) => res.status(500).json(err))
    // },

    // createThought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId }, // { _id: params.thoughtId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { runValidators: true, new: true }
        )
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },

    // delete thought 18.2.5
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' })
                }
                User.findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    createReaction({ params, body }, res) {
        // 'createReaction' is declared but its value is never read.
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } }, // { $push: { reactions: body }}
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                } res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
}


module.exports = thoughtController;