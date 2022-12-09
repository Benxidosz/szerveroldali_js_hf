const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Place = db.model('Place', {
    name: String,
    floor: Number,
    room: Number,
    type: String,
    _setts: [{ type: Schema.Types.ObjectId, ref: 'Sett' }]
});

module.exports = Place;