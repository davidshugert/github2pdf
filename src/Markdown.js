const GitObject = require("./GitObjects");
const githubApi = require("../api/github");
module.exports = class MarkDown extends GitObject {
  constructor(gitObject) {
    super(gitObject);
    this.size = gitObject.size;
    this.type = "Markdown";
  }
  async downloadFile() {
    const { data } = await this.fetchProperties();
    this.download_url = data.download_url;
    const { data: md } = await githubApi.get(this.download_url);
    this.mdFile = md + '\n---\n';
    return this;
  }
};
