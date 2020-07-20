/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

try {
  console.info("start improving git hooks...");

  const defaultHookPath = path.resolve(
    __dirname,
    "../.git/hooks/prepare-commit-msg"
  );

  const newHookPath = path.resolve(__dirname, "./prepareCommitMessage.js");

  const newHookContent = fs
    .readFileSync(newHookPath, "utf8")
    .replace("/* eslint-disable */", "#!/usr/bin/env node");

  const defaultHookContent = fs.readFileSync(defaultHookPath, "utf8");

  if (defaultHookContent.includes(newHookContent)) {
    console.log("Already improved");

    return;
  }

  fs.writeFileSync(defaultHookPath, newHookContent, "utf8");
  console.info("git hooks improved");
} catch (error) {
  console.error("Updating git hook failed... ", error);
}
