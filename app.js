require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use('/', teamRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});