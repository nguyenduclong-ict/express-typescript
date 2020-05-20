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
const mongo_1 = require("@/utils/fesjs/mongo");
const model_1 = __importDefault(require("./model"));
const provider_1 = __importDefault(require("@/data/Role/provider"));
class UserProvider extends mongo_1.Provider {
    createShopAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // grant role shop-admin
            const role = yield provider_1.default.getOne({ id: "shop-admin" });
            data.roles = [role._id];
            // create default shop
            return model_1.default.create(data);
        });
    }
    getAllUser() {
        return model_1.default.find().lean().exec();
    }
}
exports.default = new UserProvider(model_1.default);
