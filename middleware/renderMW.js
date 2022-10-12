const requireOption = require('./requireOption');

module.exports = function (objRepo, viewName) {
    return function (req, res, next) {
        console.log('render: ' + viewName);
        res.end('Template: ' + viewName);
    };

};