const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json()); // cant get it to work tsxon. 

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// start Node + Express server on port 5000
app.listen(5000,() => {
  console.log('Server listening on port 5000');
}); 

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config({path: "../.env"});
const url = process.env.MONGODB_URI 
const client = new MongoClient(url);
client.connect();

// Set up API routes
var api = require('./api.js');
api.setApp(app, client);