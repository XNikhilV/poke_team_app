const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const Pokemon = require('../models/Pokemon');


router.get('/', async (req, res) => {
    try {
        const team = await Pokemon.find();
        res.render('index', { team: team, error: null });
    } catch (err) {
        console.error(err);
        res.render('index', { team: [], error: "Could not load team" });
    }
});

router.post('/add', async (req, res) => {
    const pokemonName = req.body.pokemonName.toLowerCase();

    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const apiResponse = await axios.get(apiUrl);
        
        const data = apiResponse.data;
        const hpStat = data.stats.find(s => s.stat.name === 'hp').base_stat;
        const attackStat = data.stats.find(s => s.stat.name === 'attack').base_stat;

        
        const newPokemon = new Pokemon({
            name: data.name,
            sprite: data.sprites.front_default,
            type: data.types[0].type.name,
            hp: hpStat,
            attack: attackStat
        });

        
        await newPokemon.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        const team = await Pokemon.find();
        res.render('index', { team: team, error: "Pokemon not found, check again!" });
    }
});

router.post('/reset', async (req, res) => {
    await Pokemon.deleteMany({});
    res.redirect('/');
});

module.exports = router;
router.post('/delete/:id', async (req, res) => {
    await Pokemon.findByIdAndDelete(req.params.id);
    res.redirect('/');
});