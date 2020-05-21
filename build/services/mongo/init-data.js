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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importDefault(require("@/data/Location/provider"));
const provider_2 = __importDefault(require("@/data/Config/provider"));
const tinh_tp_json_1 = __importDefault(require("@/resources/tinh_tp.json"));
const quan_huyen_json_1 = __importDefault(require("@/resources/quan_huyen.json"));
const model_1 = __importDefault(require("@/data/Role/model"));
const provider_3 = __importDefault(require("@/data/Role/provider"));
function initData() {
    Promise.all([
        // Admin role
        model_1.default.exists({ id: "admin" }).then((exists) => {
            if (!exists) {
                provider_3.default.createOne({
                    id: "admin",
                    name: "Quản trị viên",
                    type: "system",
                });
            }
        }),
        // Shop admin role
        model_1.default.exists({ id: "shop-admin" }).then((exists) => {
            if (!exists) {
                provider_3.default.createOne({
                    id: "shop-admin",
                    name: "Chủ shop",
                    type: "system",
                });
            }
        }),
        // Nhân viên
        model_1.default.exists({ id: "staff" }).then((exists) => {
            if (!exists) {
                provider_3.default.createOne({
                    id: "staff",
                    name: "Nhân viên",
                    type: "system",
                });
            }
        }),
        // Location
        initLocation(),
    ]).then(() => {
        console.log("init data success");
    });
}
exports.initData = initData;
function updateCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        const countries = [
            {
                name: "Việt Nam",
                countryCode: "84",
                slug: "VN",
                type: "country",
            },
        ];
        const result = yield Promise.all(countries.map((c) => provider_1.default.updateOne({ type: c.type, countryCode: c.countryCode }, c, {
            upsert: true,
        })));
        console.log("Update countries ", result);
    });
}
function updateCities(countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const cities = Object.entries(tinh_tp_json_1.default).map((e) => ({
            name: e[1].name_with_type,
            type: "city",
            provinceCode: e[1].code,
            countryCode,
            slug: e[1].slug,
        }));
        const result = yield Promise.all(cities.map((c) => provider_1.default.updateOne({
            type: c.type,
            provinceCode: c.provinceCode,
            countryCode: c.countryCode,
        }, c, {
            upsert: true,
        })));
        console.log("Update citis ", result);
    });
}
function updateDistricts(countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const districts = Object.entries(quan_huyen_json_1.default).map((e) => ({
            name: e[1].name_with_type,
            type: "district",
            countryCode,
            provinceCode: e[1].parent_code,
            districtCode: e[1].code,
            slug: e[1].slug,
        }));
        const result = yield Promise.all(districts.map((d) => provider_1.default.updateOne({
            type: d.type,
            provinceCode: d.provinceCode,
            districtCode: d.districtCode,
            countryCode: d.countryCode,
        }, d, { upsert: true })));
        console.log("Update districts ", result);
    });
}
function initLocation() {
    return __awaiter(this, void 0, void 0, function* () {
        const isInitLocation = yield provider_2.default.getOne({
            key: "initedLocation",
            value: true,
        });
        if (!isInitLocation) {
            console.log("Start init location");
            yield updateCountries();
            yield updateCities("84");
            yield updateDistricts("84");
            yield provider_2.default.updateOne({ key: "initedLocation" }, { key: "initedLocation", value: true }, { upsert: true });
        }
    });
}
exports.initLocation = initLocation;
