/**
 * Átirányít a kapott URL-re
 * @param objRepo
 * @param pathName
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof res.locals.pathName === "undefined") {
            res.locals.pathName = '/'
        }
        res.redirect(res.locals.pathName);
    };
};