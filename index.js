const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(3000, () => {
    console.log("Server is listening on :3000")
});
app.use(express.static('static'));


