const GitObject = require("./GitObjects");
const Markdown = require("./Markdown");
const path = require("path");

module.exports = class Directories extends GitObject {
  constructor(gitObject) {
    super(gitObject);
    this.children = new Map();
    this.files = new Map();
  }

  async processDir() {
    const { data: tree } = await this.fetchProperties();
    const filesPromises = [];
    const childrenPromises = [];

    for (let item of tree) {
      if (item.type == "file" || item.type == "blob") {
        if (path.extname(item.path) == ".md") {
          filesPromises.push(new Markdown(item).downloadFile());
        }
      }
      if (item.type == "dir" || item.type == "tree") {
        childrenPromises.push(new Directories(item).processDir())
      }
    }
    const [files,children] = await Promise.all([Promise.all(filesPromises),Promise.all(childrenPromises)])
    files.forEach(file => this.files.set(file.path, file));
    children.forEach(child=>this.children.set(child.path,child))
    return this
  }
  getFiles(arr = []) {
    // Checks files in Directory first
    this.files.forEach(markdown => arr.push(markdown.mdFile));
    //Checks subDirectories
    this.children.forEach(subDirectory => subDirectory.getFiles(arr));
    return arr;
  }
};
