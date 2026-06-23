const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/myapp');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

module.exports = {connectToDatabase};
