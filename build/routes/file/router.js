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
// ------- Declare router -------
router.get("/:filename", guard_1.default(), service.handleGetFile);
// ------------------------------
exports.default = router;
