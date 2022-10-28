const requireOption = require('../requireOption');

/**
 * Lekéri a :placeId id-jú helységet az adatbázisból,
 * majd eltárolja a res.locals.selectedPlace-be.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const PlaceModel = requireOption(objRepo, 'PlaceModel');

    return function (req, res, next) {
        PlaceModel.findOne({
            _id: req.params.placeId
        }, (err, place) => {
            if (err || !place) {
                return next(err);
            }

            res.locals.place = place;
            return next();
        });
    };
};