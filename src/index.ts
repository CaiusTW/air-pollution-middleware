import express from 'express'
import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import ReadingController from './controllers/reading.controller'
import Reading from './models/reading.model';

const app = express();

const client = new DynamoDB({region: 'us-west-2'});
const mapper = new DataMapper({client});

const readingController = new ReadingController(mapper);

app.post('/reading', function (req, res) {
    readingController
        .store(new Reading(req.body))
        .then( () => res.status(200) )
        .catch( () => res.status(400) )
});

app.listen(3000);

console.log(`listinging on ${ 3000 }`);