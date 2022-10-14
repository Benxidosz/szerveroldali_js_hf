/**
 * Átirányít a kapott URL-re
 * @param objRepo
 * @param pathName
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo, pathName) {
    return function (req, res, next) {
        res.redirect(pathName);
    };
};