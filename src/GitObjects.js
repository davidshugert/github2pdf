const githubAPI = require("../api/github");
module.exports = class GitObjects {
  constructor(gitObject) {
    this.name = gitObject.path;
    this.path = gitObject.path;
    this.url = gitObject.url || gitObject.git_url;
    this.gitObject = gitObject;
    this.type = gitObject.type;
    this.sha = gitObject.sha;
  }

  async fetchProperties() {
    return await githubAPI.get(this.url);
  }

  displayProperties() {
    console.log(`Type: ${this.type} Name: ${this.name}`);
  }
};
