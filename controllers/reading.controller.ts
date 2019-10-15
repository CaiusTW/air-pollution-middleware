import Reading from '../models/reading.model'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import GeolocationResolverService from '../services/geolocation-resolver.service';

class ReadingsController
{

    mapper : DataMapper;
    geolocation : GeolocationResolverService;

    constructor( mapper : DataMapper, geolocation : GeolocationResolverService )
    {
        this.geolocation = geolocation;
        this.mapper = mapper;
    }

    public store = async ( reading : Reading ) => {
        reading.geo = await this.geolocation.transformPostcode(reading.location);
        //reading.geo = { lng : 0, lat: 0 };
        return this.mapper.put<Reading>(reading);
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