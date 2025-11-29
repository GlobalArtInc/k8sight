# @kubesightapp/webpack

This package contains webpack configurations for K8sight packages.

## Install

```sh
npm install @kubesightapp/webpack
```

## Features

### Configurations

### Node package
This configuration should be used when creating package that will be executed within **Node** environment. 

**webpack.config.js**
```javascript
module.exports = require("@kubesightapp/webpack").configForNode;
```
### React package
This configuration should be used when creating package tha will be executed within **Browser** environment.

**webpack.config.js**
```javascript
module.exports = require("@kubesightapp/webpack").configForReact;
```

### Multi export package

This configuration should be used when package contains **multiple entrypoint** e.g. for different environments. You need to add `k8sightMultiExportConfig` to `package.json` with configuration. Note that also `exports` property needs to be set, but the correct values are generated from `k8sightMultiExportConfig` when using `k8sight-build` -script.

**webpack.config.js**
```javascript
const packageJson = require("./package.json");

module.exports = require("@kubesightapp/webpack").getMultiExportConfig(packageJson);
```

**package.json**
```json
{
  "k8sightMultiExportConfig": {
    "./main": {
      "buildType": "node",
      "entrypoint": "./src/main/index.ts"
    },
    "./renderer": {
      "buildType": "react",
      "entrypoint": "./src/renderer/index.ts"
    }
  },

  "exports": {
    "./main": {
      "types": "./dist/main/index.d.ts",
      "require": "./dist/main/index.js",
      "import": "./dist/main/index.js",
      "default": "./dist/main/index.js"
    },
    "./renderer": {
      "types": "./dist/renderer/index.d.ts",
      "require": "./dist/renderer/index.js",
      "import": "./dist/renderer/index.js",
      "default": "./dist/renderer/index.js"
    }
  }
}
```

## Scripts

1. `k8sight-build` which builds the packages
2. `k8sight-remove-build` which removes the build directory from packages. It's useful for cleaning up.
