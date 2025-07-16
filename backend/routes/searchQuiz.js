import jwtutils from "../jwt-utils.js";

export async function searchQuiz(req, res, next) {
    // Expects a search term and JWT in the request body
    const { search, jwt } = req.body;

    // implement JWT verification
    // try {
    //     jwtutils.verifyJWT(jwt);
    // } catch (e) {
    //     console.log(e);
    //     res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    //     return;
    // }
    // const payload = jwtutils.decodeJWT(jwt).payload;
    
    var _search = search.trim();

    if (_search === "") {
        //return all quizzes if search is empty
        const results = await req.app.locals.mongodb
            .collection("Quizzes")
            .find({})
            .toArray();
        res.status(200).json({ quizzes: results, error: ""}); //jwt: jwtutils.refreshJWT(payload) });
        return;
    }
    else{
        //search for quizzes that match the search term
        const results = await req.app.locals.mongodb
            .collection("Quizzes")
            .find({
                title: { $regex: _search + ".*", $options: "i" },
                //created_by_id: "1" // This is for "viewing own quizzes" feature, can be removed if not needed
            })
            .toArray();
        res.status(200).json({ quizzes: results, error: ""}); //jwt: jwtutils.refreshJWT(payload) });
        return;
    }
}