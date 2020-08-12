const { model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = model('User', userSchema)