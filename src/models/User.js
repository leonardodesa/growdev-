import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        
        email: {
            type: String,
            lowercase: true,
            required: true,
            index: {
                unique: true
            }
        },

        password: {
            type: String,
            required: true,
            select: false
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

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = model('User', UserSchema);