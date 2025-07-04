const jwtutils = require("../jwt-utils.js");

// incoming: login, password
// outgoing: error, jwtToken
async function login(req, res, next) {
    
    const { login, password } = req.body;

    // TODO: verify request

    const result = await req.app.locals.mongodb.collection('Users').findOne({Login:login, Password:password});

    var id = -1;
    var fn = '';
    var ln = '';

    let error = '';
    let newToken = null;
    if( result )
    {
        id = result.UserId;
        fn = result.FirstName;
        ln = result.LastName;
        try
        {
            newToken = jwtutils.createToken( fn, ln, id ).accessToken;
        }
        catch(e)
        {
            error = e.message;
        }
    }
    else    
    {
        error = {error:"Login/Password incorrect"};
        newToken = jwtutils.createToken( fn, ln, id ).accessToken;
    }

    ret = { error:error, jwtToken:newToken };
    res.status(200).json(ret);
};

module.exports = login;