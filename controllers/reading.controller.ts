import Reading from '../models/reading.model'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import GeolocationResolverService from '../services/geolocation-resolver.service';

class ReadingsController
{

    mapper : DataMapper;
    geolocation : GeolocationResolverService;

    constructor( mapper : DataMapper, geolocation : GeolocationResolverService )
    {
        this.mapper = mapper;
    }

    public store = ( reading : Reading ) => {
        
        return this.mapper.put<Reading>({item: reading});

    }

    public getAll = async () => {
        let collection = [];
        for await (const item of this.mapper.scan(Reading))
        {
            collection.push(item);
        }
        return collection;
    }

}

export default ReadingsController;