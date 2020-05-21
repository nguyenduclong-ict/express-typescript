"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
/**
 * Development envrironment
 */
const envDev = {
    ROUTER_PATH: path_1.default.join(__dirname, "routes"),
    UPLOAD_PATH: path_1.default.join(__dirname, "../upload"),
    STATIC_PATH: path_1.default.join(__dirname, "../public"),
    FACEBOOK_API: "https://graph.facebook.com/v6.0",
    JWT_SECRET: "long23dksxgfe",
    MONGODB_CONFIG: {
        type: "mongo",
        dbName: "crm",
        authDb: "crm",
        host: "localhost",
        pass: "long@123",
        user: "crm-writer",
        port: "27016",
    },
};
/**
 * Production envrironment
 */
const envProd = Object.assign({}, envDev);
const env = process.env.NODE_ENV === "production" ? envProd : envDev;
Object.assign(process.env, env);
exports.default = env;
