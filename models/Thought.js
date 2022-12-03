// 18.1.5 & 18.2.3 & 18.2.4
// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLengthLength: 280
        },
        username: {
            
              type: String,
              required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true,
        },
        createdAt: {
              type: Date,
              default: Date.now,
              get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionArray]
 },
 {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema)
module.exports = Thought;