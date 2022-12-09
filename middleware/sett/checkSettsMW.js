const requireOption = require('../requireOption');

/**
 * Végig megy a res.locals-ban lévő setts kulcs alatt lévő listán és
 * validálja a szetteket,
 * tehát ellenőrzi, hogy meg van e minden eleme a teljességhez
 * Ezeket összegyűjti a res.locals.validSetts listába.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    const requirements = requireOption(objRepo, "CompleteSettRequirements")
    return function (req, res, next) {
        if (res.locals.setts === undefined) {
            return next();
        }
        res.locals.setts.forEach((sett) => {
           sett.complete = sett.cups >= requirements.cups && sett.balls >= requirements.balls;
           sett.missing = {
               cups: 0,
               balls: 0
           };
           if (!sett.complete) {
               sett.missing.cups = Math.abs(requirements.cups - sett.cups);
               sett.missing.balls = Math.abs(requirements.balls - sett.balls);
           }
        });
        return next();
    };
};