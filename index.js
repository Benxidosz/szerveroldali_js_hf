const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

require('./route/route')(app);

const server = app.listen(3000, () => {
    console.log("Server is listening on :3000")
});