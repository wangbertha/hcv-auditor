const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./queries'); //import database functions
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/get', db.getAllListings)
app.get('/get/home', db.getAllListings)
app.get('/get/listing/:id', db.getListingById)
app.put('/put/listing/:id', db.updateField)

app.listen(port, () => console.log(`Listening on port ${port}`));