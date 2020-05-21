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
const mongo_1 = require("@/lib/fesjs/mongo");
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const provider_1 = __importDefault(require("@/data/_Sale/Warehouse/provider"));
class ShopProvider extends mongo_1.Provider {
    createShop(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // prepare data
            data._id = new mongoose_1.Types.ObjectId();
            const [shop, wh] = yield Promise.all([
                this.createOne(data),
                // add default warehouse
                provider_1.default.createOne({
                    shopId: data._id,
                    name: "Kho mặc định",
                    address: data.address,
                    isDefault: true,
                }),
            ]);
            return shop;
        });
    }
}
exports.default = new ShopProvider(model_1.default);
