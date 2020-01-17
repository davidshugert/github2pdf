const markdownpdf = require("markdown-pdf");
const Directory = require("./Directories");
const path = require("path");
const TimeDiff = require("timediff-tool");

module.exports = async (url, rootPath) => {
  const time = new TimeDiff();
  const main = new Directory({
    url: `https://api.github.com/repos/${url}/contents`
  });
  let md = (await main.processDir()).getFiles();
  console.log(
    `Time taken to download repo structure and markdown files: ${time.getTimeTaken(
      "seconds"
    )} seconds`
  );

  pdfPath = path.join(rootPath, url) + ".pdf";
  console.log("Saving to pdf this might take a while...");
  markdownpdf({})
    .concat.from.strings(md)
    .to(pdfPath, () => {
      console.log("File path: ", pdfPath);
      console.log(`Total Time Taken: ${time.getTimeTaken("seconds")} seconds`);
    });
};
