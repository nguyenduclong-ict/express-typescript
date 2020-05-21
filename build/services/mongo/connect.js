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
const env_1 = __importDefault(require("@/env"));
const mongoose_1 = __importDefault(require("mongoose"));
const init_data_1 = require("./init-data");
function default_1(app, server) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = env_1.default.MONGODB_CONFIG;
        mongoose_1.default.connection.on("connected", () => {
            console.log("connected to mongodb:", mongoose_1.default.connection.name);
            // check init data for database
            init_data_1.initData();
        });
        if (config) {
            const { host, port, dbName, user, pass, authDb } = config;
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            };
            const uri = `mongodb://${host}:${port}`;
            mongoose_1.default.connect(uri, Object.assign(Object.assign({}, options), { authSource: authDb || dbName, dbName,
                user,
                pass }));
        }
    });
}
exports.default = default_1;
