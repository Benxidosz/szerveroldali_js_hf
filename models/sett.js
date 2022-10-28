const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Sett = db.model('Sett',{
    name: String,
    color: String,
    type: String,
    cups: Number,
    balls: Number,
    _place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }
});

module.exports = Sett;