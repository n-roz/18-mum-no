// 18.1.5
// User

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)

const { Schema, model } = require('mongoose');

const Userschema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address!']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            },
            
          ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

Userschema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', Userschema)

module.exports = User;