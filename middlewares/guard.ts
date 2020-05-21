import { NextFunction, Response, Request } from "express";
import * as _ from "lodash";
import GetUserInfo from "@/middlewares/user-info";
import CustomError from "@/lib/fesjs/error/custom-error";
import errors from "@/constant/errors";

export default function (rule?: CheckOptions) {
    return async function AuthGuard(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        GetUserInfo(req, res, () => {
            if (!rule) return next();
            const user = (req as any).user;
            const {
                roles,
                permissions,
                roleCondition,
                permissionCondition,
            } = rule;
            if (!user) {
                return next(new CustomError(errors.AUTH.LOGIN_REQUIRED));
            }
            const passRole = checkRole(roles, user.roles, roleCondition);
            const passPermission = checkPermission(
                permissions,
                user.permissions,
                permissionCondition
            );
            // Pass Role or Permission => next()
            if (passRole || passPermission) {
                next();
            } else if (!passRole) {
                return next(new CustomError(errors.AUTH.ROLE_CHECK_NOT_PASS));
            } else if (passPermission) {
                return next(
                    new CustomError(errors.AUTH.PERMISSION_CHECK_NOT_PASS)
                );
            }
        });
    };
}

interface CheckOptions {
    roles?: string[];
    permissions?: string[];
    roleCondition?: "and" | "or" | "not";
    permissionCondition?: "and" | "or" | "not";
}

function checkPermission(
    permissions: string[] = [],
    userPermissions: any[] = [],
    condition: "and" | "or" | "not" = "and"
) {
    if (condition === "and") {
        return permissions.every((r) =>
            userPermissions.find((ur) => ur.id === r)
        );
    }
    if (condition === "or") {
        return permissions.some((r) =>
            userPermissions.find((ur) => ur.id === r)
        );
    }
    if (condition === "not") {
        return !permissions.every((r) =>
            userPermissions.find((ur) => ur.id === r)
        );
    }
}

function checkRole(
    roles: string[] = [],
    userRoles: any[] = [],
    condition: "and" | "or" | "not" = "and"
) {
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
