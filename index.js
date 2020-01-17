#!/usr/bin/env node

require("dotenv").config();
let github = require("./api/github");
const inquirer = require("inquirer");
const processRepo = require("./src");
const questions = require("./src/questions");
const { PathPrompt } = require("inquirer-path");
inquirer.registerPrompt("path", PathPrompt);

const main = async () => {
  const { path, repoName } = await inquirer.prompt(questions.first);

  if (!process.env.github_token) {
    const { github_token } = await inquirer.prompt(questions.githubToken);
    if (github_token) {
      github.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${github_token}`;
    }
  }

  let {
    data: { items }
  } = await github.get("https://api.github.com/search/repositories", {
    params: {
      q: repoName
    }
  });
  if (!items.length) {
    console.log("Repo not found please try with a different search term!");
    await main();
    return;
  }
  items = items.map(i => i.full_name);
  const { repo } = await inquirer.prompt({ ...questions.repo, choices: items });
  await processRepo(repo, path);
};

main().catch(e => console.log(e));
