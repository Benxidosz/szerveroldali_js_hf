var expect = require('chai').expect;
var completeSettMW = require('../../../../middleware/sett/completeSettMW');
const {locals} = require("express/lib/application");

describe('completeSettMW middleware ', () => {
    it('should complete a sett and put it on locals', (done) => {
        var mockedSettModel = {
            CompleteSettRequirements: {
                cups: 22,
                balls: 2
            }
        }
        var mockedSett = {
            cups: 7,
            balls: 1,
            save: (cb) => {cb(undefined)}
        };
        var res = {
            locals: {
                place: {
                    _id: 7
                },
                sett: mockedSett
            }
        }

        completeSettMW(mockedSettModel)({}, res, (err) => {
            expect(mockedSett.cups).to.be.eql(mockedSettModel.CompleteSettRequirements.cups)
            expect(mockedSett.balls).to.be.eql(mockedSettModel.CompleteSettRequirements.balls)
            expect(res.locals.pathName).to.be.eql('/sett/7')
            expect(err).to.be.eql(undefined)
            done()
        });
    });

    it('should return error bcs sett was not given', (done) => {
        var mockedSettModel = {
            CompleteSettRequirements: {
                cups: 22,
                balls: 2
            }
        }
        var mockedSett = undefined;
        var res = {
            locals: {
                place: {
                    _id: 7
                },
                sett: mockedSett
            }
        }

        completeSettMW(mockedSettModel)({}, res, (err) => {
            expect(res.locals.pathName).to.be.eql('/')
            expect(err).to.be.eql(undefined)
            done()
        });
    });

    it('should return error bcs sett save error', (done) => {
        var mockedSettModel = {
            CompleteSettRequirements: {
                cups: 22,
                balls: 2
            }
        }
        var mockedSett = {
            cups: 7,
            balls: 1,
            save: (cb) => {cb('saveError')}
        };
        var res = {
            locals: {
                place: {
                    _id: 7
                },
                sett: mockedSett
            }
        }

        completeSettMW(mockedSettModel)({}, res, (err) => {
            expect(mockedSett.cups).to.be.eql(mockedSettModel.CompleteSettRequirements.cups)
            expect(mockedSett.balls).to.be.eql(mockedSettModel.CompleteSettRequirements.balls)
            expect(res.locals.pathName).to.be.eql(undefined)
            expect(err).to.be.eql('saveError')
            done()
        });
    });
});