module.exports = function (objRepo, pathName) {
    return function (req, res, next) {
        res.redirect(pathName);
    };

};