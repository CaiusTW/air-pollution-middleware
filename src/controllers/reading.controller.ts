import Reading from '../models/reading.model'
import {DataMapper} from '@aws/dynamodb-data-mapper'

class ReadingsController
{

    mapper : DataMapper;

    constructor( mapper : DataMapper )
    {
        this.mapper = mapper;
    }

    public store( reading : Reading ){

        return new Promise( (resolve, reject) => {
            this.mapper.put({item: reading})
                .then(resolve)
                .catch(reject);
        });
        
    }

}

export default ReadingsController;