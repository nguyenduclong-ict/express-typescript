var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Path = require("path");
const { execSync } = require("child_process");
const EXAMPLE_PROJECT = "https://github.com/nguyenduclong-ict/express-typescript.git";
module.exports.newProject = function (args = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectName = args[0]; // project name
        if (!projectName) {
            console.error("Missing project name");
            return;
        }
        console.log("Clone project ...");
        execSync(`git clone ${EXAMPLE_PROJECT} ${Path.join(process.cwd(), projectName)}`);
        execSync(`cd ${projectName} && cp env.example.ts env.ts && rm -rf .git && git init && yarn init -y && yarn`);
    });
};
