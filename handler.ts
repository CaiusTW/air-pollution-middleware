import { Handler, Context, Callback } from 'aws-lambda';

import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import ReadingController from './controllers/reading.controller';
import Reading from './models/reading.model';
import * as fs from 'fs';
import GeolocationResolverService from './services/geolocation-resolver.service';

//Configure AWS creds
if (fs.existsSync('./aws.config.json')) {
  AWS.config.loadFromPath('./aws.config.json');
} else {
  console.info('falling back to env vars...');
}

//Configure the DynamoDB client and data mapper
const client = new DynamoDB({ region: 'eu-west-2' });
const mapper = new DataMapper({ client });
const geolocationResolver = new GeolocationResolverService();
const readingController = new ReadingController(mapper, geolocationResolver);

interface ReadingResponse {
  statusCode: number;
  body: string;
}

//TODO make the route handler generic and create a unique route for Readings
const postReading = (event: any, context : any, callback: Callback) => {

  let reading = new Reading(JSON.parse(event.body));

  readingController.store(reading).then(r => {

    const response: ReadingResponse = {
      statusCode: 200,
      body: JSON.stringify(r)
    };

    callback(null, response);

  });

}

const listReadings = (event: any, context : any, callback: Callback) => {

  readingController.getAll().then(r => {

    const response: ReadingResponse = {
      statusCode: 200,
      body: JSON.stringify(r)
    };

    callback(null, response);

  });

}

const collectionHandlers : Map<string, any> = new Map([
  [ "GET", listReadings ],
  [ "POST", postReading ]
]);

const itemHandlers : Map<string, any> = new Map();

const readings: Handler = (event: any, context: Context, callback: Callback) => {

  let handlers : Map<string,any> = (event["pathParameters"] == null) ? collectionHandlers : itemHandlers;

  let httpMethod = event["httpMethod"];
  if (handlers.has(httpMethod)) {
    return handlers.get(httpMethod)(event, context, callback);
  }

  const response = {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({
      message: `Invalid HTTP Method: ${httpMethod}`
    }),
  };

  callback(null, response);

};

export { readings }