"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_all_1 = __importDefault(require("./import-all"));
function default_1(app, routerPath) {
    routerPath = routerPath || process.env.ROUTER_PATH;
    if (!routerPath)
        throw new Error("routerPath not found!");
    console.log("Generate Router");
    const moudles = import_all_1.default(routerPath);
    moudles
        .filter((m) => /router.js$/.test(m.originName))
        .forEach((element) => {
        const alias = element.path
            .replace(routerPath, "")
            .replace(/\.*router.js$/, "") // replace a.router.js to a/
            .replace(/\/*$/, "") // replace a// to a/
            .replace(/^$/, "/"); // replace '' to '/'
        console.log("=>", alias);
        app.use(alias, element.module.default);
    });
    console.log("Generate router success!");
}
exports.default = default_1;
