/**
 * A res.locals.settsen végig megy és kiszámolja a statisztikákhoz szükséges adatokat.
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        res.locals.missing = {
            cups: 0,
            balls: 0,
            typeMap: { }
        }
        res.locals.completeSetts = 0;
        res.locals.setts.forEach((sett) => {
           if (sett.complete) {
               ++res.locals.completeSetts;
           } else {
                res.locals.missing.cups += sett.missing.cups;
                res.locals.missing.balls += sett.missing.balls;
                if (res.locals.missing.typeMap[sett.type.toLowerCase()]) {
                    res.locals.missing.typeMap[sett.type.toLowerCase()].sum += sett.missing.cups;
                    if (res.locals.missing.typeMap[sett.type.toLowerCase()].colorMap[sett.color.toLowerCase()]) {
                        res.locals.missing.typeMap[sett.type.toLowerCase()]
                            .colorMap[sett.color.toLowerCase()] += sett.missing.cups;
                    } else {
                        res.locals.missing.typeMap[sett.type.toLowerCase()]
                            .colorMap[sett.color.toLowerCase()] = sett.missing.cups;
                    }
                } else {
                    res.locals.missing.typeMap[sett.type.toLowerCase()] = {
                        sum: sett.missing.cups,
                        colorMap: {}
                    };
                    res.locals.missing.typeMap[sett.type.toLowerCase()]
                        .colorMap[sett.color.toLowerCase()] = sett.missing.cups;
                }
           }
        });
        return next();
    };
};