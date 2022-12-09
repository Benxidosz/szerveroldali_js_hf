const requireOption = require("../requireOption");
/**
 * Kitörli a :placeId id-jú helységet az adatbázisból
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const SettModel = requireOption(objRepo, 'SettModel');

    return function (req, res, next) {
        if (typeof res.locals.place === 'undefined') {
            return next();
        }
        res.locals.place.remove(err => {
            if (err) {
                return next(err);
            }
            SettModel.deleteMany({_placeId: res.locals.place._id}, (err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        });
    };
};