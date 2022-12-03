const { User, Thought } = require('../models');

// 18.1.6
const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => 
            res.json(thoughts))
        .catch((err) => res.status(404).json(err))
    },
    
    // get one thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then((Thought) => {
                if (!Thought) {
                    res.status(404).json(err)
                } else res.status(200).json(Thought)
                .catch((err) => res.status(500).json(err))
            }
            )   
        },

        // createThought
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { thoughts: _id} },
                    { new: true }
                )
            })
            .then((User) => {
                if (!User) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(User)
            })
            .catch(err => res.json(err));        
    },

    // update thought
    updatThought(req, res) {
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
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!'})
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
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
    }
}



module.exports = thoughtController