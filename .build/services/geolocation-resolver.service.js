"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as request from 'request-promise-native';
class GeolocationResolverService {
    transformPostcode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            //let result = await request.get('http://www.google.co.uk');
            // console.log("TEST");
            // console.log(result);
            return { lng: 2, lat: 0 };
        });
    }
}
exports.default = GeolocationResolverService;
//# sourceMappingURL=geolocation-resolver.service.js.map