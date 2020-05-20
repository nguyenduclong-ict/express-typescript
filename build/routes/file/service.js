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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importDefault(require("@/data/File/provider"));
const _ = __importStar(require("lodash"));
function handleGetFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filename } = req.params;
            const { user } = req;
            const file = yield provider_1.default.getOne({
                name: filename,
            }, ["permissions"]);
            if (!file) {
                return res.sendStatus(404);
            }
            let canSeeFile = false;
            if (file.isPublic)
                canSeeFile = true;
            else {
                if (file.owner === _.get(user, "_id") ||
                    file.permissions.some((p) => p.of === _.get(user, "_id") &&
                        p.for === file._id &&
                        ["read", "all"].includes(p.action))) {
                    canSeeFile = true;
                }
            }
            if (canSeeFile) {
                res.sendFile(file.path);
            }
            else {
                res.sendStatus(403);
            }
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.handleGetFile = handleGetFile;
