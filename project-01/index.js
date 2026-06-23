const express = require('express');
const fs = require('fs');

const {connectToDatabase} = require('./connection');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;

connectToDatabase().catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    const now = new Date();
    const logEntry = `${now.toISOString()} [${req.method}] ${req.originalUrl} - ${now.toLocaleString()}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });
    next();
});

//routes
app.use('/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
