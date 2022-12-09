const requireOption = require('../requireOption');

/**
 * Lekéri az adatbázisból a helységeket,
 * majd eltárolja a res.locals.places listában
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const PlaceModel = requireOption(objRepo, 'PlaceModel');

    return function (req, res, next) {
        PlaceModel
            .find({})
            .populate('_setts')
            .exec((err, places) => {
                if (err) {
                    return next(err);
                }
                res.locals.places = places;
                return next();
            });
    };
};