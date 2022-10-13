module.exports = function (objRepo) {
    return function (req, res, next) {
        next();
    };
};