var expect = require('chai').expect;
var getPlaceMW = require('../../../../middleware/place/getPlaceMW');

describe('getPlace middleware ', () => {
    it('should return a place and put it to res.locals.selectedPlace', (done) => {
        var req = {
            params: {
                placeId: 7
            }
        }
        var res = {
            locals: {}
        }
        var mockedPlace = 'mockedPlace'
        var mockedPlaceModel = {
            findOne: (someId, cb) => {
                cb(undefined, mockedPlace)
            }
        }
        getPlaceMW({
            PlaceModel: mockedPlaceModel
        })(req, res, (err) => {
           expect(res.locals.place).to.be.eql(mockedPlace);
           expect(err).to.be.eql(undefined);
           done()
        });
    });

    it('should return a error when db return error', (done) => {
        var req = {
            params: {
                placeId: 7
            }
        }
        var mockedPlaceModel = {
            findOne: (someId, cb) => {
                cb('dbError', undefined)
            }
        }
        getPlaceMW({
            PlaceModel: mockedPlaceModel
        })(req, {}, (err) => {
            expect(err).to.be.eql('dbError');
            done()
        });
    });

    it('should return error when db NOT gives back place', (done) => {
        var req = {
            params: {
                placeId: 7
            }
        }
        var res = {
            locals: {}
        }
        var mockedPlaceModel = {
            findOne: (someId, cb) => {
                cb(undefined, undefined)
            }
        }
        getPlaceMW({
            PlaceModel: mockedPlaceModel
        })(req, res, (err) => {
            expect(res.locals.place).to.be.eql(undefined);
            expect(err).to.be.eql(undefined);
            done()
        });
    });
});