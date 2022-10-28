const requireOption = require('../requireOption');

/**
 * A res.body-ból kiolvassa az adatokat,
 * majd az adatok segítségével létrehozza a helységet, ha még nem létezik,
 * amit az adatbázisban eltárol/frissít
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const PlaceModel = requireOption(objRepo, 'PlaceModel');

    return function (req, res, next) {
        if (
            typeof req.body.iName === 'undefined' ||
            typeof req.body.iFloor === 'undefined' ||
            typeof req.body.iRoom === 'undefined' ||
            typeof req.body.iType === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.place === 'undefined') {
            res.locals.place = new PlaceModel();
        }

        res.locals.place.name = req.body.iName;
        res.locals.place.floor = req.body.iFloor;
        res.locals.place.room = req.body.iRoom;
        res.locals.place.type = req.body.iType;

        res.locals.place.save(err => {
            return next(err);
        });
    };
};