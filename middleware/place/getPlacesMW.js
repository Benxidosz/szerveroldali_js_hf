/**
 * Lekéri az adatbázisból a helységeket,
 * majd eltárolja a res.locals.places listában
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        next();
    };
};