/**
 * Kitörli a :placeId id-jú helységhez tartozó
 * :settId id-jú szettet az adatbázisból
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof res.locals.sett === 'undefined') {
            return next();
        }
        res.locals.sett.remove(err => {
            if (err) {
                return next(err);
            }
            res.locals.pathName = `/sett/${res.locals.place._id}`
            return next();
        });
    };
};