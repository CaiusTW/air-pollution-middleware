import IGeolocation from '../interfaces/geolocation.interface';
import * as Http from 'http';

class GeolocationResolverService
{

    public transformPostcode( code : string )
    {
        return new Promise( ( resolve, reject ) => {
            Http.get('transform', res => {
                //TODO
                //resolve(<IGeolocation>res.body);
            });
        });
    }

}

export default GeolocationResolverService;