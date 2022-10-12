const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('static'));

require('./route/route')(app);

const server = app.listen(3000, () => {
    console.log("Server is listening on :3000")
});