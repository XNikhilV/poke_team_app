const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sprite: String, 
    type: String,
    hp: Number,
    attack: Number,
});

module.exports = mongoose.model('Pokemon', pokemonSchema);

