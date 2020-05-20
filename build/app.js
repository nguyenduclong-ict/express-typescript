"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
exports.app = express_1.default();
// ===============================
exports.app.use(cors_1.default());
exports.app.use(morgan_1.default("dev"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static(process.env.STATIC_PATH));
// ===============================
exports.server = http_1.default.createServer(exports.app);
