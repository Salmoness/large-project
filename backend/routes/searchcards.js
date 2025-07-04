const jwtutils = require("../jwt-utils.js");

async function searchcards(req, res, next) {
  const { search, jwt } = req.body;

  try {
    jwtutils.verifyJWT(jwt);
  } catch (e) {
    console.log(e);
    res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    return;
  }

  const payload = jwtutils.decodeJWT(jwt).payload;
  var _search = search.trim();
  const results = await req.app.locals.mongodb
    .collection("Cards")
    .find({
      Card: { $regex: _search + ".*", $options: "i" },
      UserId: payload.userId,
    })
    .toArray();
  var _ret = [];
  for (var i = 0; i < results.length; i++) {
    _ret.push(results[i].Card);
  }

  res
    .status(200)
    .json({ results: _ret, error: "", jwt: jwtutils.refreshJWT(payload) });
}

module.exports = searchcards;
