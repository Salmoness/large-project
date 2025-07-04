const jwtutils = require("../jwt-utils.js");

// incoming: firstName, lastName, username, email, password, confirmPassword
// outgoing: error
async function register (req, res, next) {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    // TODO: verify request

    var error = '';
    var newToken = null;
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
        const existingUser = await req.app.locals.mongodb.collection('Users').findOne({Login:username});
        if( existingUser )
        {
            error = 'Username already exists';
        }
        else
        {
            try
            {
                let id = await req.app.locals.mongodb.collection('Users').countDocuments() + 1; // Get the next user ID
                const newUser = {FirstName:firstName, LastName:lastName, Login:username, Email:email, Password:password, UserId: id};
                await req.app.locals.mongodb.collection('Users').insertOne(newUser);
                newToken = jwtutils.createToken(firstName, lastName, id).accessToken
            }
            catch(e)
            {
                error = e.toString();
            }
        }
    }
    let ret = {error:error, jwtToken:newToken};
    res.status(200).json(ret);
};

module.exports = register;