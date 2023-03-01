let fs = require("fs");
console.log("Incrementing build number...");

const incrementPatchVersion = (version) => {
  const [major, minor, patch] = version.split(".");
  return `${major}.${minor}.${Number(patch) + 1}`;
};

const path = "./version.json";

fs.readFile(path, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  const parsedData = JSON.parse(data);
  parsedData.version = incrementPatchVersion(parsedData.version);

  fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
    if (err) {
      console.log(`Failed to write to ${path}`);
      return;
    }
    console.log(`Version updated successfully`);
  });
});
