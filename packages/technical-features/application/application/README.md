# @kubesightapp/application

This package contains stuff related to creating K8Sight-applications. 

## Usage

```sh
npm install @kubesightapp/application-for-electron-main
```

```typescript
import { applicationFeature, startApplicationInjectionToken } from "@kubesightapp/application";
import { registerFeature } from "@kubesightapp/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, applicationFeature);

const startApplication = di.inject(startApplicationInjectionToken);

startApplication();
```


## Features

### Start application
`startApplicationInjectionToken`

Starts the application and calls timeslots in specified order. Check for timeslots for more info.

## Extendability

### Timeslots

1. `beforeApplicationIsLoadingInjectionToken`
2. `onLoadOfApplicationInjectionToken`
3. `afterApplicationIsLoadedInjectionToken`
