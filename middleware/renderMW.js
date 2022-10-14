/**
 * Kirendereli a kapott viewName-ű ejs fájlt.
 * @param objRepo
 * @param viewName
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objRepo, viewName) {
    return function (req, res, next) {
        console.log('render: ' + viewName);
        res.end('Template: ' + viewName);
    };

};