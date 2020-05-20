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
const user_info_1 = __importDefault(require("@/middlewares/user-info"));
const custom_error_1 = __importDefault(require("@/utils/error/custom-error"));
const errors_1 = __importDefault(require("@/constant/errors"));
function default_1(rule) {
    return function AuthGuard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            user_info_1.default(req, res, () => {
                if (!rule)
                    return next();
                const user = req.user;
                const { roles, permissions, roleCondition, permissionCondition, } = rule;
                if (!user) {
                    return next(new custom_error_1.default(errors_1.default.AUTH.LOGIN_REQUIRED));
                }
                const passRole = checkRole(roles, user.roles, roleCondition);
                const passPermission = checkPermission(permissions, user.permissions, permissionCondition);
                // Pass Role or Permission => next()
                if (passRole || passPermission) {
                    next();
                }
                else if (!passRole) {
                    return next(new custom_error_1.default(errors_1.default.AUTH.ROLE_CHECK_NOT_PASS));
                }
                else if (passPermission) {
                    return next(new custom_error_1.default(errors_1.default.AUTH.PERMISSION_CHECK_NOT_PASS));
                }
            });
        });
    };
}
exports.default = default_1;
function checkPermission(permissions = [], userPermissions = [], condition = "and") {
    if (condition === "and") {
        return permissions.every((r) => userPermissions.find((ur) => ur.id === r));
    }
    if (condition === "or") {
        return permissions.some((r) => userPermissions.find((ur) => ur.id === r));
    }
    if (condition === "not") {
        return !permissions.every((r) => userPermissions.find((ur) => ur.id === r));
    }
}
function checkRole(roles = [], userRoles = [], condition = "and") {
    if (condition === "and") {
        return roles.every((r) => userRoles.find((ur) => ur.id === r));
    }
    if (condition === "or") {
        return roles.some((r) => userRoles.find((ur) => ur.id === r));
    }
    if (condition === "not") {
        return !roles.every((r) => userRoles.find((ur) => ur.id === r));
    }
}
