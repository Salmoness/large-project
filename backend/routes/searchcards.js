const jwtutils = require("../jwt-utils.js");

// incoming: userId, search
// outgoing: results[], error, jwtToken
async function searchcards (req, res, next) {

    // Validate JWT token
    var error = '';
    const { search, jwtToken } = req.body;
    try
    {
        if(jwtutils.isExpired(jwtToken))
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

    let userData = jwtutils.verify(jwtToken);
    var _search = search.trim();
    const results = await req.app.locals.mongodb.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}, "UserId": userData.userId}).toArray(); //test if this actually works
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
        _ret.push( results[i].Card );
    }

    // Refresh JWT token
    let refreshedToken = null;
    try
    {
        refreshedToken = jwtutils.refresh(jwtToken);
    }
    catch(e)
    {
        console.log("JWT Refresh Error: " + e.message);
    }

    var ret = {results:_ret, error:error, jwtToken: refreshedToken};

    res.status(200).json(ret);
};

module.exports = searchcards;