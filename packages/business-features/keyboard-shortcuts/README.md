# @kubesightapp/keyboard-shortcuts

This Feature enables keyboard shortcuts in Lens

## Usage

```sh
npm install @kubesightapp/keyboard-shortcuts
```

```typescript
import { keyboardShortcutsFeature } from "@kubesightapp/keyboard-shortcuts";
import { registerFeature } from "@kubesightapp/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, keyboardShortcutsFeature);
```

## Extendability
