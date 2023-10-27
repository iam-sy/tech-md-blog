const path = require("path");
const fs = require("fs");
const pdf2md = require("@opendocsg/pdf2md");

const [, _, file] = process.argv;

console.log("test", file);

const pdfBuffer = fs.readFileSync(file);
pdf2md(pdfBuffer)
  .then((text) => {
    const outputArr = file.split("/");
    outputArr.shift();
    let outputFile = outputArr.join("/").replace(".pdf", ".md");
    console.log(`Writing to ${outputFile}...`);
    fs.writeFileSync(`/${outputFile}`, text);
    console.log("Done.");
  })
  .catch((err) => {
    console.error(err);
  });
