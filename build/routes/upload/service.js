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
const path_1 = __importDefault(require("path"));
const provider_1 = __importDefault(require("@/data/File/provider"));
function handleUploadMultiple(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        const { user } = req;
        const { isPublic, owner } = req.body;
        try {
            (_a = req.files) === null || _a === void 0 ? void 0 : _a.forEach((element, i) => __awaiter(this, void 0, void 0, function* () {
                const f = {
                    name: element.filename,
                    path: element.path,
                    type: element.mimetype.split("/").shift(),
                    ext: path_1.default.extname(element.filename),
                    owner: owner || (user && user._id),
                    isPublic,
                };
                promises.push(provider_1.default.createOne(f));
            }));
            Promise.all(promises).then((result) => {
                return res.json(result);
            });
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    });
}
exports.handleUploadMultiple = handleUploadMultiple;
function handleUploadSingle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({ success: true });
    });
}
exports.handleUploadSingle = handleUploadSingle;
