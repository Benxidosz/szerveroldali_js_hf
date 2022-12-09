const renderMW = require('../middleware/renderMW');
const redirectMW = require('../middleware/redirectMW');

const getPlacesMW = require('../middleware/place/getPlacesMW');
const getPlaceMW = require('../middleware/place/getPlaceMW');
const savePlaceMW = require('../middleware/place/savePlaceMW');
const delPlaceMW = require('../middleware/place/delPlaceMW');
const calculateStatisticsMW = require('../middleware/place/calculateStatisticsMW');

const getSettsMW = require('../middleware/sett/getSettsMW');
const checkSettsMW = require('../middleware/sett/checkSettsMW');
const saveSettMW = require('../middleware/sett/saveSettMW');
const getSettMW = require('../middleware/sett/getSettMW');
const delSettMW = require('../middleware/sett/delSettMW');
const completeSettMW = require('../middleware/sett/completeSettMW');

const PlaceModel = require('../models/place');
const SettModel = require('../models/sett');

/**
 * Regisztrálja a route-okat.
 * @param app
 */
module.exports = function (app) {
    const objRepo = {
        PlaceModel: PlaceModel,
        SettModel: SettModel,
        CompleteSettRequirements: {
            cups: 22,
            balls: 2
        }
    };

    app.get('/place/create',
        renderMW(objRepo, 'place/new_place'));
    app.post('/place/create',
        savePlaceMW(objRepo),
        redirectMW(objRepo));
    app.get('/place/modify/:placeId',
        getPlaceMW(objRepo),
        renderMW(objRepo, 'place/new_place'));
    app.post('/place/modify/:placeId',
        getPlaceMW(objRepo),
        savePlaceMW(objRepo),
        redirectMW(objRepo));
    app.get('/place/delete/:placeId',
        getPlaceMW(objRepo),
        delPlaceMW(objRepo),
        redirectMW(objRepo));
    app.get('/place/stats/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        checkSettsMW(objRepo),
        calculateStatisticsMW(objRepo),
        renderMW(objRepo, 'place/stats'));

    app.get('/sett/:placeId',
        getPlaceMW(objRepo),
        getSettsMW(objRepo),
        checkSettsMW(objRepo),
        renderMW(objRepo, 'sett/sett_list'));
    app.get('/sett/:placeId/create',
        getPlaceMW(objRepo),
        renderMW(objRepo, 'sett/new_sett'));
    app.post('/sett/:placeId/create',
        getPlaceMW(objRepo),
        saveSettMW(objRepo),
        redirectMW(objRepo));
    app.get('/sett/:placeId/modify/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        renderMW(objRepo, 'sett/new_sett'));
    app.post('/sett/:placeId/modify/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        saveSettMW(objRepo),
        redirectMW(objRepo));
    app.get('/sett/:placeId/delete/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        delSettMW(objRepo),
        redirectMW(objRepo));
    app.get('/sett/:placeId/complete/:settId',
        getPlaceMW(objRepo),
        getSettMW(objRepo),
        completeSettMW(objRepo),
        redirectMW(objRepo));

    app.get('/',
        getPlacesMW(objRepo),
        getSettsMW(objRepo),
        renderMW(objRepo, 'place/place_list'));
}