
let Reading = require('../models').Reading;

class ReadingsController
{

    constructor( db )
    {
        this.db = db;
    }

    store( reading ){

        Reading.create(reading);

    }

}

module.exports = new ReadingsController();