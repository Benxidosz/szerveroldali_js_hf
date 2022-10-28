const db = require('../config/db');

const Place = db.model('Place', {
    name: String,
    floor: Number,
    room: Number,
    type: String
});

module.exports = Place;