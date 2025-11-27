import { DockTabStore } from "../dock-tab-store/dock-tab.store";

import type { DockTabStoreDependencies } from "../dock-tab-store/dock-tab.store";

export interface CreateResourceTabStoreDependencies extends DockTabStoreDependencies {}

export class CreateResourceTabStore extends DockTabStore<string> {
  constructor(protected readonly dependencies: CreateResourceTabStoreDependencies) {
    super(dependencies, {
      storageKey: "create_resource",
    });
  }
}
