import IGeolocation from '../interfaces/geolocation.interface';
import * as request from 'request-promise-native';

class GeolocationResolverService
{

    public async transformPostcode( code : string )
    {
        //TODO use postcode.io to get WSG84
        let result = await request.get('http://www.google.co.uk');
        return <IGeolocation>JSON.parse(result.body);
    }

}

export default GeolocationResolverService;