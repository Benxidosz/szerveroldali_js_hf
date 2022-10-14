const renderMW = require('../middleware/renderMW');
const redirectMW = require('../middleware/redirectMW');

const getPlacesMW = require('../middleware/place/getPlacesMW');
const getPlaceMW = require('../middleware/place/getPlaceMW');
const savePlaceMW = require('../middleware/place/savePlaceMW');
const delPlaceMW = require('../middleware/place/delPlaceMW');

const getSettsMW = require('../middleware/sett/getSettsMW');
const checkSettsMW = require('../middleware/sett/checkSettsMW');
const saveSettMW = require('../middleware/sett/saveSettMW');
const getSettMW = require('../middleware/sett/getSettMW');
const delSettMW = require('../middleware/sett/delSettMW');

/**
 * Regisztrálja a route-okat.
 * @param app
 */
module.exports = function (app) {
    const objRepo = {};

    app.get('/place/create',
        renderMW(objRepo, 'new_place'));
    app.post('/place/create',
        savePlaceMW(objRepo),
        redirectMW(objRepo, '/'));
    app.get('/place/modify/:placeId',
        getPlaceMW(objRepo),
        renderMW(objRepo, 'new_place'));
    app.post('/place/modify/:placeId',
        getPlaceMW(objRepo),
        savePlaceMW(objRepo),
        redirectMW(objRepo, '/'));
    app.get('/place/delete/:placeId',
        getPlaceMW(objRepo),
        delPlaceMW(objRepo),
        redirectMW(objRepo, '/'));
    app.get('/place/stats/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        checkSettsMW(objRepo),
        renderMW(objRepo, 'stats'));

    app.get('/sett/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        checkSettsMW(objRepo),
        renderMW(objRepo, 'sett_list'));
    app.get('/set/:placeId/create',
        getPlaceMW(objRepo),
        renderMW(objRepo, 'new_sett'));
    app.post('/set/:placeId/create',
        getPlaceMW(objRepo),
        saveSettMW(objRepo),
        redirectMW(objRepo, '/set/:placeId'));
    app.get('/set/:placeId/modify/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        renderMW(objRepo, 'new_sett'));
    app.post('/set/:placeId/modify/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        saveSettMW(objRepo),
        redirectMW(objRepo, '/set/:placeId'));
    app.get('/set/:placeId/delete/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        delSettMW(objRepo),
        redirectMW(objRepo, '/set/:placeId'));

    app.get('/',
        getPlacesMW(objRepo),
        getSettsMW(objRepo),
        renderMW(objRepo, 'index'));
}