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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const reading_model_1 = require("../models/reading.model");
class ReadingsController {
    constructor(mapper, geolocation) {
        this.store = (reading) => __awaiter(this, void 0, void 0, function* () {
            //reading.geo = await this.geolocation.transformPostcode(reading.location);
            reading.geo = { lng: 0, lat: 0 };
            return this.mapper.put(reading);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            let collection = [];
            try {
                for (var _b = __asyncValues(this.mapper.scan(reading_model_1.default)), _c; _c = yield _b.next(), !_c.done;) {
                    const item = _c.value;
                    collection.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return collection;
        });
        this.geolocation = geolocation;
        this.mapper = mapper;
    }
}
exports.default = ReadingsController;
//# sourceMappingURL=reading.controller.js.map