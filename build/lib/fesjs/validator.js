"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_types_1 = __importDefault(require("check-types"));
const custom_error_1 = __importDefault(require("./error/custom-error"));
const errors_1 = __importDefault(require("@/constant/errors"));
/**
 *
 * @param schema Schema validator
 * @param data data for check validate
 */
function default_1(schema, target) {
    return function handle(req, res, next) {
        if (!check_types_1.default.all(check_types_1.default.map(req[target], schema))) {
            return next(new custom_error_1.default(errors_1.default.VALIDATE));
        }
        next();
    };
}
exports.default = default_1;
