const jwtutils = require("../jwt-utils.js");

async function addcard(req, res, next) {
  const { card, jwt } = req.body;

  try {
    jwtutils.verifyJWT(jwt);
  } catch (e) {
    res.status(200).json({ error: "Session invalid", jwt: "" });
    return;
  }

  const payload = jwtutils.decodeJWT(jwt).payload;
  const newCard = { Card: card, UserId: payload.userId };

  await req.app.locals.mongodb.collection("Cards").insertOne(newCard);

  res.status(200).json({ error: "", jwt: jwtutils.refreshJWT(payload) });
}

module.exports = addcard;
