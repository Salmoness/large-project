require("express");
require("mongodb");

const MOCK_USERNAME = "user";
const MOCK_PASSWORD = "password";

exports.setApp = function(app, client)
{
    
    app.post('/api/login', async (req, res, next) =>
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';
        const { login, password } = req.body;
        const db = client.db('COP4331Cards');
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
        var id = -1;
        var fn = '';
        var ln = '';
        if( results.length > 0 )
        {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            try
            {
                const token = require("./createJWT.js");
                ret = token.createToken( fn, ln, id );
            }
            catch(e)
            {
                ret = {error:e.message};
            }
        }
        
        else if( login === MOCK_USERNAME && password === MOCK_PASSWORD )
        {
            id = 1; // Mock user ID
            fn = 'Mock';
            ln = 'User';
            try
            {
                const token = require("./createJWT.js");
                ret = token.createToken( fn, ln, id );
            }
            catch(e)
            {
                ret = {error:e.message};
            }
        }
        else    
        {
            ret = {error:"Login/Password incorrect"};
        }
        res.status(200).json(ret);
    });

    app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db('COP4331Cards');
    const results = await
    db.collection('Users').find({Login:login,Password:password}).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    var ret;
    if( results.length > 0 )
    {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
    try
    {
    const token = require("./createJWT.js");
    ret = token.createToken( fn, ln, id );
    }
    catch(e)
    {
    ret = {error:e.message};
    }
    }
    else
    {
    ret = {error:"Login/Password incorrect"};
    }
    res.status(200).json(ret);
});

    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
        const { userId, card } = req.body;
        const newCard = {Card:card,UserId:userId};
        var error = '';
        try
        {
            const db = client.db('COP4331Cards');
            const result = await db.collection('Cards').insertOne(newCard);
        }
        catch(e)
        {
            error = e.toString();
        }
        var ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) =>
    {
        // incoming: userId, search
        // outgoing: results[], error
        var error = '';
        const { userId, search } = req.body;
        var _search = search.trim();
        const db = client.db('COP4331Cards');
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }
        var ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });
}