const mongoose = require('mongoose');

const repertoriuSchema = new mongoose.Schema({
_id: String,
titlu: String,
personaj: String,
locatie: String,
data: String,
descriere: String,
galerie: [String],
categorie: String,
cover: String
})

const Repertoriu = mongoose.model('Repertoriu', repertoriuSchema, 'repertoriu' )

module.exports = Repertoriu