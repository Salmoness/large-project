const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
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
app.listen(5002); // start Node + Express server on port 5000

const MOCK_USERNAME = "user";
const MOCK_PASSWORD = "password";

app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    var id = -1;
    var fn = '';
    var ln = '';

    // Simulates a database lookup
    // Replace MongoDB logic here
    if( login.toLowerCase() == MOCK_USERNAME && password == MOCK_PASSWORD )
    {
        id = 1;
        fn = 'Saymon';
        ln = 'Rivas';
    }
    else
    {
        error = 'Invalid user name/password';
    }
    let ret = { id:id, firstName:fn, lastName:ln, error:error};
    res.status(200).tsxon(ret);
});