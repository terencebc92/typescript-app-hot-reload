const { readFileSync, writeFileSync, readFile } = require("fs");

let txt = readFileSync("./build/index.html");
txt = txt.toString().replaceAll("/static/", "static/");
writeFileSync("./build/index.html", txt);
console.log("Script completed");
