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
require("module-alias/register");
require("./env");
const app_1 = require("./app");
const startup_1 = __importDefault(require("@/services/startup"));
const router_1 = __importDefault(require("@/lib/fesjs/router"));
const custom_error_1 = __importDefault(require("@/lib/fesjs/error/custom-error"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // start up service
    yield startup_1.default(app_1.app, app_1.server);
    // init router
    router_1.default(app_1.app);
    // Handle Error
    app_1.app.use((error, req, res, next) => {
        if (error) {
            if (error instanceof custom_error_1.default) {
                res.status(error.code);
                res.send(error.message);
                res.end();
                return;
            }
        }
        next();
    });
    // start server
    const port = process.env.PORT || 3000;
    app_1.server.listen(port, () => {
        console.log("Server listen on", port);
    });
}))();
