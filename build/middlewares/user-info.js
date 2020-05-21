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
const provider_1 = __importDefault(require("@/data/User/provider"));
const model_1 = __importDefault(require("@/data/Permission/model"));
const model_2 = __importDefault(require("@/data/_Sale/Shop/model"));
const token_1 = __importDefault(require("@/services/auth/token"));
function default_1(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user) {
            return next();
        }
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ").pop();
            if (token) {
                const tokenData = token_1.default.verify(token);
                const [user, permissions, shops] = yield Promise.all([
                    provider_1.default.getOne({
                        _id: tokenData._id,
                        tokens: token,
                    }, ["roles"]),
                    model_1.default.find({
                        of: tokenData._id,
                    }),
                    model_2.default.find({
                        userId: tokenData._id,
                    }),
                ]);
                user.permissions = permissions;
                user.shops = shops;
                req.user = user;
            }
        }
        catch (error) {
            console.log("Get user info Erorr", error);
        }
        return next();
    });
}
exports.default = default_1;
