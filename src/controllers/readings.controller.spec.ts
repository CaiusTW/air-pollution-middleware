import ReadingController from './reading.controller';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
jest.mock('@aws/dynamodb-data-mapper');
jest.mock('aws-sdk');

//FYI
//https://aws.amazon.com/blogs/developer/introducing-the-amazon-dynamodb-datamapper-for-javascript-developer-preview/

describe('Reading Tests', function () {

    let clientMock = new DynamoDB();
    let mapperMock = new DataMapper({ client: clientMock });
    const controller = new ReadingController(mapperMock);

    describe('with valid reading', function () {

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