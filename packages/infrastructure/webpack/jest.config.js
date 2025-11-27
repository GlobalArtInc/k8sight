const {
  configForNode: { coverageThreshold, ...config },
} = require("@kubesightapp/jest").monorepoPackageConfig(__dirname);

module.exports = config;
