const fs = require('fs');
const Path = require('path');
const { spawnSync, spawn, execSync } = require('child_process');

module.exports.newProject = async function (args = []) {
  const projectName = args[0]; // project name
  if (!projectName) {
    console.error('Missing project name');
    return;
  }
  console.log('Creating project struct');
  execSync(
    'cp -r ' +
      Path.join(__dirname, 'example/*') +
      ' ' +
      Path.join(process.cwd(), '')
  );

  // edit package.json
  const packageJson = JSON.parse(
    fs.readFileSync(process.cwd() + '/package.json')
  );
  packageJson.name = projectName;
  fs.writeFileSync(
    process.cwd() + '/package.json',
    JSON.stringify(packageJson, null, 2)
  );

  console.log('Install package...');
  execSync('yarn');
  console.log('Success!');
};
