const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nqb6uo', { useNewUrlParser: true });

module.exports = mongoose;