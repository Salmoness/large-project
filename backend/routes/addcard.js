const jwtutils = require("../jwt-utils.js");

// incoming: userId, color
// outgoing: error, jwtToken
async function addcard(req, res, next) {

    const { card, jwtToken } = req.body;

    // Validate JWT token
    try
    {
        if(jwtutils.isExpired(jwtToken))
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

    let userData = jwtutils.verify(jwtToken);
    // logic to add card
    const newCard = {Card:card,UserId:userData.userId};
    var error = '';
    try
    {
        const result = await req.app.locals.mongodb.collection('Cards').insertOne(newCard);
    }
    catch(e)
    {
        error = e.toString();
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

    let ret = { error: error, jwtToken: refreshedToken };

    res.status(200).json(ret);
};

module.exports = addcard;