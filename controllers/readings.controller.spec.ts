import ReadingController from './reading.controller';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import GeolocationResolverService from '../services/geolocation-resolver.service';
import * as Http from 'http';

jest.mock('@aws/dynamodb-data-mapper');
jest.mock('aws-sdk');
jest.mock('../services/geolocation-resolver.service');
jest.mock('./common/http');

//FYI
//https://aws.amazon.com/blogs/developer/introducing-the-amazon-dynamodb-datamapper-for-javascript-developer-preview/

describe('Reading Controller Tests', function () {

    let clientMock = new DynamoDB();
    let mapperMock = new DataMapper({ client: clientMock });
    let geolocationService = new GeolocationResolverService();
    const controller = new ReadingController(mapperMock, geolocationService);

    describe('with valid reading', function () {

        test('should resolve WSG84 coords from postcode', function () {
            
            let testReading : any = {
                "PM10": 0.2,
                "PM25": 0.2,
                "timestamp": "2019-10-11T10:54:18.93Z",
                "location": "SK7"
            };

            mapperMock.put = jest.fn().mockImplementation( r => new Promise( ( resolve, reject ) => { resolve(r); } ) );
            Http.prototype.get = jest.fn().mockReturnValueOnce({ lng: 2, lat: 0 })

            controller.store(testReading).then( reading => {

                expect(reading.geo).toBe({ lng: 2, lat: 0 });

            });

        });

        test('should successfully store a reading', function () {

            let testReading : any = {
                "PM10": 0.2,
                "PM25": 0.2,
                "timestamp": "2019-10-11T10:54:18.93Z",
                "location": "SK7"
            };

            controller.store(testReading);

            expect(mapperMock.put).toBeCalled();

        });

    });

});