const requireOption = require('../requireOption');

/**
 * Lekéri a :placeId id-jú helységhez tartoző :settId id-jú szettet
 * és eltárolja a res.locals.selectedSett-be
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const SettModel = requireOption(objRepo, 'SettModel');

    return function (req, res, next) {
        if (typeof res.locals.place === 'undefined') {
            return next();
        }

        SettModel.findOne({ _place: res.locals.place._id, id: req.params.id }, (err, sett) => {
            if (err) {
                return next(err);
            }

            res.locals.sett = sett;
            return next();
        });
    };
};