const express = require('express');
const path = require('path');
const router = require('express').Router();
const theAgency = require('./app/data/fakeData');
const parse = require('url-parse');

const app = express();

const port = process.env.PORT || 8080;

//routes is where the api calls will exist
app.use(require('./app/routes'));

//get compiled assets from the public folder
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/*', express.static(path.join(__dirname, './public')));

//start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});