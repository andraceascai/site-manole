const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Spectacole = require('../models/Spectacole')

//get spectacole
router.get('/spectacole', async (req, res) => {
    try {
        const spectacole = await Spectacole.find()
        res.json(spectacole)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;

