const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { argv, cwd, env } = process;

const dirsToSkip = ['build', 'dist', 'node_modules'];
const cliArguments = argv.slice(2);
const npmCommand = cliArguments[0];
const root = cwd(child_process);

const validateDir = dir => !dirsToSkip.includes(dir) && dir[0] !== '.';

const topSeparator =
  '==========================================================================';
const bottomSeparator =
  '##########################################################################';

const printHeader = message => {
  console.info(topSeparator);
  console.info(message);
  console.info(topSeparator);
};

const printFooter = () => {
  console.info(bottomSeparator);
  console.info(os.EOL);
};

function getDirs(dir) {
  return fs
    .readdirSync(dir)
    .filter(subDir => {
      const dirPath = path.join(dir, subDir);

      return fs.statSync(dirPath).isDirectory() && validateDir(subDir);
    })
    .map(subDir => path.join(dir, subDir));
}

const npmRun = (dir, command) => {
  printHeader(
    `Performing "npm ${command}" inside ${
      dir === root
        ? 'root directory'
        : '.' + path.sep + path.relative(root, dir)
    }`
  );

  try {
    npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

    child_process.spawnSync(npmCmd, [command], {
      env: env,
      cwd: dir,
      stdio: 'inherit'
    });
  } catch (error) {
    // do nothing
  }

  printFooter();
};

const npmRunInDirs = dir => {
  const hasPackageJson = fs.existsSync(path.join(dir, 'package.json'));

  if (hasPackageJson) {
    npmRun(dir, npmCommand);
  }

  getDirs(dir).forEach(npmRunInDirs);
};

npmRunInDirs(root);
