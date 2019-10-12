import Reading from '../models/reading.model'
import { DataMapper } from '@aws/dynamodb-data-mapper'

class ReadingsController
{

    mapper : DataMapper;

    constructor( mapper : DataMapper )
    {
        this.mapper = mapper;
    }

    public store = ( reading : Reading ) => this.mapper.put<Reading>({item: reading});

}

export default ReadingsController;