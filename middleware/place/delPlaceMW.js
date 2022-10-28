/**
 * Kitörli a :placeId id-jú helységet az adatbázisból
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        if (typeof res.locals.place === 'undefined') {
            return next();
        }
        res.locals.place.remove(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};