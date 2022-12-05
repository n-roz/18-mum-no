const { User, Thought } = require('../models');

// 18.1.6
const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
    Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughts => {
                res.json(thoughts);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then((Thought) => {
                if (!Thought) {
                    res.status(404).json(err)
                } else res.status(200).json(Thought)
            })   
            .catch((err) => res.status(500).json(err))
        },

        // createThought
    createThought({ body }, res) {
        // console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId }, // { _id: params.thoughtId },
                    { $push: { thoughts: _id} },
                    { new: true }
                )
            })
            .then((Thought) => {
                if (!Thought) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(User)
            })
            .catch(err => {                
                console.log(err)
                res.status(400).json(err)});      
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((Thought => {
            if (!Thought) {
                res.status(404).json({ message: 'No thought found with this id!'})
            } else res.status(200).json(Thought)
            .catch ((err) => res.status(500).json(err))
        }))
    },  
      
    // delete thought 18.2.5
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!'})
                }
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    // { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    createReaction({ params, body }, res) {
        // 'createReaction' is declared but its value is never read.
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }}, // { $push: { reactions: body }},
            { new: true }
        )
        .then((Thought) => {
        if (!Thought) {
            res.status(404).json({ message: 'No thought found with this id!'})
        } else res.status(200).json(Thought)
        .catch((err) => res.status(500).json(err))
        })
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
        .then(Thought => {
            if (!Thought) {
                res.status(404).json({ message: 'No thought found with this id!' })
                return
            }
            res.json(Thought)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController;