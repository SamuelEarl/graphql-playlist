// To use the craco package to override the Create React App configs, refer to the following links:
// * craco package installation: https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
// * Add Webpack and Jest aliasing support with craco-alias: https://github.com/risenforces/craco-alias.

const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": "./src" // The "@" symbol represents the "src" directory.
        }
      }
    }
  ]
};
