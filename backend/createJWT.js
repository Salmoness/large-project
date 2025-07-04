const { access } = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function ( fn, ln, id )
{
    return _createToken( fn, ln, id );
}

_createToken = function ( fn, ln, id )
{
    try
    {
        const expiration = new Date();
        const user = {userId:id,firstName:fn,lastName:ln};
        const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
        // In order to expire with a value other than the default, use the
        // following
        /*
        const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'} );
        '24h'
        '365d'
        */
        var ret = {error: "", accessToken:accessToken};
    }

    catch(e)
    {
        var ret = {error:e.message, accessToken:""};
        console.error("Error creating JWT: " + ret.error);
    }
    return ret;
}

exports.isExpired = function( token )
{
    var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET,(err, verifiedJwt) =>
    {
        if( err )
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    return isError;
}

exports.refresh = function( token )
{
    var ud = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    //console.log("Refresh: " + JSON.stringify(ud));
    var userId = ud.userId;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    return _createToken( firstName, lastName, userId ).accessToken;
}
