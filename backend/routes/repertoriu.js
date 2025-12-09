const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Repertoriu = require('../models/Repertoriu')

//get repertoriu
router.get('/repertorii', async (req, res) => {
    try {
        const repertoriu = await Repertoriu.find()
        res.json(repertoriu)
    } catch (error) {
        res.status(500).send(error);
    }
})

//get one specific repertoriu
router.get('/repertorii/:repertoriuID', async (req, res) => {
    try {
        const {repertoriuID} = req.params;
        const repertoriu = await Repertoriu.findOne({repertoriuID: Number(repertoriuID)})

        if(!repertoriu){
            return res.status(404).json({message: 'Spectacolul nu a fost gasit'})
        }

        res.json(repertoriu)
    } catch (error) {
        console.error('Error fetvhing repertoriu: ', error)
        res.status(500).send(error);
    }
})

module.exports = router;