/* eslint-disable */
const childProcessExec = require('child_process').exec;
const fs = require('fs');
const util = require('util');

const cliArguments = process.argv.slice(2);
const messageFile = cliArguments[0];
const branchesToSkip = ['master', 'test', '(no branch)'];

const exec = util.promisify(childProcessExec);

const getCurrentBranch = async () => {
  const { stderr, stdout: branches } = await exec('git branch');

  if (stderr) {
    throw new Error(stderr);
  }

  return branches
    .split('\n')
    .find(branch => branch.trim().charAt(0) === '*')
    .trim()
    .substring(2);
};

const validateBranch = branchName => !branchesToSkip.includes(branchName);

const editCommitMessage = async messageFile => {
  const message = fs.readFileSync(messageFile, 'utf8').trim();

  try {
    const branchName = await getCurrentBranch();

    if (!validateBranch(branchName)) {
      return;
    }

    const prefix = branchName.split('_').slice(0, 2);
    const ticket = '[' + prefix[0].toUpperCase() + '-' + prefix[1] + ']';

    if (message.includes(ticket)) {
      return;
    }

    const newMessage = ticket + ' ' + message;

    fs.writeFileSync(messageFile, newMessage);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

if (/COMMIT_EDITMSG/g.test(messageFile)) {
  editCommitMessage(messageFile);
}
