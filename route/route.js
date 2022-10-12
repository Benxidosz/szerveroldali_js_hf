const renderMW = require('../middleware/renderMW');
const getPlacesMW = require('../middleware/place/getPlacesMW');
const getSettsMW = require('../middleware/sett/getSettsMW');
const countSettsMW = require('../middleware/sett/countSettsMW');

module.exports = function (app) {
    const objRepo = {};

    app.get('/',
        getPlacesMW(objRepo),
        getSettsMW(objRepo),
        countSettsMW(objRepo),
        renderMW(objRepo, 'index'));
    app.use('/place/create',
        savePlaceMW(objRepo),
        renderMW(objRepo, 'new_place'));
    app.use('/place/modify/:placeId',
        getPlaceMW(objRepo),
        savePlaceMW(objRepo),
        renderMW(objRepo, 'new_place'));
    app.get('/place/delete/:placeId',
        getPlaceMW(objRepo),
        delPlaceMW(objRepo));
    app.get('/place/stats/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        countSetts(objRepo),
        checkSettsMW(objRepo),
        countValidSettsMW(objRepo),
        renderMW(objRepo, 'stats'));

    app.get('/sett/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        checkSettsMW(objRepo),
        renderMW(objRepo, 'sett_list'));
    app.use('/set/:placeId/create',
        getPlaceMW(objRepo),
        saveSettMW(objRepo),
        renderMW(objRepo, 'new_sett'));
    app.use('/set/:placeId/modify/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        saveSettMW(objRepo),
        renderMW(objRepo, 'new_sett'));
    app.get('/set/:placeId/delete/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        delSettMW(objRepo));
}