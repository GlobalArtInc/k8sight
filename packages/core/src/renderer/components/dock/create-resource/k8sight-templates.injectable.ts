import { getInjectable } from "@ogre-tools/injectable";
import parsePathInjectable from "../../../../common/path/parse.injectable";

import type { RawTemplates } from "./create-resource-templates.injectable";

const k8sightCreateResourceTemplatesInjectable = getInjectable({
  id: "k8sight-create-resource-templates",

  instantiate: (di): RawTemplates => {
    const parsePath = di.inject(parsePathInjectable);
    const templatesContext = require.context(
      "@kubesightapp/resource-templates/templates",
      true,
      /^\.\/.*\.(yaml|yml)$/,
    );

    return {
      label: "k8sight",
      options: templatesContext.keys().map((key) => ({
        label: parsePath(key).name,
        value: templatesContext(key) as string,
      })),
    };
  },
  causesSideEffects: true,
});

export default k8sightCreateResourceTemplatesInjectable;
