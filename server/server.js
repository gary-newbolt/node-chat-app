require('./config/config');
const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT;


const publicPath = path.join(__dirname, '../public');


// console.log(__dirname + '../public/public');
// console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
