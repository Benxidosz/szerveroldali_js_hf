const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(3000, function () {
});
app.use(express.static('static'));


