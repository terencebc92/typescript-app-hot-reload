const output = require("./output.json");

module.exports = (env) => {
  let [idPostfix, namePostfix, buildPath] =
    env.mode == "development" ? ["-dev", " [DEV]", "dist"] : ["", "", "build"];

  let version = "";
  if (output.versions) {
    version = output.versions[0].version;
    console.log(`Latest version is ${version}`);
  }

  let manifest = {
    manifestVersion: 1,
    id: `typescript-extension${idPostfix}`,
    publisher: "TerenceBuldaChia",
    version: version,
    name: `TypeScript Extension${namePostfix}`,
    public: false,
    categories: ["Azure Repos"],
    icons: {
      default: "images/extension-icon.png",
    },
    targets: [
      {
        id: "Microsoft.VisualStudio.Services",
      },
    ],
    files: [
      {
        path: `${buildPath}`,
        addressable: true,
      },
      {
        path: "images",
        addressable: true,
      },
    ],
    contributions: [
      {
        id: "typescript-hub-group",
        type: "ms.vss-web.hub-group",
        description: "Hub group for typescript app",
        targets: ["ms.vss-web.project-hub-groups-collection"],
        properties: {
          name: `TypeScript Extension Hub Group${namePostfix}`,
          iconAsset: `TerenceBuldaChia.typescript-extension${idPostfix}/images/extension-icon.png`,
          includesData: {
            assets: [
              "TerenceBuldaChia.typescript-extension-dev/images/extension-icon.png",
            ],
          },
        },
      },
      {
        id: "typescript-hub",
        type: "ms.vss-web.hub",
        targets: [".typescript-hub-group"],
        properties: {
          name: `TypeScript Extension Hub${namePostfix}`,
          icon: "images/extension-icon.png",
          uri: `${buildPath}/index.html`,
        },
      },
    ],
  };

  if (env.mode == "development") {
    manifest.baseUri = "https://localhost:3000";
  }

  return manifest;
};
