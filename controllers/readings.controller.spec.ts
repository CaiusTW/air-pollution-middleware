import ReadingController from './reading.controller';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import GeolocationResolverService from '../services/geolocation-resolver.service';
import IGeolocation from '../interfaces/geolocation.interface';
//import * as request from 'request-promise-native';
// import requestPromise = require('request-promise-native');

//FYI
//https://aws.amazon.com/blogs/developer/introducing-the-amazon-dynamodb-datamapper-for-javascript-developer-preview/

jest.mock('@aws/dynamodb-data-mapper');
jest.mock('aws-sdk');
jest.mock('request-promise-native', () => ({
    get : jest.fn().mockImplementation(r => { return new Promise((resolve, reject) => { 
        resolve({ body: "{ \"lng\": 2, \"lat\": 0 }" });
    }) })
}));

describe('Reading Controller Tests', function () {

    const clientMock = new DynamoDB();
    const mapperMock = new DataMapper({ client: clientMock });
    const geolocationService = new GeolocationResolverService();
    const controller = new ReadingController(mapperMock, geolocationService);

    afterAll(function () {
        jest.resetAllMocks();
    });

    describe('with valid reading', function () {

        test('should resolve WSG84 coords from postcode', async function () {

            let testReading: any = {
                "PM10": 0.2,
                "PM25": 0.2,
                "timestamp": "2019-10-11T10:54:18.93Z",
                "location": "SK7"
            };

            mapperMock.put = jest.fn().mockImplementation(r => new Promise((resolve, reject) => { resolve(r); }));
                
            let readingResult = await controller.store(testReading);

            console.log(readingResult.geo);
                
            expect(readingResult.geo).toEqual(<IGeolocation>{ lng: 2, lat: 0 });

        });

        test('should successfully store a reading', function () {

            let testReading: any = {
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