const requireOption = require('../requireOption');

/**
 * Kiegésziti a settet teljessé. A hiányokat pótolja
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const SettModel = requireOption(objRepo, 'SettModel');
    const requirements = requireOption(objRepo, "CompleteSettRequirements")

    return function (req, res, next) {
        if (typeof res.locals.sett === 'undefined') {
            res.locals.pathName = `/`;
            return next();
        }
        res.locals.sett.cups = requirements.cups;
        res.locals.sett.balls = requirements.balls;
        res.locals.sett.save((err) => {
            if (err) {
                return next(err);
            }
            res.locals.pathName = `/sett/${res.locals.place._id}`;
            return next();
        });
    };
};