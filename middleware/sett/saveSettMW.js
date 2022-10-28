const requireOption = require("../requireOption");

/**
 * A res.body-ból kiolvassa az adatokat,
 * majd az adatok segítségével létrehozza a szettet, ha még nem létezik,
 * amit az adatbázisban eltárol/frissít a :placeId-jú helységhez.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const SettModel = requireOption(objRepo, 'SettModel');

    return function (req, res, next) {
        if (
            typeof req.body.iName === 'undefined' ||
            typeof req.body.iColor === 'undefined' ||
            typeof req.body.iBalls === 'undefined' ||
            typeof req.body.iCups === 'undefined' ||
            typeof res.locals.place === 'undefined' ||
            typeof req.body.iType === 'undefined'
        ) {
            return next();
        }
        if (typeof res.locals.sett === 'undefined') {
            res.locals.sett = new SettModel();
        }

        res.locals.sett.name = req.body.iName;
        res.locals.sett.color = req.body.iColor;
        res.locals.sett.type = req.body.iType;
        res.locals.sett.cups = req.body.iCups;
        res.locals.sett.balls = req.body.iBalls;
        res.locals.sett._place = res.locals.place._id;

        res.locals.pathName = `/sett/${res.locals.place._id}`

        res.locals.sett.save(err => {
            return next(err);
        });
    };
};