/**
 * A res.body-ból kiolvassa az adatokat,
 * majd az adatok segítségével létrehozza a szettet, ha még nem létezik,
 * amit az adatbázisban eltárol/frissít a :placeId-jú helységhez.
 * @param objRepo
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        next();
    };
};