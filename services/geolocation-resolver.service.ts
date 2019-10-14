import IGeolocation from '../interfaces/geolocation.interface';
//import * as request from 'request-promise-native';

class GeolocationResolverService
{

    public async transformPostcode( code : string )
    {
        //let result = await request.get('http://www.google.co.uk');
        // console.log("TEST");
        // console.log(result);
        return <IGeolocation>{ lng : 2, lat : 0 };
    }

}

export default GeolocationResolverService;