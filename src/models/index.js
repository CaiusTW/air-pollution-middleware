//TODO init seequalize and prepare all models
const Sequelize = require('sequelize');
const SequelizeDynamo = require('dynamo-sequelize');

// Option 1: Passing parameters separately
const sequelize = new SequelizeDynamo(
    'sqlite://./db.sqlite',
    {
        define: {
            timestamps: true
        },
        logging: false,
        dialect: 'dynamo'
    }
);

module.exports.Reading = require('./reading.model')(sequelize);