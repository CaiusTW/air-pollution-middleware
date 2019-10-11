
const assert = require('assert');
const chai = require('chai');
const mockery = require('mockery');

describe('Reading', function () {

    before(function () {
        mockery.enable();
    });

    after(function () {
        mockery.disable();
    });

    mockery.registerMock('dynamo-sequelize', ( config ) => {});
    let readingsController = require('../src/controllers/reading.controller');
    //TODO mock this
    let Reading = require('../src/models/reading.model');

    describe('store', function () {

        it('stores a reading without exception', function () {

            let testReading = {
                "PM10": 0.2,
                "PM25": 0.2,
                "timestamp": "2019-10-11T10:54:18.93Z",
                "location": "SK7"
            };

            chai.expect(() => {

                readingsController.store(testReading);

            }).not.throws();

        });

    });

});