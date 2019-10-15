"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const aws_sdk_1 = require("aws-sdk");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const reading_controller_1 = require("./controllers/reading.controller");
const reading_model_1 = require("./models/reading.model");
const fs = require("fs");
const geolocation_resolver_service_1 = require("./services/geolocation-resolver.service");
//Configure AWS creds
if (fs.existsSync('./aws.config.json')) {
    AWS.config.loadFromPath('./aws.config.json');
}
else {
    console.info('falling back to env vars...');
}
//Configure the DynamoDB client and data mapper
const client = new aws_sdk_1.DynamoDB({ region: 'eu-west-2' });
const mapper = new dynamodb_data_mapper_1.DataMapper({ client });
const geolocationResolver = new geolocation_resolver_service_1.default();
const readingController = new reading_controller_1.default(mapper, geolocationResolver);
//TODO make the route handler generic and create a unique route for Readings
const postReading = (event, context, callback) => {
    let reading = new reading_model_1.default(JSON.parse(event.body));
    readingController.store(reading).then(r => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(r)
        };
        callback(null, response);
    });
};
const listReadings = (event, context, callback) => {
    readingController.getAll().then(r => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(r)
        };
        callback(null, response);
    });
};
const collectionHandlers = new Map([
    ["GET", listReadings],
    ["POST", postReading]
]);
const itemHandlers = new Map();
const readings = (event, context, callback) => {
    let handlers = (event["pathParameters"] == null) ? collectionHandlers : itemHandlers;
    let httpMethod = event["httpMethod"];
    if (handlers.has(httpMethod)) {
        return handlers.get(httpMethod)(event, context, callback);
    }
    const response = {
        statusCode: 405,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            message: `Invalid HTTP Method: ${httpMethod}`
        }),
    };
    callback(null, response);
};
exports.readings = readings;
//# sourceMappingURL=handler.js.map