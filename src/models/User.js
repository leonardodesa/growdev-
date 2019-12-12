const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }]
    },

    {
          timestamps: true
    }
);

module.exports = model('User', UserSchema);