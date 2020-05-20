"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service = __importStar(require("./service"));
const router = express_1.Router();
const guard_1 = __importDefault(require("@/middlewares/guard"));
const upload_1 = __importDefault(require("@/services/upload"));
// ------- Declare router -------
router.post("/multiple", guard_1.default(), upload_1.default.array("files"), service.handleUploadMultiple);
router.post("/single", guard_1.default(), upload_1.default.single("file"), service.handleUploadSingle);
// ------------------------------
exports.default = router;
