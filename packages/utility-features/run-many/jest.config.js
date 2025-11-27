const config = require("@kubesightapp/jest").monorepoPackageConfig(__dirname).configForReact;

module.exports = { ...config, coverageThreshold: undefined };
