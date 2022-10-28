const requireOption = require('../requireOption');

/**
 * Lekéri a :placeId-jú helységhez tartozó szetteket és eltárolja őket a
 * res.locals.setts listában.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const SettModel = requireOption(objRepo, 'SettModel');

    return function (req, res, next) {
        if (typeof res.locals.place === 'undefined') {
            return next();
        }

        SettModel.find({ _place: res.locals.place._id }, (err, setts) => {
            if (err) {
                return next(err);
            }

            res.locals.setts = setts;
            return next();
        });
    };
};