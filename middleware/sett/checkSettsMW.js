/**
 * Végig megy a res.locals-ban lévő setts kulcs alatt lévő listán és
 * validálja a szetteket,
 * tehát ellenőrzi, hogy meg van e minden eleme a teljességhez
 * Ezeket összegyűjti a res.locals.validSetts listába.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        next();
    };
};