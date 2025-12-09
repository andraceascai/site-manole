const mongoose = require('mongoose');

const spectacoleSchema = new mongoose.Schema({
_id: String,
titlu: String,
personaj: String,
descriere: String,
data: String,
ora: String,
locatie: String,
linkBilete: [String],
afis: String,
categorie: String
})

const Spectacole = mongoose.model('Spectacole', spectacoleSchema, 'spectacole' )

module.exports = Spectacole