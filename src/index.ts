import express from 'express';
import AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import ReadingController from './controllers/reading.controller';
import Reading from './models/reading.model';
import fs from 'fs';
import rateLimiter from 'express-rate-limit';

if (fs.existsSync('./aws.config.json')) {
    AWS.config.loadFromPath('./aws.config.json');
} else {
    console.info('falling back to env vars...');
}

const app = express();
app.use(express.json());

// prevent my AWS account from getting hammered with requests
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.set('trust proxy', 1);
app.use(limiter);

const client = new DynamoDB({ region: 'eu-west-2' });
const mapper = new DataMapper({ client });

const readingController = new ReadingController(mapper);

app.post('/reading', function (req, res) {
    readingController
        .store(new Reading(req.body))
        .then(res2 => res.json(res2))
        .catch(err => res.send(err))
});

let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`listinging on ${port}`);
});