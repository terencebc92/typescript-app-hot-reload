let fs = require("fs");
let envPath = ".env";
console.log("Incrementing build number...");
fs.readFile("output.json", (err, content) => {
  if (err) throw err;
  let metadata = JSON.parse(content);
  let version = metadata.versions;
  let versionNumbers = version.split(".").map(Number);
  versionNumbers[2]++;
  metadata.version = versionNumbers.join(".");

  fs.writeFile(
    "vss-extension.json",
    JSON.stringify(metadata, null, 2),
    (err) => {
      if (err) throw err;
      console.log(`Current version number: ${metadata.version}`);
    }
  );

  var dataArray = fs.readFileSync(envPath, "utf8").split("\n");

  var replacedArray = dataArray.map((line) => {
    if (line.split("=")[0] == attrName) {
      return attrName + "=" + String(newVal);
    } else {
      return line;
    }
  });

  fs.writeFileSync(envPath, "");
  for (let i = 0; i < replacedArray.length; i++) {
    fs.appendFileSync(envPath, replacedArray[i] + "\n");
  }
});
