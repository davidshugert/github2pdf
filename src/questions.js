const fs = require("fs");
const exists = path => {
  try {
    fs.accessSync(path, fs.R_OK);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  first: [
    {
      type: "path",
      name: "path",
      message: "Enter a path to save pdf: (Default will be current path)",
      default: process.cwd(),
      validate: answer => (exists(answer) ? true : "The path does not exist")
    },
    {
      type: "input",
      name: "repoName",
      message: "What repo are you looking for: "
    }
  ],
  githubToken: [
    {
      type: "confirm",
      name: "github_token_confirm",
      message: "No github token found, do you want to use a personal one?"
    },
    {
      type: "password",
      name: "github_token",
      message: "Please insert the following github token:",
      when: function(ans) {
        return ans.github_token_confirm;
      }
    }
  ],
  repo: {
    type: "rawlist",
    name: "repo",
    message: "Choose from the below repositories found: ",
    default: 1
  }
};
