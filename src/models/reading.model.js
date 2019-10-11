const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Reading extends Model { }

module.exports = sequalize => {

    Reading.init({
        // attributes
        PM10: {
            type: Sequelize.FLOAT
        },
        PM25: {
            type: Sequelize.FLOAT
        },
        timestamp: {
            type: Sequelize.DATE
        },
        location: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        modelName: 'reading'
        // options
    });

};