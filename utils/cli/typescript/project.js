const Path = require("path");
const { execSync } = require("child_process");
const EXAMPLE_PROJECT =
    "git@github.com:nguyenduclong-ict/express-typescript.git";

module.exports.newProject = async function (args = []) {
    const projectName = args[0]; // project name
    console.log("Clone project");
    if (!projectName) {
        console.error("Missing project name");
        return;
    }
    execSync(
        "git clone " +
            EXAMPLE_PROJECT +
            " " +
            Path.join(process.cwd(), projectName)
    );
};
