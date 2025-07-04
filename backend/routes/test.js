async function test(req, res, next) {
    res.status(200);
    res.send("<h1>It works!</h1>");
};

module.exports = test;