const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobtitle: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    }
},{timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;