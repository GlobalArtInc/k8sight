# @kubesightapp/react-application

## Usage

```sh
npm install @kubesightapp/react-application
```

```typescript
import { reactApplicationFeature } from "@kubesightapp/react-application";
import { registerFeature } from "@kubesightapp/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, reactApplicationRootFeature);
```

## Extendability
