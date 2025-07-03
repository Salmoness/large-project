require("express");
require("mongodb");
const token = require("./createJWT.js");

const MOCK_USERNAME = "user";
const MOCK_PASSWORD = "password";

exports.setApp = function(app, client)
{
    app.post('/api/register', async (req, res, next) =>
    {
        // incoming: firstName, lastName, username, email, password, confirmPassword
        // outgoing: error
        const { firstName, lastName, username, email, password, confirmPassword } = req.body;
        var error = '';
        if( password !== confirmPassword )
        {
            error = 'Passwords do not match';
        }
        else if( username.length < 3 || password.length < 3 )
        {
            error = 'Username and Password must be at least 3 characters long';
        }
        else
        {
            const db = client.db('COP4331Cards');
            const existingUser = await db.collection('Users').findOne({Login:username});
            if( existingUser )
            {
                error = 'Username already exists';
            }
            else
            {
                const newUser = {FirstName:firstName, LastName:lastName, Login:username, Email:email, Password:password};
                try
                {
                    await db.collection('Users').insertOne(newUser);
                }
                catch(e)
                {
                    error = e.toString();
                }
            }
        }
        let ret = {error:error};
        
    });
    
    app.post('/api/login', async (req, res, next) =>
    {
        // incoming: login, password
        // outgoing: error, jwtToken
        
        const { login, password } = req.body;
        const db = client.db('COP4331Cards');
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
        var id = -1;
        var fn = 'Jon';
        var ln = 'Doe';

        let error = '';
        let newToken = null;
        if( results.length > 0 )
        {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            try
            {
                newToken = token.createToken( fn, ln, id ).accessToken;
            }
            catch(e)
            {
                error = e.message;
            }
        }
        
        else if( login === MOCK_USERNAME && password === MOCK_PASSWORD )
        {
            id = 1; // Mock user ID
            fn = 'Mock';
            ln = 'User';
            try
            {
                newToken = token.createToken( fn, ln, id ).accessToken; 
            }
            catch(e)
            {
                error = e.message;
            }
        }
        else    
        {
            error = {error:"Login/Password incorrect"};
            newToken = token.createToken( fn, ln, id ).accessToken;
        }

        ret = { error:error, jwtToken:newToken };
        res.status(200).json(ret);
    });

    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error, jwtToken
        const { userId, card, jwtToken} = req.body;

        // Validate JWT token
        try
        {
            if(token.isExpired(jwtToken))
            {
                let r = {error: "JWT no longer valid", jwtToken:""};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log("JWT Error: " + e.message);
            let r = {error: "Error validating JWT", jwtToken:""};
            res.status(200).json(r);
            return;
        }

        // Backend logic to add card
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

        // Refresh JWT token
        let refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log("JWT Refresh Error: " + e.message);
        }

        let ret = { error: error, jwtToken: refreshedToken };

        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) =>
    {
        // incoming: userId, search
        // outgoing: results[], error, jwtToken

        // Validate JWT token
        var error = '';
        const { userId, search, jwtToken } = req.body;
        try
        {
            if(token.isExpired(jwtToken))
            {
                let r = {error: "JWT no longer valid", jwtToken:""}
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log("JWT Error: " + e.message);
            let r = {error: "Error validating JWT", jwtToken:""}
            res.status(200).json(r);
            return;
        }

        // Backend logic to search cards

        var _search = search.trim();
        const db = client.db('COP4331Cards');
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}, "UserId": userId}).toArray(); //test if this actually works
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }

        // Refresh JWT token
        let refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log("JWT Refresh Error: " + e.message);
        }

        var ret = {results:_ret, error:error, jwtToken: refreshedToken};

        res.status(200).json(ret);
    });
}