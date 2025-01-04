const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./queries'); //import database functions
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? /localhost/ : "https://hcv-auditor.uc.r.appspot.com/",
}))

app.get('/api/listings', db.getAllListings)
app.get('/api/listings/:id', db.getListingById)
app.put('/api/listings/:id', db.updateField)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));