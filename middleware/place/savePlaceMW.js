/**
 * A res.body-ból kiolvassa az adatokat,
 * majd az adatok segítségével létrehozza a helységet, ha még nem létezik,
 * amit az adatbázisban eltárol/frissít
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        next();
    };
};