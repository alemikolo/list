/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const enhanceGitHook = () => {
  try {
    console.info('start improving git hooks...');

    const defaultHookPath = path.resolve('.git/hooks/prepare-commit-msg');

    console.log(defaultHookPath);

    const newHookPath = path.resolve('scripts/prepareCommitMessage.js');

    const newHookContent = fs
      .readFileSync(newHookPath, 'utf8')
      .replace('/* eslint-disable */', '#!/usr/bin/env node');

    const defaultHookContent = fs.readFileSync(defaultHookPath, 'utf8');

    if (defaultHookContent.includes(newHookContent)) {
      return console.log('Already improved');
    }

    fs.writeFileSync(defaultHookPath, newHookContent, 'utf8');

    return console.info('git hooks improved');
  } catch (error) {
    console.error('Updating git hook failed... ', error);
  }
};

enhanceGitHook();
